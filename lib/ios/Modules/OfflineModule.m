#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AMapOffline, NSObject)

RCT_EXTERN_METHOD(download:(NSString)apiKey)
RCT_EXTERN_METHOD(addListener:(NSString)eventType)
RCT_EXTERN_METHOD(removeListeners:(NSInteger)count)

- (NSArray<NSString *> *)supportedEvents {
  return @[@"download"];
}

@end
