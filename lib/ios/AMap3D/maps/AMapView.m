#import <React/UIView+React.h>
#import "AMapView.h"
#import "AMapMarker.h"
#import "AMapPolyline.h"
#import "LocationStyle.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapView {
    NSMutableDictionary *_markers;
    MAUserLocationRepresentation *_locationStyle;
}

- (instancetype)init {
    _markers = [NSMutableDictionary new];
    self = [super init];
    
    MAMapView *mapView = [MAMapView new];
    self.mapView = mapView;
    mapView.centerCoordinate = CLLocationCoordinate2DMake(39.9242, 116.3979);
    mapView.zoomLevel = 10;
    mapView.delegate = self;
    [self addSubview:mapView];
    
    return self;
}

- (void)setShowsTraffic:(BOOL)shows {
    self.mapView.showTraffic = shows;
}

- (void)setTiltEnabled:(BOOL)enabled {
    self.mapView.rotateCameraEnabled = enabled;
}

- (void)setLocationEnabled:(BOOL)enabled {
    self.mapView.showsUserLocation = enabled;
}

- (void)setShowCompass:(BOOL)enabled {
    self.mapView.showsCompass = enabled;
}

- (void)setCoordinate:(CLLocationCoordinate2D)coordinate {
    self.mapView.centerCoordinate = coordinate;
}

- (void)setTilt:(CGFloat)degree {
    self.mapView.cameraDegree = degree;
}

- (void)setRotation:(CGFloat)degree {
    self.mapView.rotationDegree = degree;
}

- (void)setLocationStyle:(LocationStyle *)locationStyle {
    if (!_locationStyle) {
        _locationStyle = [MAUserLocationRepresentation new];
    }
    _locationStyle.fillColor = locationStyle.fillColor;
    _locationStyle.strokeColor = locationStyle.strokeColor;
    _locationStyle.lineWidth = locationStyle.strokeWidth;
    _locationStyle.image = locationStyle.image;
    [self.mapView updateUserLocationRepresentation:_locationStyle];
}

// 如果在地图未加载的时候调用改方法，需要先将 region 存起来，等地图加载完成再设置
- (void)setRegion:(MACoordinateRegion)region {
    if (self.loaded) {
        self.mapView.region = region;
    } else {
        self.initialRegion = region;
    }
}

- (void)didAddSubview:(UIView *)subview {
    if ([subview isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) subview;
        marker.mapView = self;
        _markers[[@(marker.annotation.hash) stringValue]] = marker;
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.mapView addAnnotation:marker.annotation];
        });
    }
    if ([subview isKindOfClass:[AMapOverlay class]]) {
        [self.mapView addOverlay:(id <MAOverlay>) subview];
    }
}

- (void)removeReactSubview:(UIView *)subview {
    [super removeReactSubview:subview];
    if ([subview isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) subview;
        [self.mapView removeAnnotation:marker.annotation];
    }
    if ([subview isKindOfClass:[AMapOverlay class]]) {
        [self.mapView removeOverlay:(id <MAOverlay>) subview];
    }
}

- (AMapMarker *)getMarker:(id <MAAnnotation>)annotation {
    return _markers[[@(annotation.hash) stringValue]];
}

- (void)setShowsScale:(BOOL)shows {
    self.mapView.showsScale = shows;
}

- (void)setShowsIndoorMap:(BOOL)shows {
    self.mapView.showsIndoorMap = shows;
}

- (void)setShowsLabels:(BOOL)shows {
    self.mapView.showsLabels = shows;
}


- (void)setShowsBuildings:(BOOL)shows {
    self.mapView.showsBuildings = shows;
}

- (void)setZoomLevel:(CGFloat)zoomLevel {
    self.mapView.zoomLevel = zoomLevel;
}

- (void)setMinZoomLevel:(CGFloat)minZoomLevel {
    self.mapView.minZoomLevel = minZoomLevel;
}

- (void)setMaxZoomLevel:(CGFloat)maxZoomLevel {
    self.mapView.maxZoomLevel = maxZoomLevel;
}

- (void)setZoomEnabled:(BOOL)zoomEnabled {
    self.mapView.zoomEnabled = zoomEnabled;
}

- (void)setScrollEnabled:(BOOL)scrollEnabled {
    self.mapView.scrollEnabled = scrollEnabled;
}

- (void)setRotateEnabled:(BOOL)rotateEnabled {
    self.mapView.rotateEnabled = rotateEnabled;
}

- (void)setMapType:(MAMapType)mapType {
    self.mapView.mapType = mapType;
}

- (void)setLimitRegion:(MACoordinateRegion)limitRegion {
    self.mapView.limitRegion = limitRegion;
}

- (void)setDistanceFilter:(CLLocationDistance)distanceFilter {
    self.mapView.distanceFilter = distanceFilter;
}

