#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(AMapViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(mapType, MAMapType)
RCT_EXPORT_VIEW_PROPERTY(initialCameraPosition, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(myLocationEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(buildingsEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(trafficEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(indoorViewEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(compassEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scaleControlsEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(rotateGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(tiltGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(minZoom, double)
RCT_EXPORT_VIEW_PROPERTY(maxZoom, double)
RCT_EXPORT_VIEW_PROPERTY(distanceFilter, double)
RCT_EXPORT_VIEW_PROPERTY(headingFilter, double)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPressPoi, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLongPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraIdle, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraMove, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoad, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLocation, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCallback, RCTBubblingEventBlock)

RCT_EXTERN_METHOD(moveCamera:(nonnull NSNumber *)reactTag position:(NSDictionary *)_ duration:(int)_)
RCT_EXTERN_METHOD(call:(nonnull NSNumber *)reactTag callerId:(double)_ name:(NSString *)_ args:(NSDictionary *)_)

@end
