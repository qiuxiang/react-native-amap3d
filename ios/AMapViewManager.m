#import <MAMapKit/MAMapKit.h>
#import <React/RCTViewManager.h>

@interface AMapViewManager : RCTViewManager
@end

@implementation AMapViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[MAMapView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(showsCompass, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsScale, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsIndoorMap, BOOL)
// RCT_EXPORT_VIEW_PROPERTY(showsLabels, BOOL)
// RCT_EXPORT_VIEW_PROPERTY(showsBuildings, BOOL)
// RCT_EXPORT_VIEW_PROPERTY(showsTraffic, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(maxZoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(minZoomLevel, CGFloat)
// RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
// RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
// RCT_EXPORT_VIEW_PROPERTY(rotateEnabled, BOOL)
// RCT_EXPORT_VIEW_PROPERTY(tiltEnabled, BOOL)

@end
