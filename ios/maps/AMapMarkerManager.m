#import <React/RCTUIManager.h>
#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapMarkerManager : RCTViewManager
@end

@implementation AMapMarkerManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapMarker new];
}

RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(centerOffset, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(description, NSString)
RCT_EXPORT_VIEW_PROPERTY(active, BOOL)
RCT_EXPORT_VIEW_PROPERTY(draggable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(clickDisabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(infoWindowDisabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(color, MAPinAnnotationColor)
RCT_EXPORT_VIEW_PROPERTY(image, NSString)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onInfoWindowPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragStart, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDrag, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragEnd, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(lockToScreen:(nonnull NSNumber *)reactTag x:(int)x y:(int)y) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        AMapMarker *marker = (AMapMarker *) viewRegistry[reactTag];
        [marker lockToScreen:x y:y];
    }];
}

RCT_EXPORT_METHOD(active:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        AMapMarker *marker = (AMapMarker *) viewRegistry[reactTag];
        marker.active = YES;
    }];
}

@end
