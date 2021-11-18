#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(AMapPolylineManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(points, NSArray)
RCT_EXPORT_VIEW_PROPERTY(width, double)
RCT_EXPORT_VIEW_PROPERTY(color, UIColor)
RCT_EXPORT_VIEW_PROPERTY(dotted, BOOL)
RCT_EXPORT_VIEW_PROPERTY(gradient, BOOL)
RCT_EXPORT_VIEW_PROPERTY(colors, UIColorArray)

@end
