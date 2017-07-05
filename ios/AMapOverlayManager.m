#import <React/RCTUIManager.h>
#import "AMapOverlay.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapOverlayManager : RCTViewManager
@end

@implementation AMapOverlayManager {
}

RCT_EXPORT_MODULE(AMapOverlay)

- (UIView *)view {
    return [AMapOverlay new];
}

RCT_EXPORT_METHOD(update:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        id view = viewRegistry[reactTag];
        [(AMapOverlay *) view update];
    }];

}

@end
