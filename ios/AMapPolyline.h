#import <Foundation/Foundation.h>
#import <MAMapKit/MAMapKit.h>

@interface AMapPolyline : UIView <MAOverlay>

@property(nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property(nonatomic, readonly) MAMapRect boundingMapRect;

- (MAOverlayRenderer *)renderer;

@end