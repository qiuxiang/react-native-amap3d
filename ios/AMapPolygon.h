#import <Foundation/Foundation.h>
#import <MAMapKit/MAMapKit.h>

#pragma ide diagnostic ignored "OCUnusedPropertyInspection"

@interface AMapPolygon : UIView <MAOverlay>

@property(nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property(nonatomic, readonly) MAMapRect boundingMapRect;

- (MAOverlayRenderer *)renderer;

@end
