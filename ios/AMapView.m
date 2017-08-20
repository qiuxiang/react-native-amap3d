#import <React/UIView+React.h>
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

- (void)setRotation:(CGFloat)degree {
    super.rotationDegree = degree;
}

- (void)insertReactSubview:(id <RCTComponent>)subview atIndex:(NSInteger)atIndex {
    [super insertReactSubview:subview atIndex:atIndex];
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([subview isKindOfClass:[AMapMarker class]]) {
            ((AMapMarker *) subview).mapView = self;
            [self addAnnotation:(id <MAAnnotation>) subview];
        }
        if ([subview isKindOfClass:[AMapModel class]]) {
            [self addOverlay:(id <MAOverlay>) subview];
        }
    });
}

- (void)removeReactSubview:(id <RCTComponent>)subview {
    [super removeReactSubview:subview];
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([subview isKindOfClass:[AMapMarker class]]) {
            [self removeAnnotation:(id <MAAnnotation>) subview];
        }
        if ([subview isKindOfClass:[AMapModel class]]) {
            [self removeOverlay:(id <MAOverlay>) subview];
        }
    });
}

@end
