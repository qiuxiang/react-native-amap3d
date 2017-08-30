#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import "AMapPolygon.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapPolygonManager : RCTViewManager
@end

@implementation AMapPolygonManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapPolygon new];
}

RCT_EXPORT_VIEW_PROPERTY(coordinates, CoordinateArray)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)

@end
