#import <React/RCTUIManager.h>
#import <AMapNaviKit/AMapNaviWalkManager.h>
#import "AMapNavigationManager.h"
#import "AMapWalk.h"

@interface AMapWalkManager : RCTViewManager <AMapNaviWalkManagerDelegate>
+ (AMapWalk *)navigationView;
+ (AMapNaviWalkManager *)navigationManager;
@end

@implementation AMapWalkManager {
    AMapWalk *_navigationView;
    AMapNaviWalkManager *_navigationManager;
}

INIT(AMapWalkManager)
NAVIGATION_VIEW(AMapWalk)
NAVIGATION_MANAGER(AMapWalkManager, AMapNaviWalkManager)

RCT_EXPORT_METHOD(calculateRoute:(nonnull NSNumber *)reactTag
                           start:(AMapNaviPoint *)start
                             end:(AMapNaviPoint *)end
                             way:(NSArray<AMapNaviPoint *> *)way) {
    [_navigationManager calculateWalkRouteWithStartPoints:@[start] endPoints:@[end]];
}

- (void)walkManagerOnCalculateRouteSuccess:(AMapNaviWalkManager *)walkManager {
    if (_navigationView.onCalculateRouteSuccess) {
        _navigationView.onCalculateRouteSuccess(nil);
    }
}

- (void)walkManager:(AMapNaviWalkManager *)walkManager onCalculateRouteFailure:(NSError *)error {
    if (_navigationView.onCalculateRouteFailure) {
        _navigationView.onCalculateRouteFailure(@{
                @"code": @(error.code),
        });
    }
}

@end
