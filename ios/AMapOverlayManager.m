#import <React/RCTUIManager.h>
#import "AMapOverlay.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapOverlayManager : RCTViewManager
@end

@implementation AMapOverlayManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapOverlay new];
}

@end
