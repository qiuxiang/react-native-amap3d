#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(AMapMarkerManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(latLng, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(centerOffset, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(draggable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zIndex, int)
RCT_EXPORT_VIEW_PROPERTY(icon, NSDictionary)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragStart, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDrag, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragEnd, RCTBubblingEventBlock)

RCT_EXTERN_METHOD(update:(nonnull NSNumber *)reactTag)

@end
