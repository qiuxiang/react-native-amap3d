#import <MAMapKit/MAMapKit.h>
#import <React/RCTViewManager.h>

@interface AMapViewManager : RCTViewManager
@end

@implementation AMapViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[MAMapView alloc] init];
}

@end
