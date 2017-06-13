#import <Foundation/Foundation.h>
#import <MAMapKit/MAMapKit.h>
#import <RCTComponent.h>

@interface AMapView : MAMapView
@property (nonatomic, copy) RCTBubblingEventBlock onReady;
@property (nonatomic, copy) RCTBubblingEventBlock onLocation;
@property (nonatomic, copy) RCTBubblingEventBlock onPress;
@property (nonatomic, copy) RCTBubblingEventBlock onLongPress;
@end