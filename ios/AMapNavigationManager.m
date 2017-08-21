#import <React/RCTUIManager.h>
#import <AMapNaviKit/AMapNaviDriveView.h>
#import <AMapNaviKit/AMapNaviDriveManager.h>
#import "AMapNavigation.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapNavigationManager : RCTViewManager <AMapNaviDriveManagerDelegate>
+ (AMapNavigation *)driveView;
+ (AMapNaviDriveManager *)driveManager;
@end

@implementation AMapNavigationManager {
    AMapNavigation *_driveView;
    AMapNaviDriveManager *_driveManager;
}

- (instancetype)init {
    if (self = [super init]) {
        _driveView = [AMapNavigationManager driveView];
        _driveManager = [AMapNavigationManager driveManager];
        _driveManager.delegate = self;
    }
    return self;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteSuccess, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(calculateDriveRoute:(nonnull NSNumber *)reactTag start:(AMapNaviPoint *)start endPoints:(AMapNaviPoint *)end) {
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

+ (AMapNaviDriveManager *)driveManager {
    static AMapNaviDriveManager *driveManager;
    if (driveManager == nil) {
        driveManager = [AMapNaviDriveManager new];
        [driveManager addDataRepresentative:[AMapNavigationManager driveView]];
    }
    return driveManager;
}

+ (AMapNavigation *)driveView {
    static AMapNavigation *driveView;
    if (driveView == nil) {
        driveView = [AMapNavigation new];
    }
    return driveView;
}

@end
