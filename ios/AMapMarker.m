#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapMarker {
    MAAnnotationView *_annotationView;
    MAPointAnnotation *_annotation;
    AMapOverlay *_marker;
    AMapOverlay *_callout;
    AMapView *_mapView;
    BOOL _active;
    NSString *_title;
    NSString *_subtitle;
    CLLocationCoordinate2D _coordinate;
    MAPinAnnotationColor _pinColor;
    BOOL _draggable;
    NSInteger _zIndex;
}

- (MAAnnotationView *)annotationView {
    return _annotationView;
}

- (NSString *)title {
    return _title;
}

- (NSString *)subtitle {
    return _subtitle;
}

- (CLLocationCoordinate2D)coordinate {
    return _coordinate;
}

- (void)setCoordinate:(CLLocationCoordinate2D)coordinate {
    _coordinate = coordinate;
    _annotation.coordinate = coordinate;
}

- (void)setTitle:(NSString *)title {
    _title = title;
    _annotation.title = title;
}

- (void)setActive:(BOOL)active {
    _active = active;
    if (active) {
        [_mapView selectAnnotation:self animated:YES];
    } else {
        [_mapView deselectAnnotation:self animated:YES];
    }
}

- (void)setIcon:(MAPinAnnotationColor)color {
    _pinColor = color;
    ((MAPinAnnotationView *) _annotationView).pinColor = color;
}

- (void)setDescription:(NSString *)description {
    _subtitle = description;
    _annotation.subtitle = description;
}

- (void)setDraggable:(BOOL)draggable {
    _draggable = draggable;
    _annotationView.draggable = draggable;
}

- (void)setInfoWindowEnabled:(BOOL)enabled {
    _annotationView.canShowCallout = enabled;
}

- (void)setZIndex:(NSInteger)zIndex {
    _zIndex = zIndex;
    _annotationView.zIndex = zIndex;
}

- (void)setMapView:(AMapView *)mapView {
    _mapView = mapView;
}

- (BOOL)active {
    return _active;
}

- (void)insertReactSubview:(id <RCTComponent>)subview atIndex:(NSInteger)atIndex {
    if (atIndex == 0) {
        _annotation = [MAPointAnnotation new];
        _annotation.coordinate = _coordinate;
        _annotation.title = _title;
        _annotation.subtitle = _subtitle;

        if ([subview isKindOfClass:[AMapOverlay class]]) {
            _marker = (AMapOverlay *) subview;
            _marker.delegate = self;
            _annotationView = [[MAAnnotationView alloc] initWithAnnotation:_annotation reuseIdentifier:nil];
        } else {
            _annotationView = [[MAPinAnnotationView alloc] initWithAnnotation:_annotation reuseIdentifier:nil];
            ((MAPinAnnotationView *) _annotationView).pinColor = _pinColor;
        }

        _annotationView.canShowCallout = YES;
        _annotationView.draggable = _draggable;
        _annotationView.zIndex = _zIndex;
    } else if (atIndex == 1 && [subview isKindOfClass:[AMapOverlay class]]) {
        _callout = (AMapOverlay *) subview;
        _callout.delegate = self;

        UIButton *button = [UIButton new];
        [button addSubview:_callout];

        _annotationView.customCalloutView = [[MACustomCalloutView alloc] initWithCustomView:button];
    }
}

#pragma mark AMapOverlayDelegate

- (void)update:(AMapOverlay *)overlay {
    if (self.dragging) {
        return;
    }

    CGFloat width = CGRectGetWidth(overlay.bounds);
    CGFloat height = CGRectGetHeight(overlay.bounds);

    if (overlay == _marker) {
        UIGraphicsBeginImageContextWithOptions([_marker bounds].size, NO, 0.0f);
        [_marker.layer renderInContext:UIGraphicsGetCurrentContext()];
        UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        _annotationView.image = image;
        _annotationView.centerOffset = CGPointMake(0, -height / 2);
    } else if (overlay == _callout) {
        _annotationView.customCalloutView.bounds = CGRectMake(0, 0, width, height);
    }
}

@end
