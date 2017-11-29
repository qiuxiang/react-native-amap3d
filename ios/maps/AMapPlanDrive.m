//
//  AMapPlanDrive.m
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/24.
//

#import "AMapPlanDrive.h"
#import "CommonUtility.h"
#import "UIColor+ChangeColor.h"
#define kMANaviRouteReplenishPolylineFilter     5
static const NSInteger RoutePlanningPaddingEdge = 20;

@interface AMapPlanDrive()
/* 起始点经纬度. */
@property (nonatomic) CLLocationCoordinate2D startCoordinate;
/* 终点经纬度. */
@property (nonatomic) CLLocationCoordinate2D destinationCoordinate;

//
@property (nonatomic, strong) NSMutableArray *routePolylines;
@end

@implementation AMapPlanDrive {
    AMapSearchAPI *_mapSearch;
    AMapDrivingRouteSearchRequest *_drive;
    AMapView *_mapView;
    NSInteger _strategy; // 道路策略
    UIColor *_non; //未知路况
    UIColor *_clear; //畅通路况
    UIColor *_slow; //缓行路况
    UIColor *_busy; //拥堵路况
    
    UIImage *_nonImg;
    UIImage *_clearImg;
    UIImage *_slowImg;
    UIImage *_busyImg;
}

- (instancetype)init {
    if (self = [super init]) {
        /*search*/
        _mapSearch = [[AMapSearchAPI alloc] init];
        _mapSearch.delegate = self;
        
        /*request*/
        _drive = [[AMapDrivingRouteSearchRequest alloc] init];
        _drive.requireExtension = YES;
        _drive.strategy = 11;
        
        /*default color*/
        _non = [UIColor greenColor];
        _clear = [UIColor greenColor];
        _slow = [UIColor yellowColor];
        _busy = [UIColor redColor];
        
        /*default picture*/
        _nonImg = [UIImage imageNamed:@"custtexture_green"];
        _clearImg = [UIImage imageNamed:@"custtexture_green"];
        _slowImg = [UIImage imageNamed:@"custtexture_slow"];
        _busyImg = [UIImage imageNamed:@"custtexture_bad"];
        
        _showImgRoad = YES;
    }
    return self;
}

- (void)setMapView:(AMapView *)mapView {
    _mapView = mapView;
}

- (void)setStrategy:(NSInteger)strategy {
    _strategy = strategy;
    _drive.strategy = _strategy;
}

- (void)setNonColor:(NSString *)nonColor {
    _non = [UIColor colorWithHexString:nonColor];
}

- (void)setClearColor:(NSString *)clearColor {
    _clear = [UIColor colorWithHexString:clearColor];
}

- (void)setSlowColor:(NSString *)slowColor {
    _slow = [UIColor colorWithHexString:slowColor];
}

- (void)setBusyColor:(NSString *)busyColor {
    _busy = [UIColor colorWithHexString:busyColor];
}

- (void)setShowImgRoad:(BOOL)showImgRoad {
    _showImgRoad = showImgRoad;
}

- (void)setCoordinates:(NSArray *)coordinates {
    NSDictionary *first = coordinates.firstObject;
    NSDictionary *last = coordinates.lastObject;
    self.startCoordinate = CLLocationCoordinate2DMake([first[@"latitude"] doubleValue], [first[@"longitude"] doubleValue]);
    self.destinationCoordinate = CLLocationCoordinate2DMake([last[@"latitude"] doubleValue], [last[@"longitude"] doubleValue]);
    [self searchRouterPlannintDrive];
}

//起点,终点规划路线
- (void)searchRouterPlannintDrive {
    _drive.origin = [AMapGeoPoint locationWithLatitude:self.startCoordinate.latitude longitude:self.startCoordinate.longitude];
    _drive.destination = [AMapGeoPoint locationWithLatitude:self.destinationCoordinate.latitude longitude:self.destinationCoordinate.longitude];
    [_mapSearch AMapDrivingRouteSearch:_drive];
}

