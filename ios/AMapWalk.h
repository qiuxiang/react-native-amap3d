#import <AMapNaviKit/AMapNaviWalkView.h>
#import <React/RCTComponent.h>

@interface AMapWalk : AMapNaviWalkView
@property(nonatomic, copy) RCTBubblingEventBlock onCalculateRouteSuccess;
@property(nonatomic, copy) RCTBubblingEventBlock onCalculateRouteFailure;
@end