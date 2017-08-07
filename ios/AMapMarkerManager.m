#import <React/RCTViewManager.h>
#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapMarkerManager : RCTViewManager <MAMapViewDelegate>
@end

@implementation AMapMarkerManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapMarker new];
}

RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(description, NSString)
RCT_EXPORT_VIEW_PROPERTY(active, BOOL)
RCT_EXPORT_VIEW_PROPERTY(draggable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(clickable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(infoWindowEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(icon, MAPinAnnotationColor)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onInfoWindowPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragStart, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDrag, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragEnd, RCTBubblingEventBlock)

@end
