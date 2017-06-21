#import <MAMapKit/MAMapKit.h>
#import "AMapModel.h"

#pragma ide diagnostic ignored "OCUnusedPropertyInspection"

@interface AMapPolyline : AMapModel

@property(nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property(nonatomic, readonly) MAMapRect boundingMapRect;

@end
