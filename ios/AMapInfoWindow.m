#import <React/UIView+React.h>
#import "AMapInfoWindow.h"

@implementation AMapInfoWindow {
}

- (void)didUpdateReactSubviews {
    [super didUpdateReactSubviews];
    [self.delegate updateInfoWindow:self];
}

@end
