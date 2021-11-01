#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(AMapCircleManager, RCTViewManager)

RCT_REMAP_VIEW_PROPERTY(center, circleCenter, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(radius, double)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, double)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)

@end
