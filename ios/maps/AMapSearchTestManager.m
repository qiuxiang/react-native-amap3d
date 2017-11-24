//
//  AMapSearchTestManager.m
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/24.
//

#import <React/RCTUIManager.h>
#import "AMapSearchTest.h"
#import <AMapSearchKit/AMapSearchKit.h>

@interface AMapSearchTestManager : RCTViewManager<AMapSearchDelegate>

@end

@implementation AMapSearchTestManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    AMapSearchTest *mapSearch = [[AMapSearchTest alloc] init];
    mapSearch.search.delegate = self;
    return mapSearch;
}

RCT_EXPORT_VIEW_PROPERTY(onUserInfo, RCTBubblingEventBlock)
@end
