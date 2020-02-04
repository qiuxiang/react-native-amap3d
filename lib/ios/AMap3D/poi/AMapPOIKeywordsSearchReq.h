//
//  AMapPOIKeywordsSearchReq.h
//  react-native-amap3d
//
//  Created by 邵业程 on 2020/2/3.
//

#import <Foundation/Foundation.h>
#import <AMapSearchKit/AMapSearchKit.h>
#import <React/RCTBridge.h>

NS_ASSUME_NONNULL_BEGIN

@interface AMapPOIKeywordsSearchReq : AMapPOIKeywordsSearchRequest

@property(nonatomic, copy) RCTPromiseResolveBlock resolve;
@property(nonatomic, copy) RCTPromiseRejectBlock reject;

@end

NS_ASSUME_NONNULL_END
