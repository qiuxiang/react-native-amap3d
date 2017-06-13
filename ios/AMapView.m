#import "AMapView.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapView {
}

- (void)setShowsTraffic:(BOOL)shows {
    super.showTraffic = shows;
}

- (void)setTiltEnabled:(BOOL)enabled {
    super.rotateCameraEnabled = enabled;
}

- (void)setLocationEnabled:(BOOL)enabled {
    super.showsUserLocation = enabled;
}

- (void)setCoordinate:(CLLocationCoordinate2D)json {
    super.centerCoordinate = json;
}

- (void)setTilt:(CGFloat)degree {
    super.cameraDegree = degree;
}

@end
