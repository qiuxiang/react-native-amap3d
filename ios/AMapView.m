#import "AMapView.h"

@implementation AMapView {
}

- (void)setShowsTraffic:(BOOL)shows {
    [super setShowTraffic:shows];
}

- (void)setTiltEnabled:(BOOL)enabled {
    [super setRotateCameraEnabled:enabled];
}

- (void)setCoordinate:(CLLocationCoordinate2D)json {
    super.centerCoordinate = json;
}

@end
