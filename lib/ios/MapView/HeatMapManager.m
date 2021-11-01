#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(AMapHeatMapManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(data, NSArray)
RCT_EXPORT_VIEW_PROPERTY(radius, int)
RCT_EXPORT_VIEW_PROPERTY(opacity, double)

@end
