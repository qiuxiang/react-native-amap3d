#import <MAMapKit/MAMapView.h>
#import <React/RCTConvert.h>
#import <React/RCTConvert+CoreLocation.h>
#import "Coordinate.h"

@implementation RCTConvert (AMapView)

RCT_ENUM_CONVERTER(MAMapType, (@{
        @"standard": @(MAMapTypeStandard),
        @"satellite": @(MAMapTypeSatellite),
        @"navigation": @(MAMapTypeNavi),
        @"night": @(MAMapTypeStandardNight),
        @"bus": @(MAMapTypeBus),
}), MAMapTypeStandard, integerValue)

RCT_ENUM_CONVERTER(MAPinAnnotationColor, (@{
        @"red": @(MAPinAnnotationColorRed),
        @"green": @(MAPinAnnotationColorGreen),
        @"purple": @(MAPinAnnotationColorPurple),
}), MAPinAnnotationColorRed, integerValue)

+ (Coordinate *)Coordinate:(id)json {
    return [[Coordinate alloc] initWithCoordinate: [self CLLocationCoordinate2D:json]];
}

RCT_ARRAY_CONVERTER(Coordinate)

@end
