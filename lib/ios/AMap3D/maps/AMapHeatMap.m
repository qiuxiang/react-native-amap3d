#import "AMapHeatMap.h"
#import <React/RCTConvert.h>

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapHeatMap {
    NSArray<MAHeatMapNode *> *_data;
    MATileOverlayRenderer *_renderer;
    MAHeatMapTileOverlay *_heatMap;
    NSInteger _radius;
    CGFloat _opacity;
}

- (void)setCoordinates:(NSArray<NSDictionary *> *)heatMapNodes {
    NSMutableArray *_coordinates = [NSMutableArray array];
    for (NSDictionary *heatMapNode in heatMapNodes) {
        float intensity = [RCTConvert float:heatMapNode[@"intensity"]];
        
        NSDictionary *coordinate2D = [RCTConvert NSDictionary:heatMapNode[@"coordinate"]];
        CLLocationDegrees latitude = [RCTConvert double:coordinate2D[@"latitude"]];
        CLLocationDegrees longitude = [RCTConvert double:coordinate2D[@"longitude"]];
        
        CLLocationCoordinate2D coordinate = CLLocationCoordinate2DMake(latitude, longitude);
        MAHeatMapNode *node = [MAHeatMapNode new];
        node.intensity = intensity;
        node.coordinate = coordinate;
        [_coordinates addObject:node];
    }
    _data = _coordinates;
}

- (void)setRadius:(NSInteger)radius {
    _radius = radius;
}

- (void)setOpacity:(CGFloat)opacity {
    _opacity = opacity;
}

- (MAOverlayRenderer *)renderer {
    if (_renderer == nil) {
        if (_opacity == 0) {
            _opacity = 0.6;
        }
        if (_radius == 0) {
            _radius = 12;
        }
        _heatMap = [MAHeatMapTileOverlay new];
        _heatMap.data = _data;
        _heatMap.opacity = _opacity;
        _heatMap.radius = _radius;
        _renderer = [[MATileOverlayRenderer alloc] initWithTileOverlay:_heatMap];
    }
    return _renderer;
}

@end
