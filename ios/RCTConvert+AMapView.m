#import "RCTConvert+AMapView.h"

@implementation RCTConvert (AMapView)

RCT_ENUM_CONVERTER(MAMapType, (@{
        @"standard": @(MAMapTypeStandard),
        @"satellite": @(MAMapTypeSatellite),
        @"navigation": @(MAMapTypeNavi),
        @"night": @(MAMapTypeStandardNight),
        @"bus": @(MAMapTypeBus),
}), MAMapTypeStandard, integerValue)

RCT_CONVERTER(CLLocationDegrees, CLLocationDegrees, doubleValue);

RCT_CONVERTER(CLLocationDistance, CLLocationDistance, doubleValue);

+ (CLLocationCoordinate2D)CLLocationCoordinate2D:(id)json {
    return CLLocationCoordinate2DMake(
            [self CLLocationDegrees:json[@"latitude"]],
            [self CLLocationDegrees:json[@"longitude"]]);
}

@end
