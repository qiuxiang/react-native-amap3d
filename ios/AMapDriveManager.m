#import <React/RCTUIManager.h>
#import <AMapNaviKit/AMapNaviDriveView.h>
#import <AMapNaviKit/AMapNaviDriveManager.h>
#import "AMapDrive.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapDriveManager : RCTViewManager <AMapNaviDriveManagerDelegate>
+ (AMapDrive *)driveView;
+ (AMapNaviDriveManager *)driveManager;
@end

@implementation AMapDriveManager {
    AMapDrive *_driveView;
    AMapNaviDriveManager *_driveManager;
}

- (instancetype)init {
    if (self = [super init]) {
        _driveView = [AMapDriveManager driveView];
        _driveManager = [AMapDriveManager driveManager];
        _driveManager.delegate = self;
    }
    return self;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteSuccess, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteFailure, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(calculateRoute:(nonnull NSNumber *)reactTag start:(AMapNaviPoint *)start end:(AMapNaviPoint *)end way:(NSArray<AMapNaviPoint *> *)way) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        [_driveManager calculateDriveRouteWithStartPoints:@[start]
                                                endPoints:@[end]
                                                wayPoints:nil
                                          drivingStrategy:AMapNaviDrivingStrategySingleDefault];
    }];
}

RCT_EXPORT_METHOD(start:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        [_driveManager startGPSNavi];
    }];
}

- (UIView *)view {
    return _driveView;
}

- (void)driveManagerOnCalculateRouteSuccess:(AMapNaviDriveManager *)driveManager {
    if (_driveView.onCalculateRouteSuccess) {
        _driveView.onCalculateRouteSuccess(nil);
    }
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager onCalculateRouteFailure:(NSError *)error {
    if (_driveView.onCalculateRouteFailure) {
        _driveView.onCalculateRouteFailure(@{
                @"code": @(error.code),
        });
    }
}

+ (AMapNaviDriveManager *)driveManager {
    static AMapNaviDriveManager *driveManager;
    if (driveManager == nil) {
        driveManager = [AMapNaviDriveManager new];
        [driveManager addDataRepresentative:[AMapDriveManager driveView]];
    }
    return driveManager;
}

+ (AMapDrive *)driveView {
    static AMapDrive *driveView;
    if (driveView == nil) {
        driveView = [AMapDrive new];
    }
    return driveView;
}

@end
