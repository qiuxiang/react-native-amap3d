#import <MAMapKit/MAMapKit.h>
#import <React/RCTConvert.h>

@implementation RCTConvert (AMapMarker)

RCT_ENUM_CONVERTER(MAPinAnnotationColor, (@{
        @"red": @(MAPinAnnotationColorRed),
        @"green": @(MAPinAnnotationColorGreen),
        @"purple": @(MAPinAnnotationColorPurple),
}), MAPinAnnotationColorRed, integerValue)

@end
