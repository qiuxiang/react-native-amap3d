#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapMarkerManager : RCTViewManager <MAMapViewDelegate>
@end

@implementation AMapMarkerManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    AMapMarker *marker = [AMapMarker new];
    marker.canShowCallout = YES;
    return marker;
}

RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(description, NSString)
RCT_EXPORT_VIEW_PROPERTY(active, BOOL)
RCT_EXPORT_VIEW_PROPERTY(draggable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(infoWindowEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zIndex, NSInteger)

@end
