#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import "AMapMultiPoint.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapMultiPointManager : RCTViewManager
@end

@implementation AMapMultiPointManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapMultiPoint new];
}

RCT_EXPORT_VIEW_PROPERTY(points, MAMultiPointItemArray)
RCT_EXPORT_VIEW_PROPERTY(image, NSString)
RCT_EXPORT_VIEW_PROPERTY(onItemPress, RCTBubblingEventBlock)

@end
