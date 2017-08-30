#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import "AMapPolyline.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapPolylineManager : RCTViewManager
@end

@implementation AMapPolylineManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapPolyline new];
}

RCT_EXPORT_VIEW_PROPERTY(coordinates, CoordinateArray)
RCT_EXPORT_VIEW_PROPERTY(width, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(color, UIColor)
RCT_EXPORT_VIEW_PROPERTY(dashed, BOOL)
RCT_EXPORT_VIEW_PROPERTY(gradient, BOOL)
RCT_EXPORT_VIEW_PROPERTY(colors, UIColorArray)

@end
