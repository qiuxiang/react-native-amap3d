#import <React/RCTUIManager.h>
#import <AMapNaviKit/AMapNaviRideManager.h>
#import "AMapNavigationManager.h"
#import "AMapRide.h"

@interface AMapRideManager : RCTViewManager <AMapNaviRideManagerDelegate>
+ (AMapRide *)navigationView;
+ (AMapNaviRideManager *)navigationManager;
@end

@implementation AMapRideManager {
    AMapRide *_navigationView;
    AMapNaviRideManager *_navigationManager;
}

INIT(AMapRideManager)
NAVIGATION_VIEW(AMapRide)
NAVIGATION_MANAGER(AMapRideManager, AMapNaviRideManager)

RCT_EXPORT_METHOD(calculateRoute:(nonnull NSNumber *)reactTag
                           start:(AMapNaviPoint *)start
                             end:(AMapNaviPoint *)end
                             way:(NSArray<AMapNaviPoint *> *)way) {
    [_navigationManager calculateRideRouteWithStartPoint:start endPoint:end];
}

- (void)rideManagerOnCalculateRouteSuccess:(AMapNaviRideManager *)rideManager {
    if (_navigationView.onCalculateRouteSuccess) {
        _navigationView.onCalculateRouteSuccess(nil);
    }
}

- (void)rideManager:(AMapNaviRideManager *)rideManager onCalculateRouteFailure:(NSError *)error {
    if (_navigationView.onCalculateRouteFailure) {
        _navigationView.onCalculateRouteFailure(@{
                @"code": @(error.code),
        });
    }
}

@end