//展示路线
- (void)presentCurrentCourseWithPath:(AMapPath *)path {
    [self removeFromMapView];
    
    NSMutableArray *polylines = [NSMutableArray array];
    /*获取坐标系和路况*/
    __block NSMutableArray *coorArray = [NSMutableArray array]; // 坐标系
    __block NSMutableArray<AMapTMC *> *tmcs = [NSMutableArray array]; // 路况
    [path.steps enumerateObjectsUsingBlock:^(AMapStep * _Nonnull step, NSUInteger idx, BOOL * _Nonnull stop) {
        NSArray *coordinates = [step.polyline componentsSeparatedByString:@";"]; //分割字符串坐标集合
        [coorArray addObjectsFromArray:coordinates];
        [tmcs addObjectsFromArray:step.tmcs];
    }];
    
    /*获取总长度,并修改路况*/
    __block NSMutableArray *mergedTmcs = [NSMutableArray array];
    __block NSString *prevStatus = tmcs.firstObject.status;
    __block double sumDistance = 0; //总长度
    [tmcs enumerateObjectsUsingBlock:^(AMapTMC * _Nonnull tmc, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([prevStatus isEqualToString:tmc.status]) {
            sumDistance += tmc.distance;
        } else {
            AMapTMC *temp = [[AMapTMC alloc] init];
            temp.status = prevStatus;
            temp.distance = sumDistance;
            [mergedTmcs addObject:temp];
            
            sumDistance = tmc.distance;
            prevStatus = tmc.status;
        }
    }];
    AMapTMC *temp = [[AMapTMC alloc] init];
    temp.status = prevStatus;
    temp.distance = sumDistance;
    [mergedTmcs addObject:temp];
    tmcs = mergedTmcs;
    
    NSMutableArray *lineColors = [NSMutableArray array]; // 线条颜色,图片颜色
    NSMutableArray *coordinates = [NSMutableArray array];
    NSMutableArray *indexes = [NSMutableArray array];
    
    NSInteger sumLength = 0;
    NSInteger statusesIndex = 0;
    NSInteger curTrafficLength = tmcs.firstObject.distance;
    [lineColors addObject:[self colorWithTrafficStatus:tmcs.firstObject.status]];
    [indexes addObject:@(0)];
    [coordinates addObject:[coorArray objectAtIndex:0]];
    int i=1;
    for (;i < coorArray.count; ++i) {
        CLLocationCoordinate2D locationStart = [self coordinateWithString:coorArray[i-1]];
        MAMapPoint pointStart = MAMapPointForCoordinate(locationStart);
        CLLocationCoordinate2D locationEnd = [self coordinateWithString:coorArray[i]];
        MAMapPoint pointEnd = MAMapPointForCoordinate(locationEnd);
        double oneDis = MAMetersBetweenMapPoints(pointStart, pointEnd);
        if (sumLength + oneDis >= curTrafficLength) {
            if (sumLength + oneDis == curTrafficLength) {
                [coordinates addObject:[coorArray objectAtIndex:i]];
                [indexes addObject:[NSNumber numberWithInteger:([coordinates count]-1)]];
            } else { // 需要插入一个点
                double rate = (oneDis == 0 ? 0 : ((curTrafficLength - sumLength) / oneDis));
                NSString *extrnPoint = [self calcPointWithStartPoint:[coorArray objectAtIndex:i-1] endPoint:[coorArray objectAtIndex:i] rate:MAX(MIN(rate, 1.0), 0)];
                if (extrnPoint) {
                    [coordinates addObject:extrnPoint];
                    [indexes addObject:[NSNumber numberWithInteger:([coordinates count]-1)]];
                    [coordinates addObject:[coorArray objectAtIndex:i]];
                } else {
                    [coordinates addObject:[coorArray objectAtIndex:i]];
                    [indexes addObject:[NSNumber numberWithInteger:([coordinates count]-1)]];
                }
            }
            
            sumLength = sumLength + oneDis - curTrafficLength;
            
            if (++statusesIndex >= [tmcs count]) break;
            curTrafficLength = tmcs[statusesIndex].distance;
            [lineColors addObject:[self colorWithTrafficStatus:tmcs[statusesIndex].status]];
        } else {
            [coordinates addObject:[coorArray objectAtIndex:i]];
            sumLength += oneDis;
        }
    }
    
    //将最后一个点对齐到路径终点
    if (i < [coorArray count]) {
        while (i < [coorArray count]) {
            [coordinates addObject:[coorArray objectAtIndex:i]];
            i++;
        }
        
        [indexes removeLastObject];
        [indexes addObject:[NSNumber numberWithInteger:([coordinates count]-1)]];
    }
    
    // 添加overlay
    
    NSInteger count = coordinates.count;
    CLLocationCoordinate2D *runningCoords = (CLLocationCoordinate2D *)malloc(count * sizeof(CLLocationCoordinate2D));
    
    for (int j = 0; j < count; ++j) {
        NSString *oneCoor = coordinates[j];
        CLLocationCoordinate2D coor = [self coordinateWithString:oneCoor];
        runningCoords[j] = coor;
    }
    
    MAMultiPolyline *polyline = [MAMultiPolyline polylineWithCoordinates:runningCoords count:count drawStyleIndexes:[NSArray arrayWithArray:indexes]];
    free(runningCoords);
    if (polyline) {
        [polylines addObject:polyline];
        self.multiPolylineColors = [lineColors copy];
        self.routePolylines = polylines;
    }
    [self replenishPolylinesForStartPoint:_drive.origin endPoint:_drive.destination Polylines:polylines];
    
    [self addToMapView:_mapView]; // 添加到地图
    
    /* 缩放地图使其适应polylines的展示. */
    [_mapView setVisibleMapRect:[CommonUtility mapRectForOverlays:self.routePolylines]
                        edgePadding:UIEdgeInsetsMake(RoutePlanningPaddingEdge, RoutePlanningPaddingEdge, RoutePlanningPaddingEdge, RoutePlanningPaddingEdge)
                           animated:YES];
}

