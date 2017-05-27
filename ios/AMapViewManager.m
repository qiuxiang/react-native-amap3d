#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

@interface AMapViewManager : RCTViewManager
@end

@implementation AMapViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[MKMapView alloc] init];
}

@end
