#import <React/UIView+React.h>
#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"
#pragma clang diagnostic ignored "-Woverriding-method-mismatch"

@implementation AMapMarker {
    MAPointAnnotation *_annotation;
    MAAnnotationView *_annotationView;
    MACustomCalloutView *_calloutView;
    UIView *_customView;
    __weak AMapView *_mapView;
    MAPinAnnotationColor _pinColor;
    UIImage *_image;
    CGPoint _centerOffset;
    BOOL _draggable;
    BOOL _active;
    BOOL _canShowCallout;
    BOOL _enabled;
    NSInteger _zIndex;
}

- (instancetype)init {
    _annotation = [MAPointAnnotation new];
    _enabled = YES;
    _canShowCallout = YES;
    self = [super init];
    return self;
}

- (NSString *)title {
    return _annotation.title;
}

- (NSString *)subtitle {
    return _annotation.subtitle;
}

- (CLLocationCoordinate2D)coordinate {
    return _annotation.coordinate;
}

- (void)setTitle:(NSString *)title {
    _annotation.title = title;
}

- (void)setColor:(MAPinAnnotationColor)color {
    _pinColor = color;
    ((MAPinAnnotationView *) _annotationView).pinColor = color;
}

- (void)setDraggable:(BOOL)draggable {
    _draggable = draggable;
    _annotationView.draggable = draggable;
}

- (void)setCenterOffset:(CGPoint)centerOffset {
    _centerOffset = centerOffset;
    _annotationView.centerOffset = centerOffset;
}

- (void)setImage:(NSString *)name {
    _image = [UIImage imageNamed:name];
    if (_image != nil) {
        _annotationView.image = _image;
    }
}

- (void)setDescription:(NSString *)description {
    _annotation.subtitle = description;
}

- (void)setCoordinate:(CLLocationCoordinate2D)coordinate {
    _annotation.coordinate = coordinate;
}

- (void)setActive:(BOOL)active {
    _active = active;
    dispatch_async(dispatch_get_main_queue(), ^{
        if (active) {
            [_mapView selectAnnotation:_annotation animated:YES];
        } else {
            [_mapView deselectAnnotation:_annotation animated:YES];
        }
    });
}

- (void)setInfoWindowDisabled:(BOOL)disabled {
    _canShowCallout = !disabled;
    _annotationView.canShowCallout = !disabled;
}

- (void)setClickDisabled:(BOOL)disabled {
    _enabled = !disabled;
    _annotationView.enabled = !disabled;
}

- (void)setZIndex:(NSInteger)zIndex {
    _zIndex = zIndex;
    _annotationView.zIndex = zIndex;
}

- (MAPointAnnotation *)annotation {
    return _annotation;
}

- (void)setMapView:(AMapView *)mapView {
    _mapView = mapView;
}

- (void)_handleTap:(UITapGestureRecognizer *)recognizer {
    [_mapView selectAnnotation:_annotation animated:YES];
}

- (MAAnnotationView *)annotationView {
    if (_annotationView == nil) {
        if (_customView) {
            _customView.hidden = NO;
            _annotationView = [[MAAnnotationView alloc] initWithAnnotation:_annotation reuseIdentifier:nil];
            _annotationView.bounds = _customView.bounds;
            [_annotationView addSubview:_customView];
            [_annotationView addGestureRecognizer:[
                    [UITapGestureRecognizer alloc] initWithTarget:self action:@selector(_handleTap:)]];
        } else {
            _annotationView = [[MAPinAnnotationView alloc] initWithAnnotation:_annotation reuseIdentifier:nil];
            ((MAPinAnnotationView *) _annotationView).pinColor = _pinColor;
        }

        _annotationView.enabled = _enabled;
        _annotationView.canShowCallout = _canShowCallout;
        _annotationView.draggable = _draggable;
        _annotationView.customCalloutView = _calloutView;
        _annotationView.centerOffset = _centerOffset;

        if (_zIndex) {
            _annotationView.zIndex = _zIndex;
        }

        if (_image != nil) {
            _annotationView.image = _image;
        }

        [self setActive:_active];
    }
    return _annotationView;
}

- (void)didAddSubview:(UIView *)subview {
    if ([subview isKindOfClass:[AMapCallout class]]) {
        _calloutView = [[MACustomCalloutView alloc] initWithCustomView:subview];
        _annotationView.customCalloutView = _calloutView;
    } else {
        _customView = subview;
        _customView.hidden = YES;
    }
}

- (void)lockToScreen:(int)x y:(int)y {
    _annotation.lockedToScreen = YES;
    _annotation.lockedScreenPoint = CGPointMake(x, y);
}

@end
