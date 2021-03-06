#import "AMapCallout.h"
#import <React/UIView+React.h>

@implementation AMapCallout{
    AMapMarker *_marker;
}

- (void) setMarker:(AMapMarker *)marker {
    _marker = marker;
}

- (void)reactSetFrame:(CGRect)frame{
    [super reactSetFrame:frame];
    [_marker setCustomeViewSize: frame bounds: self.bounds];
}

@end
