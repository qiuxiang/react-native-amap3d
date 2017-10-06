#import "AMapCircle.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapCircle {
    MACircle *_circle;
    MACircleRenderer *_renderer;
    CGFloat _strokeWidth;
    UIColor *_strokeColor;
    UIColor *_fillColor;
    CLLocationCoordinate2D _coordinate;
    CLLocationDistance _radius;
}

- (void)setCoordinate:(CLLocationCoordinate2D)coordinate {
    _coordinate = coordinate;
    _circle.coordinate = coordinate;
}

- (void)setRadius:(CLLocationDistance)radius {
    _radius = radius;
    _circle.radius = radius;
}

- (void)setStrokeWidth:(CGFloat)strokeWidth {
    _strokeWidth = strokeWidth;
    _renderer.lineWidth = strokeWidth;
}

- (void)setStrokeColor:(UIColor *)strokeColor {
    _strokeColor = strokeColor;
    _renderer.strokeColor = strokeColor;
}

- (void)setFillColor:(UIColor *)fillColor {
    _fillColor = fillColor;
    _renderer.fillColor = fillColor;
}

- (CLLocationCoordinate2D)coordinate {
    return _circle.coordinate;
}

- (MAMapRect)boundingMapRect {
    return _circle.boundingMapRect;
}

- (MAOverlayRenderer *)renderer {
    if (_strokeColor == nil) {
        _strokeColor = UIColor.blackColor;
    }
    if (_renderer == nil) {
        _circle = [MACircle circleWithCenterCoordinate:_coordinate radius:_radius];
        _renderer = [[MACircleRenderer alloc] initWithCircle:_circle];
        _renderer.lineWidth = _strokeWidth;
        _renderer.strokeColor = _strokeColor;
        _renderer.fillColor = _fillColor;
    }
    return _renderer;
}

@end
