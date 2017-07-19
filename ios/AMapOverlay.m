#import <React/UIView+React.h>
#import "AMapOverlay.h"

@implementation AMapOverlay {
}

- (void)didUpdateReactSubviews {
    [super didUpdateReactSubviews];
    [self.delegate update:self];
}

@end
