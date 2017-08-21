#import <AMapNaviKit/AMapNaviDriveView.h>
#import <React/RCTComponent.h>

@interface AMapNavigation : AMapNaviDriveView
@property(nonatomic, copy) RCTBubblingEventBlock onCalculateRouteSuccess;
@end