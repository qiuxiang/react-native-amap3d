#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import "AMapPolyline.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapPolylineManager : RCTViewManager <MAMapViewDelegate>
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
RCT_EXPORT_VIEW_PROPERTY(dottedLine, BOOL)

@end
