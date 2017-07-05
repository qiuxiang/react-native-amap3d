#import "AMapMarker.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapMarker {
    MAPinAnnotationView *_annotationView;
    MAPointAnnotation *_annotation;
    AMapOverlay *_overlay;
    AMapOverlay *_callout;
    AMapView *_mapView;
    BOOL _active;
    UIImage *_image;
    CGPoint _centerOffset;
    CGPoint _calloutOffset;
}

- (instancetype)init {
    self = [super init];
    _annotation = [MAPointAnnotation new];
    _annotationView = [[MAPinAnnotationView alloc] initWithAnnotation:_annotation reuseIdentifier:nil];
    _annotationView.canShowCallout = YES;

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

- (void)resetImage {
    if (_image) {
        _annotationView.image = _image;
        _annotationView.centerOffset = _centerOffset;
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
        if (atIndex == 0) {
            _overlay = (AMapOverlay *) subview;
            _overlay.delegate = self;
            _annotationView.image = nil;
            _image = nil;
        }
        if (atIndex == 1) {
            // TODO: customCalloutView 的位置不太对
            _callout = (AMapOverlay *) subview;
            
            // f**king amap only support button as callout, so below it is.
            // more funny thing is callout offset shown right when using button. unbelievable!!!
            _callout.delegate = self;
            UIButton *button = [[UIButton alloc] initWithFrame:CGRectZero];
            [button addSubview:(UIView *) subview];
            
            _annotationView.customCalloutView = [[MACustomCalloutView alloc] initWithCustomView:button];
        }
    }
}

#pragma mark AMapOverlayDelegate

- (void)update:(AMapOverlay *)overlay {
    if (overlay == _overlay) {
        dispatch_async(dispatch_get_main_queue(), ^{
            UIGraphicsBeginImageContextWithOptions([_overlay bounds].size, NO, 0.0f);
            [_overlay.layer renderInContext:UIGraphicsGetCurrentContext()];
            UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
            _annotationView.image = image;
            
            _image = image;
        });
    }
}

- (void)updateLayout:(AMapOverlay *)overlay {
    CGFloat width = CGRectGetWidth(overlay.bounds);
    CGFloat height = CGRectGetHeight(overlay.bounds);
    
    if (overlay == _overlay) {
        // change default image center
        _centerOffset = CGPointMake(0, -height / 2);
        _annotationView.centerOffset = _centerOffset;
    } else if (overlay == _callout) {
        // change default callout offset
        _annotationView.customCalloutView.bounds = CGRectMake(0, 0, width, height);
    }
}

@end