// 补充起点和终点对于路径的空隙
- (void)replenishPolylinesForStartPoint:(AMapGeoPoint *)start
                               endPoint:(AMapGeoPoint *)end
                              Polylines:(NSMutableArray *)polylines {
    if (polylines.count < 1)
    {
        return;
    }
    
    LineDashPolyline *startDashPolyline = nil;
    LineDashPolyline *endDashPolyline = nil;
    if (start)
    {
        CLLocationCoordinate2D startCoor1 = CLLocationCoordinate2DMake(start.latitude, start.longitude);
        CLLocationCoordinate2D endCoor1 = startCoor1;
        
        MANaviPolyline *naviPolyline = [polylines firstObject];
        MAPolyline *polyline = nil;
        if ([naviPolyline isKindOfClass:[MANaviPolyline class]])
        {
            polyline = naviPolyline.polyline;
        }
        else if ([naviPolyline isKindOfClass:[MAPolyline class]])
        {
            polyline = (MAPolyline *)naviPolyline;
        }
        
        if (polyline)
        {
            [polyline getCoordinates:&endCoor1 range:NSMakeRange(0, 1)];
            startDashPolyline = [self replenishPolylineWithStart:startCoor1 end:endCoor1];
            
        }
    } // end start
    
    if (end)
    {
        CLLocationCoordinate2D startCoor2;
        CLLocationCoordinate2D endCoor2;
        
        MANaviPolyline *naviPolyline = [polylines lastObject];
        MAPolyline *polyline = nil;
        if ([naviPolyline isKindOfClass:[MANaviPolyline class]])
        {
            polyline = naviPolyline.polyline;
        }
        else if ([naviPolyline isKindOfClass:[MAPolyline class]])
        {
            polyline = (MAPolyline *)naviPolyline;
        }
        
        if (polyline)
        {
            [polyline getCoordinates:&startCoor2 range:NSMakeRange(polyline.pointCount - 1, 1)];
            endCoor2 = CLLocationCoordinate2DMake(end.latitude, end.longitude);
            
            endDashPolyline = [self replenishPolylineWithStart:startCoor2 end:endCoor2];
        }
    } //end end
    
    if (startDashPolyline)
    {
        [polylines addObject:startDashPolyline];
    }
    if (endDashPolyline)
    {
        [polylines addObject:endDashPolyline];
    }
    
}

- (LineDashPolyline *)replenishPolylineWithStart:(CLLocationCoordinate2D)startCoor end:(CLLocationCoordinate2D)endCoor {
    if (!CLLocationCoordinate2DIsValid(startCoor) || !CLLocationCoordinate2DIsValid(endCoor))
    {
        return nil;
    }
    
    double distance = MAMetersBetweenMapPoints(MAMapPointForCoordinate(startCoor), MAMapPointForCoordinate(endCoor));
    
    LineDashPolyline *dashPolyline = nil;
    
    // 过滤一下，距离比较近就不加虚线了
    if (distance > kMANaviRouteReplenishPolylineFilter)
    {
        CLLocationCoordinate2D points[2];
        points[0] = startCoor;
        points[1] = endCoor;
        MAPolyline *polyline = [MAPolyline polylineWithCoordinates:points count:2];
        dashPolyline = [[LineDashPolyline alloc] initWithPolyline:polyline];
    }
    
    return dashPolyline;
}

