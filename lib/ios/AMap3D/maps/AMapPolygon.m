#import "AMapPolygon.h"
#import "Coordinate.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapPolygon {
    MAPolygon *_polygon;
    MAPolygonRenderer *_renderer;
    CGFloat _strokeWidth;
    UIColor *_strokeColor;
    UIColor *_fillColor;
}

- (void)setCoordinates:(NSArray<Coordinate *> *)coordinates {
    CLLocationCoordinate2D coords[coordinates.count];
    for (NSUInteger i = 0; i < coordinates.count; i++) {
        coords[i] = coordinates[i].coordinate;
    }
    _polygon = [MAPolygon polygonWithCoordinates:coords count:coordinates.count];
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
    return _polygon.coordinate;
}

- (MAMapRect)boundingMapRect {
    return _polygon.boundingMapRect;
}

- (MAOverlayRenderer *)renderer {
    if (_strokeColor == nil) {
        _strokeColor = UIColor.blackColor;
    }
    if (_renderer == nil) {
        _renderer = [[MAPolygonRenderer alloc] initWithPolygon:_polygon];
        _renderer.lineWidth = _strokeWidth;
        _renderer.strokeColor = _strokeColor;
        _renderer.fillColor = _fillColor;
    }
    return _renderer;
}

@end
