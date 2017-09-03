#import "AMapMultiPoint.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapMultiPoint {
    NSArray<MAMultiPointItem *> *_items;
    MAMultiPointOverlayRenderer *_renderer;
    MAMultiPointOverlay *_overlay;
    UIImage *_image;
}

- (void)setPoints:(NSArray<MAMultiPointItem *> *)points {
    _items = points;
}

- (void)setImage:(NSString *)name {
    _image = [UIImage imageNamed:name];
}

- (MAOverlayRenderer *)renderer {
    if (_renderer == nil) {
        _overlay = [[MAMultiPointOverlay alloc] initWithMultiPointItems:_items];
        _renderer = [[MAMultiPointOverlayRenderer alloc] initWithMultiPointOverlay:_overlay];
        _renderer.delegate = self;
        if (_image != nil) {
            _renderer.icon = _image;
        }
    }
    return _renderer;
}

- (void)multiPointOverlayRenderer:(MAMultiPointOverlayRenderer *)renderer didItemTapped:(MAMultiPointItem *)item {
    self.onItemPress(@{
            @"index": @([_items indexOfObject:item]),
    });
}

@end