//添加到地图
- (void)addToMapView:(AMapView *)mapView {
    self.mapView = mapView;
    
    if ([self.routePolylines count] > 0) {
        [mapView addOverlays:self.routePolylines];
    }
}

- (void)removeFromMapView {
    if (_mapView == nil) {
        return;
    }
    
    if ([self.routePolylines count] > 0) {
        [_mapView removeOverlays:self.routePolylines];
    }
//    self.mapView = nil;
}

#pragma mark - AMapSearchDelegate
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error {
    NSLog(@"Error: %@", error);
}

//路径规划查询回调
- (void)onRouteSearchDone:(AMapRouteSearchBaseRequest *)request response:(AMapRouteSearchResponse *)response {
    if (response.route == nil) return;
    if (response.count > 0) {
        _route = response.route; //线路信息
        __block NSMutableDictionary * callBack = [NSMutableDictionary dictionary];
        [_route.paths enumerateObjectsUsingBlock:^(AMapPath * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            /*
             strategy: 导航策略,建议信息
             distance: 起点和终点的距离
             duration: 预计耗时
             tolls: 费用
             totalTrafficLights: 红灯个数
             */
            NSDictionary *info = @{@"strategy":obj.strategy,
                                   @"distance":@(obj.distance),
                                   @"duration":@(obj.duration),
                                   @"tolls":@(obj.tolls),
                                   @"totalTrafficLights":@(obj.totalTrafficLights)};
            [callBack setObject:info forKey:[NSString stringWithFormat:@"%lu", idx]];
        }];
        if (self.onStatusPlanComplete) {
            self.onStatusPlanComplete(callBack);
        }
        
        [self presentCurrentCourseWithPath:_route.paths[0]];
    }
}

#pragma mark - helper
- (UIColor *)colorWithTrafficStatus:(NSString *)status {
    if (status == nil) status = @"未知";
    NSDictionary *colorMapping = @{@"未知":_showImgRoad ? _nonImg : _non,
                                   @"畅通":_showImgRoad ? _clearImg : _clear,
                                   @"缓行":_showImgRoad ?_slowImg : _slow,
                                   @"拥堵":_showImgRoad ?_busyImg : _busy};
    return colorMapping[status] ? : (_showImgRoad ?_clearImg:_clear);
}

- (CLLocationCoordinate2D)coordinateWithString:(NSString *)string {
    NSArray *coorArray = [string componentsSeparatedByString:@","];
    if (coorArray.count != 2){
        return kCLLocationCoordinate2DInvalid;
    }
    return CLLocationCoordinate2DMake([coorArray[1] doubleValue], [coorArray[0] doubleValue]);
}

- (NSString *)calcPointWithStartPoint:(NSString *)start endPoint:(NSString *)end rate:(double)rate {
    if (rate > 1.0 || rate < 0) return nil;
    
    MAMapPoint from = MAMapPointForCoordinate([self coordinateWithString:start]);
    MAMapPoint to = MAMapPointForCoordinate([self coordinateWithString:end]);
    
    double latitudeDelta = (to.y - from.y) * rate;
    double longitudeDelta = (to.x - from.x) * rate;
    
    MAMapPoint newPoint = MAMapPointMake(from.x + longitudeDelta, from.y + latitudeDelta);
    
    CLLocationCoordinate2D coordinate = MACoordinateForMapPoint(newPoint);
    return [NSString stringWithFormat:@"%.6f,%.6f", coordinate.longitude, coordinate.latitude];
}
@end

@implementation LineDashPolyline
- (id)initWithPolyline:(MAPolyline *)polyline {
    if (self = [super init]) {
        self.polyline = polyline;
    }
    return self;
}

- (CLLocationCoordinate2D) coordinate {
    return [_polyline coordinate];
}

- (MAMapRect) boundingMapRect {
    return [_polyline boundingMapRect];
}
@end

@implementation MANaviPolyline

- (id)initWithPolyline:(MAPolyline *)polyline
{
    if (self = [super init]) {
        self.polyline = polyline;
    }
    return self;
}

- (CLLocationCoordinate2D) coordinate {
    return [_polyline coordinate];
}

- (MAMapRect) boundingMapRect {
    return [_polyline boundingMapRect];
}

@end
