#import <React/RCTBridgeModule.h>
#import <MAMapKit/MAOfflineMap.h>

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapOffline : NSObject <RCTBridgeModule>
@end

@implementation AMapOffline

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(getProvinces,
            resolveProvinces: (RCTPromiseResolveBlock) resolve
            reject: (RCTPromiseRejectBlock) reject) {
    NSMutableArray *provinces = [NSMutableArray new];
    for (id item in MAOfflineMap.sharedOfflineMap.provinces) {
        MAOfflineProvince *province = (MAOfflineProvince *) item;

        NSMutableArray *cities = [NSMutableArray new];
        for (id city in province.cities) {
            [cities addObject:[self itemData:(MAOfflineCity *) city]];
        }

        [provinces addObject:@{
                @"name": province.name,
                @"size": @(province.size),
                @"state": [self stateString:province.itemStatus],
                @"cities": cities,
        }];
    }
    for (id item in MAOfflineMap.sharedOfflineMap.municipalities) {
        [provinces addObject:[self itemData:item]];
    }
    resolve(provinces);
}

RCT_REMAP_METHOD(getCities,
            resolveCities: (RCTPromiseResolveBlock) resolve
            reject: (RCTPromiseRejectBlock) reject) {
    NSMutableArray *cities = [NSMutableArray new];
    for (id city in MAOfflineMap.sharedOfflineMap.cities) {
        [cities addObject:[self itemData:(MAOfflineCity *) city]];
    }
    resolve(cities);
}

RCT_EXPORT_METHOD(download:(NSString *)name) {
    MAOfflineItem *item = [self getItem:name];
    if (item != nil) {
        [MAOfflineMap.sharedOfflineMap downloadItem: item
              shouldContinueWhenAppEntersBackground:YES
                                      downloadBlock:nil];
    }
}

- (MAOfflineItem *)getItem:(NSString *)name {
    BOOL (^predicate)(MAOfflineItem *, NSUInteger, BOOL *)=^BOOL (MAOfflineItem * item, NSUInteger _, BOOL *stop) {
        return [name isEqual:item.name];
    };

    NSUInteger i = [MAOfflineMap.sharedOfflineMap.provinces indexOfObjectPassingTest:predicate];
    if (i != NSNotFound) {
        return MAOfflineMap.sharedOfflineMap.provinces[i];
    }

    i = [MAOfflineMap.sharedOfflineMap.municipalities indexOfObjectPassingTest:predicate];
    if (i != NSNotFound) {
        return MAOfflineMap.sharedOfflineMap.municipalities[i];
    }

    i = [MAOfflineMap.sharedOfflineMap.cities indexOfObjectPassingTest:predicate];
    if (i != NSNotFound) {
        return MAOfflineMap.sharedOfflineMap.cities[i];
    }

    return nil;
}

- (NSString *)stateString:(MAOfflineItemStatus)code {
    NSString *state = @"";
    if (code == MAOfflineItemStatusCached) {
        state = @"downloading";
    }
    if (code == MAOfflineItemStatusExpired) {
        state = @"expired";
    }
    if (code == MAOfflineItemStatusInstalled) {
        state = @"downloaded";
    }
    return state;
}

- (NSDictionary *)itemData:(MAOfflineCity *)city {
    return @{
            @"name": city.name,
            @"size": @(city.size),
            @"state": [self stateString:city.itemStatus],
    };
}

@end
