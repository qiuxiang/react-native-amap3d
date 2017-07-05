#import <React/RCTView.h>

@class AMapOverlay;

@protocol AMapOverlayDelegate <NSObject>
@optional
- (void)update:(AMapOverlay *)overlay;
- (void)updateLayout:(AMapOverlay *)overlay;
@end

@interface AMapOverlay : RCTView
@property(nonatomic, strong) id<AMapOverlayDelegate> delegate;
- (void)update;
@end
