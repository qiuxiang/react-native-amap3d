#import <React/UIView+React.h>
#import "AMapView.h"
#import "AMapMarker.h"
#import "AMapPolyline.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapView {
    NSMutableDictionary *_markers;
}

- (instancetype)init {
    _markers = [NSMutableDictionary new];
    self = [super init];
    return self;
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

- (void)didAddSubview:(UIView *)subview {
    if ([subview isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) subview;
        marker.mapView = self;
        _markers[[@(marker.annotation.hash) stringValue]] = marker;
        dispatch_async(dispatch_get_main_queue(), ^{
            [self addAnnotation:marker.annotation];
        });
    }
    if ([subview isKindOfClass:[AMapOverlay class]]) {
        [self addOverlay:(id <MAOverlay>) subview];
    }
}

- (void)removeReactSubview:(id <RCTComponent>)subview {
    [super removeReactSubview:subview];
    if ([subview isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) subview;
        [self removeAnnotation:marker.annotation];
    }
    if ([subview isKindOfClass:[AMapOverlay class]]) {
        [self removeOverlay:(id <MAOverlay>) subview];
    }
}

- (AMapMarker *)getMarker:(id <MAAnnotation>)annotation {
    return _markers[[@(annotation.hash) stringValue]];
}

@end
