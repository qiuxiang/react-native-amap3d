#import <MAMapKit/MAMapKit.h>
#import "AMapOverlay.h"

#pragma ide diagnostic ignored "OCUnusedPropertyInspection"

@interface AMapCircle : AMapOverlay

@property(nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property(nonatomic, readonly) MAMapRect boundingMapRect;

@end
