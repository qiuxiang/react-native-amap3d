//
//  AMapSearchTest.m
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/24.
//

#import "AMapSearch.h"

@implementation AMapSearch {
    CLLocationCoordinate2D _coordinate;
}
- (instancetype)init {
    if (self = [super init]) {
        self.search = [[AMapSearchAPI alloc] init];
        self.search.delegate = self;
    }
    return self;
}

- (void)setCoordinate:(CLLocationCoordinate2D)coordinate {
    _coordinate = coordinate;
    [self searchReGeocodeWithCoordinate:_coordinate];
}

- (void)searchReGeocodeWithCoordinate:(CLLocationCoordinate2D)coordinate {
    AMapReGeocodeSearchRequest *regeo = [[AMapReGeocodeSearchRequest alloc] init];
    regeo.location                    = [AMapGeoPoint locationWithLatitude:coordinate.latitude longitude:coordinate.longitude];
    regeo.requireExtension            = YES;
    
    [self.search AMapReGoecodeSearch:regeo];
}

#pragma mark - AMapSearchDelegate
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error {
    NSLog(@"Error: %@", error);
}

/* 逆地理编码回调. */
- (void)onReGeocodeSearchDone:(AMapReGeocodeSearchRequest *)request response:(AMapReGeocodeSearchResponse *)response {
    if (response.regeocode != nil) {
        AMapReGeocode *geoCode = response.regeocode;
        self.onUserInfo(@{
                          @"formattedAddress": geoCode.formattedAddress ? : @"",
                          @"province": geoCode.addressComponent.province ? : @"",
                          @"city": geoCode.addressComponent.city ? : @"",
                          @"citycode": geoCode.addressComponent.citycode ? : @"",
                          @"district": geoCode.addressComponent.district ? : @"",
                          @"adcode": geoCode.addressComponent.adcode ? : @"",
                          @"township": geoCode.addressComponent.township ? : @"",
                          @"towncode": geoCode.addressComponent.towncode ? : @"",
                          @"neighborhood": geoCode.addressComponent.neighborhood ? : @"",
                          @"building": geoCode.addressComponent.building ? : @"",
                          @"streetNumber": geoCode.addressComponent.streetNumber ? : @""
                          });
    }
}
@end
