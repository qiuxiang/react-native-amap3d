#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import "AMapHeatMap.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapHeatMapManager : RCTViewManager
@end

@implementation AMapHeatMapManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapHeatMap new];
}

RCT_EXPORT_VIEW_PROPERTY(coordinates, MAHeatMapNodeArray)
RCT_EXPORT_VIEW_PROPERTY(radius, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(opacity, CGFloat)

@end
