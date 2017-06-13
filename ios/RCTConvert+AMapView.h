#import <MAMapKit/MAMapView.h>
#import <React/RCTConvert.h>

@interface RCTConvert (AMapView)
+ (CLLocationCoordinate2D)CLLocationCoordinate2D:(id)json;
@end