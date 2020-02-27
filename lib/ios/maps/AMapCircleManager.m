#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import "AMapCircle.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapCircleManager : RCTViewManager
@end

@implementation AMapCircleManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapCircle new];
}

RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(radius, CLLocationDistance)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)

@end
