#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(AMapMultiPointManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(items, NSArray)
RCT_EXPORT_VIEW_PROPERTY(icon, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
