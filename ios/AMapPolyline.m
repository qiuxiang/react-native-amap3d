#import "AMapPolyline.h"
#import "Coordinate.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapPolyline {
    MAPolyline *_polyline;
    MAPolylineRenderer *_renderer;
    CGFloat _width;
    UIColor *_color;
    BOOL _dashed;
}

- (void)setCoordinates:(NSArray<Coordinate *> *)coordinates {
    CLLocationCoordinate2D coords[coordinates.count];
    for (NSUInteger i = 0; i < coordinates.count; i++) {
        coords[i] = coordinates[i].coordinate;
    }
    _polyline = [MAPolyline polylineWithCoordinates:coords count:coordinates.count];
}

- (void)setWidth:(CGFloat)width {
    _width = width;
    _renderer.lineWidth = width;
}

- (void)setColor:(UIColor *)color {
    _color = color;
    _renderer.strokeColor = color;
}

- (void)setDashed:(BOOL)dashed {
    _dashed = dashed;
    _renderer.lineDash = dashed;
}

- (CLLocationCoordinate2D)coordinate {
    return _polyline.coordinate;
}

- (MAMapRect)boundingMapRect {
    return _polyline.boundingMapRect;
}

- (MAOverlayRenderer *)renderer {
    if (_color == nil) {
        _color = UIColor.blackColor;
    }
    _renderer = [[MAPolylineRenderer alloc] initWithPolyline:_polyline];
    _renderer.lineWidth = _width;
    _renderer.strokeColor = _color;
    _renderer.lineDash = _dashed;
    return _renderer;
}

@end