- (void)mapView:(MAMapView *)mapView didSingleTappedAtCoordinate:(CLLocationCoordinate2D)coordinate {
    if (self.onPress) {
        self.onPress(@{
                          @"latitude": @(coordinate.latitude),
                          @"longitude": @(coordinate.longitude),
                          });
    }
}

- (void)mapView:(MAMapView *)mapView didLongPressedAtCoordinate:(CLLocationCoordinate2D)coordinate {
    if (self.onLongPress) {
        self.onLongPress(@{
                              @"latitude": @(coordinate.latitude),
                              @"longitude": @(coordinate.longitude),
                              });
    }
}

- (void)mapView:(MAMapView *)mapView didUpdateUserLocation:(MAUserLocation *)userLocation updatingLocation:(BOOL)updatingLocation {
    if (self.onLocation) {
        self.onLocation(@{
                             @"latitude": @(userLocation.coordinate.latitude),
                             @"longitude": @(userLocation.coordinate.longitude),
                             @"accuracy": @((userLocation.location.horizontalAccuracy + userLocation.location.verticalAccuracy) / 2),
                             @"altitude": @(userLocation.location.altitude),
                             @"speed": @(userLocation.location.speed),
                             @"timestamp": @(userLocation.location.timestamp.timeIntervalSince1970),
                             });
    }
}

- (MAAnnotationView *)mapView:(MAMapView *)mapView viewForAnnotation:(id <MAAnnotation>)annotation {
    if ([annotation isKindOfClass:[MAPointAnnotation class]]) {
        AMapMarker *marker = [self getMarker:annotation];
        return marker.annotationView;
    }
    return nil;
}

- (MAOverlayRenderer *)mapView:(MAMapView *)mapView rendererForOverlay:(id <MAOverlay>)overlay {
    if ([overlay isKindOfClass:[AMapOverlay class]]) {
        return ((AMapOverlay *) overlay).renderer;
    }
    return nil;
}

- (void)mapView:(MAMapView *)mapView didSelectAnnotationView:(MAAnnotationView *)view {
    AMapMarker *marker = [self getMarker:view.annotation];
    if (marker.onPress) {
        marker.onPress(nil);
    }
}

- (void)mapView:(MAMapView *)mapView didAnnotationViewCalloutTapped:(MAAnnotationView *)view {
    AMapMarker *marker = [self getMarker:view.annotation];
    if (marker.onInfoWindowPress) {
        marker.onInfoWindowPress(nil);
    }
}

- (void)mapView:(MAMapView *)mapView annotationView:(MAAnnotationView *)view didChangeDragState:(MAAnnotationViewDragState)newState
   fromOldState:(MAAnnotationViewDragState)oldState {
    AMapMarker *marker = [self getMarker:view.annotation];
    if (newState == MAAnnotationViewDragStateStarting && marker.onDragStart) {
        marker.onDragStart(nil);
    }
    if (newState == MAAnnotationViewDragStateDragging) {
        if (marker.onDrag) {
            marker.onDrag(nil);
        }
    }
    if (newState == MAAnnotationViewDragStateEnding && marker.onDragEnd) {
        marker.onDragEnd(@{
                           @"latitude": @(marker.annotation.coordinate.latitude),
                           @"longitude": @(marker.annotation.coordinate.longitude),
                           });
    }
}

- (void)mapViewRegionChanged:(MAMapView *)mapView {
    if (self.onStatusChange) {
        MAMapStatus *status = mapView.getMapStatus;
        self.onStatusChange(@{
                                 @"zoomLevel": @(status.zoomLevel),
                                 @"tilt": @(status.cameraDegree),
                                 @"rotation": @(status.rotationDegree),
                                 @"latitude": @(status.centerCoordinate.latitude),
                                 @"longitude": @(status.centerCoordinate.longitude),
                                 });
    }
}

- (void)mapView:(MAMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
    if (self.onStatusChangeComplete) {
        MAMapStatus *status = mapView.getMapStatus;
        self.onStatusChangeComplete(@{
                                         @"zoomLevel": @(status.zoomLevel),
                                         @"tilt": @(status.cameraDegree),
                                         @"rotation": @(status.rotationDegree),
                                         @"latitude": @(status.centerCoordinate.latitude),
                                         @"longitude": @(status.centerCoordinate.longitude),
                                         @"latitudeDelta": @(mapView.region.span.latitudeDelta),
                                         @"longitudeDelta": @(mapView.region.span.longitudeDelta),
                                         });
    }
}

- (void)mapInitComplete:(MAMapView *)mapView {
    self.loaded = YES;
    
    // struct 里的值会被初始化为 0，这里以此作为条件，判断 initialRegion 是否被设置过
    // 但实际上经度为 0 是一个合法的坐标，只是考虑到高德地图只在中国使用，就这样吧
    if (self.initialRegion.center.latitude != 0) {
        mapView.region = self.initialRegion;
    }
}

@end
