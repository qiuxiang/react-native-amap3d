#import "AMapView.h"
#import "AMapMarker.h"
#import "AMapPolyline.h"

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

- (void)insertReactSubview:(id <RCTComponent>)subview atIndex:(NSInteger)atIndex {
    if ([subview isKindOfClass:[AMapMarker class]]) {
        ((AMapMarker *) subview).mapView = self;
        [self addAnnotation:(id <MAAnnotation>) subview];
    }
    if ([subview isKindOfClass:[AMapModel class]]) {
        [self addOverlay:(id <MAOverlay>) subview];
    }
}

- (void)removeReactSubview:(id <RCTComponent>)subview {
    if ([subview isKindOfClass:[AMapMarker class]]) {
        [self removeAnnotation:(id <MAAnnotation>) subview];
    }
    if ([subview isKindOfClass:[AMapModel class]]) {
        [self removeOverlay:(id <MAOverlay>) subview];
    }
}

@end
