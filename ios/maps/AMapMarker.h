#import "AMapView.h"
#import "AMapInfoWindow.h"

@interface AMapMarker : MAAnnotationView <MAAnnotation, AMapInfoWindowDelegate>

@property(nonatomic, copy) RCTBubblingEventBlock onPress;
@property(nonatomic, copy) RCTBubblingEventBlock onInfoWindowPress;
@property(nonatomic, copy) RCTBubblingEventBlock onDragStart;
@property(nonatomic, copy) RCTBubblingEventBlock onDrag;
@property(nonatomic, copy) RCTBubblingEventBlock onDragEnd;

- (BOOL)active;
- (void)setActive:(BOOL)active;
- (MAAnnotationView *)annotationView;
- (void)setMapView:(AMapView *)mapView;
- (void)updateActive;

@end
