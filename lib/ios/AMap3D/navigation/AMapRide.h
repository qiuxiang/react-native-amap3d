#import <AMapNaviKit/AMapNaviRideView.h>
#import <React/RCTComponent.h>

@interface AMapRide : AMapNaviRideView
@property(nonatomic, copy) RCTBubblingEventBlock onCalculateRouteSuccess;
@property(nonatomic, copy) RCTBubblingEventBlock onCalculateRouteFailure;
@end