#import <React/RCTComponent.h>
#import <MAMapKit/MAMapKit.h>
#import "AMapOverlay.h"

@interface AMapMultiPoint : AMapOverlay <MAMultiPointOverlayRendererDelegate>
@property(nonatomic, copy) RCTBubblingEventBlock onItemPress;
@end
