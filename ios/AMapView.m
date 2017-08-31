#import <React/UIView+React.h>
#import "AMapView.h"
#import "AMapMarker.h"
#import "AMapPolyline.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapView {
}

- (void)setShowsTraffic:(BOOL)shows {
    self.showTraffic = shows;
}

- (void)setTiltEnabled:(BOOL)enabled {
    self.rotateCameraEnabled = enabled;
}

- (void)setLocationEnabled:(BOOL)enabled {
    self.showsUserLocation = enabled;
}

- (void)setCoordinate:(CLLocationCoordinate2D)json {
    self.centerCoordinate = json;
}

- (void)setTilt:(CGFloat)degree {
    self.cameraDegree = degree;
}

- (void)setRotation:(CGFloat)degree {
    self.rotationDegree = degree;
}

// 不能直接 setRegion，因为如果地图未加载 setRegion 是无效的
- (void)setRegion:(MACoordinateRegion)region {
    if (self.loaded) {
        super.region = region;
    } else {
        self.initialRegion = region;
    }
}

- (void)insertReactSubview:(id <RCTComponent>)subview atIndex:(NSInteger)atIndex {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([subview isKindOfClass:[AMapMarker class]]) {
            ((AMapMarker *) subview).mapView = self;
            [self addAnnotation:(id <MAAnnotation>) subview];
        }
        if ([subview isKindOfClass:[AMapModel class]]) {
            [self addOverlay:(id <MAOverlay>) subview];
        }
        [super insertReactSubview:subview atIndex:atIndex];
    });
}

- (void)removeReactSubview:(id <RCTComponent>)subview {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([subview isKindOfClass:[AMapMarker class]]) {
            [self removeAnnotation:(id <MAAnnotation>) subview];
        }
        if ([subview isKindOfClass:[AMapModel class]]) {
            [self removeOverlay:(id <MAOverlay>) subview];
        }
        [super removeReactSubview:subview];
    });
}

@end
