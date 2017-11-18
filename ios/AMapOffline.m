#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <MAMapKit/MAOfflineMap.h>

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapOffline : RCTEventEmitter <RCTBridgeModule>
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
    void (^downloadBlock)(MAOfflineItem *, MAOfflineMapDownloadStatus, id)=^(MAOfflineItem *downloadItem, MAOfflineMapDownloadStatus state, id info) {
        NSDictionary *data = (NSDictionary *) info;
        double progress = 0;
        if (state == MAOfflineMapDownloadStatusProgress) {
            progress = [data[MAOfflineMapDownloadReceivedSizeKey] doubleValue] / [data[MAOfflineMapDownloadExpectedSizeKey] doubleValue] * 100;
        }
        [self sendEventWithName:@"download" body:@{
                @"name": name,
                @"state": [self downloadStateString:state],
                @"progress": @(progress),
        }];
    };
    if (item != nil) {
        [MAOfflineMap.sharedOfflineMap downloadItem:item
              shouldContinueWhenAppEntersBackground:YES
                                      downloadBlock:downloadBlock];
    }
}

RCT_EXPORT_METHOD(remove:(NSString *)name) {
    MAOfflineItem *item = [self getItem:name];
    if (item != nil) {
        [MAOfflineMap.sharedOfflineMap deleteItem:item];
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

- (NSString *)downloadStateString:(MAOfflineMapDownloadStatus)code {
    switch (code) {
        case MAOfflineMapDownloadStatusWaiting: return @"waiting";
        case MAOfflineMapDownloadStatusStart: return @"downloading";
        case MAOfflineMapDownloadStatusProgress: return @"downloading";
        case MAOfflineMapDownloadStatusCompleted: return @"unzip";
        case MAOfflineMapDownloadStatusUnzip: return @"unzip";
        case MAOfflineMapDownloadStatusFinished: return @"downloaded";
        default: return @"";
    }
}

- (NSString *)stateString:(MAOfflineItemStatus)code {
    switch (code) {
        case MAOfflineItemStatusCached: return @"downloading";
        case MAOfflineItemStatusExpired: return @"expired";
        case MAOfflineItemStatusInstalled: return @"downloaded";
        default: return @"";
    }
}

- (NSDictionary *)itemData:(MAOfflineCity *)city {
    return @{
            @"name": city.name,
            @"size": @(city.size),
            @"state": [self stateString:city.itemStatus],
    };
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"download"];
}

@end
