#import "AMapView.h"
#import "AMapOverlay.h"

@interface AMapMarker : UIView <MAAnnotation, AMapOverlayDelegate>

@property(nonatomic, copy) RCTBubblingEventBlock onMarkerClick;
@property(nonatomic, copy) RCTBubblingEventBlock onInfoWindowClick;
@property(nonatomic, copy) RCTBubblingEventBlock onMarkerDragStart;
@property(nonatomic, copy) RCTBubblingEventBlock onMarkerDrag;
@property(nonatomic, copy) RCTBubblingEventBlock onMarkerDragEnd;

- (CLLocationCoordinate2D)coordinate;
- (NSString *)title;
- (NSString *)subtitle;
- (void)resetImage;

- (BOOL)active;
- (MAAnnotationView *)annotationView;

- (void)setMapView:(AMapView *)mapView;
- (void)setCoordinate:(CLLocationCoordinate2D)coordinate;

@end
