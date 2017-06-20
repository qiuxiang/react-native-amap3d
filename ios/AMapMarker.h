#import <Foundation/Foundation.h>
#import <MAMapKit/MAMapKit.h>
#import <React/RCTComponent.h>
#import "AMapView.h"
#import "AMapOverlay.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@interface AMapMarker : UIView <MAAnnotation, AMapOverlayDelegate>

@property (nonatomic, copy) RCTBubblingEventBlock onPress;
@property (nonatomic, copy) RCTBubblingEventBlock onInfoWindowPress;
@property (nonatomic, copy) RCTBubblingEventBlock onDragStart;
@property (nonatomic, copy) RCTBubblingEventBlock onDrag;
@property (nonatomic, copy) RCTBubblingEventBlock onDragEnd;

- (BOOL)active;
- (CLLocationCoordinate2D)coordinate;
- (NSString *)title;
- (NSString *)subtitle;

- (MAAnnotationView *)annotationView;

- (void)setMapView:(AMapView *)mapView;
- (void)setCoordinate:(CLLocationCoordinate2D)coordinate;

@end
