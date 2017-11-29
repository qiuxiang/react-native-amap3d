//
//  AMapPlanDrive.h
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/24.
//

#import <AMapSearchKit/AMapSearchKit.h>
#import <MAMapKit/MAMapKit.h>
#import <React/UIView+React.h>
#import "AMapModel.h"
#import "AMapView.h"

@interface LineDashPolyline :NSObject <MAOverlay>
@property (nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property (nonatomic, readonly) MAMapRect boundingMapRect;
@property (nonatomic, retain)  MAPolyline *polyline;
- (id)initWithPolyline:(MAPolyline *)polyline;
@end

@interface MANaviPolyline : NSObject<MAOverlay>
@property (nonatomic, strong) MAPolyline *polyline;
- (id)initWithPolyline:(MAPolyline *)polyline;
@end

@interface AMapPlanDrive : AMapModel<AMapSearchDelegate>
@property (nonatomic, strong) NSArray *multiPolylineColors; // 多彩线颜色
@property (nonatomic, strong) AMapRoute *route; // 线路
@property (nonatomic, assign) BOOL showImgRoad; // 是否使用图片线路

@property(nonatomic, copy) RCTBubblingEventBlock onStatusPlanComplete;

- (void)setMapView:(AMapView *)mapView;
- (void)presentCurrentCourseWithPath:(AMapPath *)path; //规划线路

@end
