#import <MAMapKit/MAMapKit.h>
#import <React/RCTViewManager.h>
#import "AMapView.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"
@interface AMapViewManager : RCTViewManager
@end

@implementation AMapViewManager {
    AMapView *mapView;
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    mapView = [[AMapView alloc] init];
    mapView.centerCoordinate = CLLocationCoordinate2DMake(39.9042, 116.4074);
    mapView.zoomLevel = 10;
    return mapView;
}

RCT_EXPORT_VIEW_PROPERTY(showsCompass, BOOL)

RCT_EXPORT_VIEW_PROPERTY(showsScale, BOOL)

RCT_EXPORT_VIEW_PROPERTY(showsIndoorMap, BOOL)

RCT_EXPORT_VIEW_PROPERTY(showsLabels, BOOL)

RCT_EXPORT_VIEW_PROPERTY(showsTraffic, BOOL)

RCT_EXPORT_VIEW_PROPERTY(showsBuildings, BOOL)

RCT_EXPORT_VIEW_PROPERTY(zoomLevel, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(maxZoomLevel, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(minZoomLevel, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(rotateEnabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(tiltEnabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(mapType, MAMapType)

RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)

@end
