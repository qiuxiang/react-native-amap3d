#import "AMapView.h"
#import "AMapCallout.h"

@interface AMapMarker : UIView

@property(nonatomic, copy) RCTBubblingEventBlock onPress;
@property(nonatomic, copy) RCTBubblingEventBlock onInfoWindowPress;
@property(nonatomic, copy) RCTBubblingEventBlock onDragStart;
@property(nonatomic, copy) RCTBubblingEventBlock onDrag;
@property(nonatomic, copy) RCTBubblingEventBlock onDragEnd;

- (MAAnnotationView *)annotationView;
- (MAPointAnnotation *)annotation;
- (void)setActive:(BOOL)active;
- (void)setMapView:(AMapView *)mapView;
- (void)lockToScreen:(int)x y:(int)y;

@end
