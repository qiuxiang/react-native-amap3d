//
//  AMapSearchTestManager.m
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/27.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <AMapSearchKit/AMapSearchKit.h>

@interface AMapSearchManager : NSObject<RCTBridgeModule,AMapSearchDelegate>
@property (copy, nonatomic) void(^event)(NSDictionary *info);
@property (copy, nonatomic) void(^error)(NSDictionary *info);
@end

@implementation AMapSearchManager {
    AMapSearchAPI *_apiSearch;
}
RCT_EXPORT_MODULE();
- (instancetype)init {
    if (self = [super init]) {
        _apiSearch = _apiSearch ? : [[AMapSearchAPI alloc] init];
    }
    return self;
}

RCT_EXPORT_METHOD(searchLocation:(CLLocationCoordinate2D)coordinate
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    AMapReGeocodeSearchRequest *regeo = [[AMapReGeocodeSearchRequest alloc] init];
    regeo.location = [AMapGeoPoint locationWithLatitude:coordinate.latitude longitude:coordinate.longitude];
    regeo.requireExtension = YES;
    _apiSearch.delegate = self;
    
    [_apiSearch AMapReGoecodeSearch:regeo];
    self.event = ^(NSDictionary *info) {
        resolve(info);
    };
    self.error = ^(NSDictionary *info) {
        reject(@"error", info[@"result"], nil);
    };
}

#pragma mark - AMapSearchDelegate
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error {
    NSLog(@"Error: %@", error);
}

/* 逆地理编码回调. */
- (void)onReGeocodeSearchDone:(AMapReGeocodeSearchRequest *)request response:(AMapReGeocodeSearchResponse *)response {
    if (response.regeocode != nil) {
        AMapReGeocode *geoCode = response.regeocode;
        NSDictionary *info = @{
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
                                };
        if (self.event) {
            _apiSearch.delegate = nil;
            self.event(info);
        }
    } else {
        self.error(@{@"result":@"regeocode is nill"});
    }
}
@end
