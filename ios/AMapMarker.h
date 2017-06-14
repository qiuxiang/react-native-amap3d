#import <Foundation/Foundation.h>
#import <MAMapKit/MAMapKit.h>

@class AMapView;

@interface AMapMarker : MAAnnotationView <MAAnnotation>

@property(nonatomic, assign) CLLocationCoordinate2D coordinate;
@property(nonatomic, copy) NSString *title;
@property(nonatomic, copy) NSString *subtitle;
@property(nonatomic, assign) BOOL _active;
@property(nonatomic, strong) AMapView *mapView;

- (MAAnnotationView *)getAnnotationView;
- (BOOL)active;

@end