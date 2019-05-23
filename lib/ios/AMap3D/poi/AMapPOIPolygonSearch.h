#import <React/RCTEventEmitter.h>

#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapSearchKit/AMapSearchKit.h>

@interface AMapPOIPolygonSearch : RCTEventEmitter <RCTBridgeModule, AMapSearchDelegate>
@end
