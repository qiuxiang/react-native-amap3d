#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AMapOffline, NSObject)

RCT_EXTERN_METHOD(download: (NSString)apiKey)
RCT_EXTERN_METHOD(addListener: (NSString)eventType)
RCT_EXTERN_METHOD(removeListeners: (int)count)

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"download" ];
}

@end
