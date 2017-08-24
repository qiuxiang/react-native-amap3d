#import <React/RCTView.h>

@class AMapInfoWindow;

@protocol AMapInfoWindowDelegate <NSObject>
@optional
- (void)updateInfoWindow:(AMapInfoWindow *)overlay;
@end

@interface AMapInfoWindow : RCTView
@property(nonatomic, strong) id <AMapInfoWindowDelegate> delegate;
@end
