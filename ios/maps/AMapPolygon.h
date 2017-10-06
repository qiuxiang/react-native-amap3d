#import "AMapModel.h"

#pragma ide diagnostic ignored "OCUnusedPropertyInspection"

@interface AMapPolygon : AMapModel

@property(nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property(nonatomic, readonly) MAMapRect boundingMapRect;

@end
