#import <React/RCTUIManager.h>
#import "AMapCallout.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapCalloutManager : RCTViewManager
@end

@implementation AMapCalloutManager {
}

RCT_EXPORT_MODULE(AMapInfoWindow)

- (UIView *)view {
    return [AMapCallout new];
}

@end
