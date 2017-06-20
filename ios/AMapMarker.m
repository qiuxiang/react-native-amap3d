#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapMarker {
    MAAnnotationView *_pinView;
    AMapOverlay *_iconView;
    BOOL _active;
}

- (void)setActive:(BOOL)active {
    _active = active;
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
    if (_iconView != nil) {
        _pinView.image = nil;
    }
    _pinView.zIndex = self.zIndex;
    _pinView.draggable = self.draggable;
    _pinView.canShowCallout = self.canShowCallout;
    _pinView.customCalloutView = self.customCalloutView;
    return _pinView;
}

- (BOOL)active {
    return _active;
}

- (void)insertReactSubview:(id<RCTComponent>)subview atIndex:(NSInteger)atIndex {
    if ([subview isKindOfClass:[AMapOverlay class]]) {
        _iconView = (AMapOverlay *)subview;
        _iconView.delegate = self;
    }
    if ([subview isKindOfClass:[AMapInfoWindow class]]) {
        self.customCalloutView = [[MACustomCalloutView alloc] initWithCustomView:(id) subview];
    }
}

#pragma mark AMapOverlayDelegate
- (void)update {
    UIGraphicsBeginImageContextWithOptions([_iconView bounds].size, NO, 0.0f);
    [_iconView.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    _pinView.image = image;
}

@end
