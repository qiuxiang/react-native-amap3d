#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapMarker {
    MAPinAnnotationView *_annotationView;
    MAPointAnnotation *_annotation;
    AMapOverlay *_overlay;
    AMapView *_mapView;
    BOOL _active;
}

- (instancetype)init {
    _annotation = [MAPointAnnotation new];
    _annotationView = [[MAPinAnnotationView alloc] initWithAnnotation:_annotation reuseIdentifier:nil];
    _annotationView.canShowCallout = YES;
    self = [super init];
    return self;
}

- (MAAnnotationView *)annotationView {
    return _annotationView;
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

- (void)setCoordinate:(CLLocationCoordinate2D)coordinate {
    _annotation.coordinate = coordinate;
}

- (void)setTitle:(NSString *)title {
    _annotation.title = title;
}

- (void)setSubtitle:(NSString *)subtitle {
    _annotation.subtitle = subtitle;
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
    _annotationView.pinColor = color;
}

- (void)setDescription:(NSString *)description {
    _annotationView.annotation.subtitle = description;
}

- (void)setDraggable:(BOOL)draggable {
    _annotationView.draggable = draggable;
}

- (void)setInfoWindowEnabled:(BOOL)enabled {
    _annotationView.canShowCallout = enabled;
}

- (void)setZIndex:(NSInteger)zIndex {
    _annotationView.zIndex = zIndex;
}

- (void)setMapView:(AMapView *)mapView {
    _mapView = mapView;
}

- (BOOL)active {
    return _active;
}

- (void)insertReactSubview:(id <RCTComponent>)subview atIndex:(NSInteger)atIndex {
    if ([subview isKindOfClass:[AMapOverlay class]]) {
        _overlay = (AMapOverlay *) subview;
        _overlay.delegate = self;
        _annotationView.image = nil;
    } else {
        _annotationView.customCalloutView = [[MACustomCalloutView alloc] initWithCustomView:(id) subview];
    }
}

#pragma mark AMapOverlayDelegate

- (void)update {
    UIGraphicsBeginImageContextWithOptions([_overlay bounds].size, NO, 0.0f);
    [_overlay.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    _annotationView.image = image;
}

@end
