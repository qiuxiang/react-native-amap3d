//
//  AMapSearchTest.h
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/24.
//

#import <AMapSearchKit/AMapSearchKit.h>
#import <React/UIView+React.h>
#import "AMapModel.h"

@interface AMapSearchTest : AMapModel
@property (nonatomic, strong) AMapSearchAPI *search;
@property(nonatomic, copy) RCTBubblingEventBlock onUserInfo;

@end
