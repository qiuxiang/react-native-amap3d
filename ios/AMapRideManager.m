#import <React/RCTUIManager.h>
#import <AMapNaviKit/AMapNaviRideView.h>
#import <AMapNaviKit/AMapNaviRideManager.h>
#import "AMapRide.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapRideManager : RCTViewManager <AMapNaviRideManagerDelegate>
+ (AMapRide *)rideView;
+ (AMapNaviRideManager *)rideManager;
@end

@implementation AMapRideManager {
    AMapRide *_rideView;
    AMapNaviRideManager *_rideManager;
}

- (instancetype)init {
    if (self = [super init]) {
        _rideView = [AMapRideManager rideView];
        _rideManager = [AMapRideManager rideManager];
        _rideManager.delegate = self;
    }
    return self;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteSuccess, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteFailure, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(calculateRoute:(nonnull NSNumber *)reactTag start:(AMapNaviPoint *)start end:(AMapNaviPoint *)end) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        [_rideManager calculateRideRouteWithStartPoint:start
                                                endPoint:end];
    }];
}

RCT_EXPORT_METHOD(start:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        [_rideManager startGPSNavi];
    }];
}

- (UIView *)view {
    return _rideView;
}

- (void)rideManagerOnCalculateRouteSuccess:(AMapNaviRideManager *)rideManager {
    if (_rideView.onCalculateRouteSuccess) {
        _rideView.onCalculateRouteSuccess(nil);
    }
}

- (void)rideManager:(AMapNaviRideManager *)rideManager onCalculateRouteFailure:(NSError *)error {
    if (_rideView.onCalculateRouteFailure) {
        _rideView.onCalculateRouteFailure(@{
                @"code": @(error.code),
        });
    }
}

+ (AMapNaviRideManager *)rideManager {
    static AMapNaviRideManager *rideManager;
    if (rideManager == nil) {
        rideManager = [AMapNaviRideManager new];
        [rideManager addDataRepresentative:[AMapRideManager rideView]];
    }
    return rideManager;
}

+ (AMapRide *)rideView {
    static AMapRide *rideView;
    if (rideView == nil) {
        rideView = [AMapRide new];
    }
    return rideView;
}

@end
