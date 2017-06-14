#import "AMapMarker.h"
#import "AMapView.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapMarker {
    MAAnnotationView *_pinView;
}

- (void)setActive:(BOOL)active {
    self._active = active;
    if (active) {
        [self.mapView selectAnnotation:self animated:YES];
    }
}

- (void)setDescription:(NSString *)description {
    self.subtitle = description;
}

- (void)setInfoWindowEnabled:(BOOL)enabled {
    self.canShowCallout = enabled;
}

- (MAAnnotationView *)getAnnotationView {
    if (_pinView == nil) {
        _pinView = [[MAPinAnnotationView alloc] initWithAnnotation:self reuseIdentifier: nil];
        _pinView.annotation = self;
    }
    _pinView.zIndex = self.zIndex;
    _pinView.draggable = self.draggable;
    _pinView.canShowCallout = self.canShowCallout;
    return _pinView;
}

- (BOOL)active {
    return self._active;
}

@end
