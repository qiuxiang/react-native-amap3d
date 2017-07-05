#import "AMapOverlay.h"
#import <React/UIView+React.h>

@implementation AMapOverlay {
}

- (void)update {
    [self.delegate update:self];
    
    [self.delegate updateLayout:self];
}

- (void)didUpdateReactSubviews {
    [super didUpdateReactSubviews];
    
    [self update];
}

@end
