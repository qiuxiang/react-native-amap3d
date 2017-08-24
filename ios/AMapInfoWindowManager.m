#import <React/RCTUIManager.h>
#import "AMapInfoWindow.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapInfoWindowManager : RCTViewManager
@end

@implementation AMapInfoWindowManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapInfoWindow new];
}

@end
