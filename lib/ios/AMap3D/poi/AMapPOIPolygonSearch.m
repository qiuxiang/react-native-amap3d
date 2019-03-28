
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

#import "AMapPOIPolygonSearch.h"

@implementation AMapPOIPolygonSearch {
    AMapSearchAPI *search;
    NSInteger pageSize;
    NSInteger pageNum;
}

RCT_EXPORT_MODULE(AMapPOIPolygonSearch);

RCT_REMAP_METHOD(init, resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if (!search) {
        search = [AMapSearchAPI new];
        search.delegate = self;
        
        pageSize = 20;
        pageNum = 1;
        
        resolve(nil);
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(onPOISearch:(NSDictionary *)options)
{
    AMapPOIPolygonSearchRequest *request = [AMapPOIPolygonSearchRequest new];
   
    if (options[@"coordinates"]) {
        NSMutableArray *points = [NSMutableArray new];
        [options[@"coordinates"] enumerateObjectsUsingBlock:^(NSDictionary *point, NSUInteger idx, BOOL * _Nonnull stop) {
            [points addObject:[AMapGeoPoint locationWithLatitude:[point[@"latitude"] doubleValue] longitude:[point[@"longitude"] doubleValue]]];
        }];
        
        AMapGeoPolygon *polygon = [AMapGeoPolygon polygonWithPoints:points];
        
        request.polygon = polygon;
    } else {
        return;
    }

    if (options[@"keywords"]) {
        request.keywords = options[@"keywords"];
    } else {
        return;
    }
    
    if (options[@"types"]) {
        request.types = options[@"types"];
    }
    
    if (options[@"pageSize"]) {
        pageSize = request.offset = [options[@"pageSize"] intValue];
    }
    
    if (options[@"pageNum"]) {
        pageNum = request.page = [options[@"page"] intValue];
    }
    

    if (options[@"requireExtension"]) {
        request.requireExtension = options[@"requireExtension"];
    }

    [search AMapPOIPolygonSearch:request];
}

- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error
{
    NSDictionary *result;
    
    result = @{
               @"status": @"ERROR",
               @"error": error
               };
    
    [self sendEventWithName:@"AMapPOIPolygonSearch" body: result];
}

- (void)onPOISearchDone:(AMapPOISearchBaseRequest *)request response:(AMapPOISearchResponse *)response
{
    NSMutableArray *pois = [NSMutableArray new];

    if (response.count) {
        [response.pois enumerateObjectsUsingBlock:^(AMapPOI *poi, NSUInteger poiIndex, BOOL *stop) {
            [pois addObject:@{
                              @"uid": poi.uid,
                              @"name": poi.name,
                              @"type": poi.type,
                              @"typecode": poi.typecode,
                              @"latitude": @(poi.location.latitude),
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
    }
    
    NSDictionary *result;
    
    result = @{
               @"status": @"OK",
               @"pois": pois,
               @"pageCount": @(response.count),
               @"pageSize": @(pageSize),
               @"pageNum": @(pageNum)
               };

    [self sendEventWithName:@"AMapPOIPolygonSearch" body: result];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"AMapPOIPolygonSearch"];
}


@end
