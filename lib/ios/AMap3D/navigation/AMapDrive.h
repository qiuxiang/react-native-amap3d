#import <AMapNaviKit/AMapNaviDriveView.h>
#import <React/RCTComponent.h>

@interface AMapDrive : AMapNaviDriveView
@property(nonatomic, copy) RCTBubblingEventBlock onCalculateRouteSuccess;
@property(nonatomic, copy) RCTBubblingEventBlock onCalculateRouteFailure;
@end