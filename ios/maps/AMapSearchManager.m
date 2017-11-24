//
//  AMapSearchTestManager.m
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/24.
//

#import <React/RCTUIManager.h>
#import "AMapSearch.h"
#import <AMapSearchKit/AMapSearchKit.h>

@interface AMapSearchManager : RCTViewManager

@end

@implementation AMapSearchManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    AMapSearch *mapSearch = [[AMapSearch alloc] init];
    return mapSearch;
}

RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(onUserInfo, RCTBubblingEventBlock)
@end
