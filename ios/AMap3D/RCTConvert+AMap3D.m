#import <MAMapKit/MAMapView.h>
#import <AMapNaviKit/AMapNaviCommonObj.h>
#import <React/RCTConvert.h>
#import <React/RCTConvert+CoreLocation.h>
#import "Coordinate.h"
#import "LocationStyle.h"

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
    return [[Coordinate alloc] initWithCoordinate:[self CLLocationCoordinate2D:json]];
}

+ (LocationStyle *)LocationStyle:(id)json {
    LocationStyle *locationStyle = [LocationStyle new];
    locationStyle.fillColor = [self UIColor:json[@"fillColor"]];
    locationStyle.stokeColor = [self UIColor:json[@"stokeColor"]];
    locationStyle.stokeWidth = [self CGFloat:json[@"stokeWidth"]];
    locationStyle.image = [UIImage imageNamed:[self NSString:json[@"image"]]];
    return locationStyle;
}

+ (MAHeatMapNode *)MAHeatMapNode:(id)json {
    MAHeatMapNode *node = [MAHeatMapNode new];
    node.coordinate = [self CLLocationCoordinate2D:json];
    node.intensity = 1;
    return node;
}

+ (MAMultiPointItem *)MAMultiPointItem:(id)json {
    MAMultiPointItem *item = [MAMultiPointItem new];
    item.coordinate = [self CLLocationCoordinate2D:json];
    return item;
}

+ (MACoordinateRegion)MACoordinateRegion:(id)json {
    return MACoordinateRegionMake(
            [self CLLocationCoordinate2D:json],
            MACoordinateSpanMake(
                    [self CLLocationDegrees:json[@"latitudeDelta"]],
                    [self CLLocationDegrees:json[@"longitudeDelta"]]));
}

+ (AMapNaviPoint *)AMapNaviPoint:(id)json {
    return [AMapNaviPoint
            locationWithLatitude:[self CGFloat:json[@"latitude"]]
                       longitude:[self CGFloat:json[@"longitude"]]];
}

RCT_ARRAY_CONVERTER(Coordinate)
RCT_ARRAY_CONVERTER(MAHeatMapNode)
RCT_ARRAY_CONVERTER(MAMultiPointItem)
RCT_ARRAY_CONVERTER(AMapNaviPoint)

@end
