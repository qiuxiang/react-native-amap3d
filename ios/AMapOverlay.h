#import <React/RCTView.h>

@protocol AMapOverlayDelegate <NSObject>
@optional
- (void)update;
@end

@interface AMapOverlay : RCTView
@property(nonatomic, strong) id<AMapOverlayDelegate> delegate;
- (void)update;
@end