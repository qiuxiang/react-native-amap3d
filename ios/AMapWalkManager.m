#import <React/RCTUIManager.h>
#import <AMapNaviKit/AMapNaviWalkView.h>
#import <AMapNaviKit/AMapNaviWalkManager.h>
#import "AMapWalk.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapWalkManager : RCTViewManager <AMapNaviWalkManagerDelegate>
+ (AMapWalk *)walkView;
+ (AMapNaviWalkManager *)walkManager;
@end

@implementation AMapWalkManager {
    AMapWalk *_walkView;
    AMapNaviWalkManager *_walkManager;
}

- (instancetype)init {
    if (self = [super init]) {
        _walkView = [AMapWalkManager walkView];
        _walkManager = [AMapWalkManager walkManager];
        _walkManager.delegate = self;
    }
    return self;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteSuccess, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteFailure, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(calculateRoute:(nonnull NSNumber *)reactTag start:(AMapNaviPoint *)start end:(AMapNaviPoint *)end) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        [_walkManager calculateWalkRouteWithStartPoints:@[start]
                                                endPoints:@[end]];
    }];
}

RCT_EXPORT_METHOD(start:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        [_walkManager startGPSNavi];
    }];
}

- (UIView *)view {
    return _walkView;
}

- (void)walkManagerOnCalculateRouteSuccess:(AMapNaviWalkManager *)walkManager {
    if (_walkView.onCalculateRouteSuccess) {
        _walkView.onCalculateRouteSuccess(nil);
    }
}

- (void)walkManager:(AMapNaviWalkManager *)walkManager onCalculateRouteFailure:(NSError *)error {
    if (_walkView.onCalculateRouteFailure) {
        _walkView.onCalculateRouteFailure(@{
                @"code": @(error.code),
        });
    }
}

+ (AMapNaviWalkManager *)walkManager {
    static AMapNaviWalkManager *walkManager;
    if (walkManager == nil) {
        walkManager = [AMapNaviWalkManager new];
        [walkManager addDataRepresentative:[AMapWalkManager walkView]];
    }
    return walkManager;
}

+ (AMapWalk *)walkView {
    static AMapWalk *walkView;
    if (walkView == nil) {
        walkView = [AMapWalk new];
    }
    return walkView;
}

@end
