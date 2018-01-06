#import "AMapPolyline.h"
#import "Coordinate.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapPolyline {
    MAMultiPolyline *_polyline;
    MAMultiColoredPolylineRenderer *_renderer;

    CGFloat _width;
    UIColor *_color;
    NSArray *_colors;
    BOOL _dashed;
    BOOL _gradient;
}

- (instancetype)init {
    if (self = [super init]) {
        _polyline = [MAMultiPolyline polylineWithCoordinates:nil count:0 drawStyleIndexes:nil];
    }

    return self;
}

- (void)setCoordinates:(NSArray<Coordinate *> *)coordinates {
    CLLocationCoordinate2D coords[coordinates.count];
    for (NSUInteger i = 0; i < coordinates.count; i++) {
        coords[i] = coordinates[i].coordinate;
    }

    [_polyline setPolylineWithCoordinates:coords count:coordinates.count];
}

- (void)setWidth:(CGFloat)width {
    _width = width;
    _renderer.lineWidth = width;
}

- (void)setColor:(UIColor *)color {
    _color = color;
    _renderer.strokeColor = color;
}

- (void)setColors:(NSArray *)colors {
    // colors -> strokeColors
    // egg: [black, black, black, white, white, black] => [black, white, black] + [3, 5]
    NSMutableArray *strokeColors = [[NSMutableArray alloc] init];
    NSMutableArray *indexs = [[NSMutableArray alloc] init];

    if (colors.count > 0) {
        UIColor *lastColor = [colors firstObject];
        [strokeColors addObject:lastColor];

        for (NSUInteger index = 1; index < colors.count; index++) {
            UIColor *color = colors[index];
            if (![color isEqual:lastColor]) {
                [strokeColors addObject:color];
                [indexs addObject:@(index)]; // index is the NEXT color
                lastColor = color;
            }
        }

        if (strokeColors.count == 1) {
            [indexs addObject:@(colors.count)];
        }
    }

    _colors = strokeColors;
    _renderer.strokeColors = strokeColors;

    // change polyline
    [_polyline setDrawStyleIndexes:@[@(1), @(2)]];
}

- (void)setDashed:(BOOL)dashed {
    _dashed = dashed;
    _renderer.lineDash = dashed;
}

- (void)setGradient:(BOOL)gradient {
    _gradient = gradient;
    _renderer.gradient = gradient;
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
    if (_renderer == nil) {
        _renderer = [[MAMultiColoredPolylineRenderer alloc] initWithMultiPolyline:_polyline];
        _renderer.lineWidth = _width;
        _renderer.strokeColor = _color;
        _renderer.strokeColors = _colors;
        _renderer.lineDash = _dashed;
        _renderer.gradient = _gradient;
    }
    return _renderer;
}

@end
