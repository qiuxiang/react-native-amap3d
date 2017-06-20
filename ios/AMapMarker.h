#import <Foundation/Foundation.h>
#import <MAMapKit/MAMapKit.h>
#import <React/RCTComponent.h>
#import "AMapView.h"
#import "AMapOverlay.h"
#import "AMapInfoWindow.h"

#pragma ide diagnostic ignored "OCUnusedPropertyInspection"

@class AMapView;
@class AMapOverlay;
@class AMapInfoWindow;

@interface AMapMarker : MAAnnotationView <MAAnnotation, AMapOverlayDelegate>

@property(nonatomic, assign) CLLocationCoordinate2D coordinate;
@property(nonatomic, copy) NSString *title;
@property(nonatomic, copy) NSString *subtitle;
@property(nonatomic, strong) AMapView *mapView;

@property (nonatomic, copy) RCTBubblingEventBlock onPress;
@property (nonatomic, copy) RCTBubblingEventBlock onInfoWindowPress;
@property (nonatomic, copy) RCTBubblingEventBlock onDragStart;
@property (nonatomic, copy) RCTBubblingEventBlock onDrag;
@property (nonatomic, copy) RCTBubblingEventBlock onDragEnd;

- (MAAnnotationView *)getAnnotationView;
- (BOOL)active;

@end