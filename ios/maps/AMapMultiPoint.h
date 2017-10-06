#import <React/RCTComponent.h>
#import <MAMapKit/MAMapKit.h>
#import "AMapModel.h"

@interface AMapMultiPoint : AMapModel <MAMultiPointOverlayRendererDelegate>
@property(nonatomic, copy) RCTBubblingEventBlock onItemPress;
@end
