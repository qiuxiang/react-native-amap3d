//
//  AMapPOIKeywordsSearchManager.m
//  react-native-amap3d
//
//  Created by 邵业程 on 2020/2/3.
//

#import "AMapPOIKeywordsSearchReq.h"

@interface AMapPOIKeywordsSearchManager : NSObject<RCTBridgeModule, AMapSearchDelegate>

@property(nonatomic, strong) AMapSearchAPI *search;

@end

@implementation AMapPOIKeywordsSearchManager {
}

- (AMapSearchAPI *)search {
    if (!self->_search) {
        self->_search = [[AMapSearchAPI alloc] init];
        self->_search.delegate = self;
    }
    return self->_search;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(keywordsSearchWithOptions, keywordsSearchWithOptions:(NSDictionary*)options AndResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    [self searchWithOptions:options AndResolver:resolve rejecter:reject];
}

- (void)searchWithOptions:(NSDictionary *)options AndResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    if (options[@"keywords"] == nil) {
        reject(@"", @"keywords is empty", [[NSError alloc] initWithDomain:NSArgumentDomain code:4866 userInfo:nil]);
        return;
    }
    
    AMapPOIKeywordsSearchReq *request = [[AMapPOIKeywordsSearchReq alloc] init];
    request.resolve = resolve;
    request.reject = reject;
    request.keywords = options[@"keywords"];
    if (options[@"city"]) request.city = options[@"city"];
    if (options[@"types"]) request.types = options[@"types"];
    if (options[@"requireExtension"]) request.requireExtension = [options[@"requireExtension"] boolValue];
    if (options[@"cityLimit"]) request.cityLimit = [options[@"cityLimit"] boolValue];
    if (options[@"requireSubPOIs"]) request.requireSubPOIs = [options[@"requireSubPOIs"] boolValue];
    
    [self.search AMapPOIKeywordsSearch:request];
}

- (void)AMapSearchRequest:(AMapPOIKeywordsSearchReq *)request didFailWithError:(NSError *)error {
    if (request.reject) request.reject(@"", [NSString stringWithFormat:@"keywords '%@' search failed", [(AMapPOIKeywordsSearchRequest *)request keywords]], error);
}

- (void)onPOISearchDone:(AMapPOIKeywordsSearchReq *)request response:(AMapPOISearchResponse *)response {
    NSMutableArray *pois = [NSMutableArray array];
    [response.pois enumerateObjectsUsingBlock:^(AMapPOI * _Nonnull poi, NSUInteger idx, BOOL * _Nonnull stop) {
        [pois addObject:@{
            @"uid": poi.uid,
            @"name": poi.name,
            @"type": poi.type,
            @"typecode": poi.typecode,
            @"latitude": @(poi.location.latitude),
            @"location": [NSString stringWithFormat:@"%f,%f", poi.location.longitude, poi.location.latitude],
            @"longitude": @(poi.location.longitude),
            @"address": poi.address,
            @"tel": poi.tel,
            @"distance": @(poi.distance),
            @"cityCode": poi.citycode,
            @"cityName": poi.city,
            @"provinceCode": poi.pcode,
            @"provinceName": poi.province,
            @"adCode": poi.adcode,
            @"adName": poi.district,
        }];
    }];
    if (request.resolve) request.resolve(pois);
}

@end
