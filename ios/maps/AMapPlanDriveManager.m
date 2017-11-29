//
//  AMapPlanDriveManager.m
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/27.
//

#import <MAMapKit/MAMapView.h>
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "AMapPlanDrive.h"

@interface AMapPlanDriveManager : RCTViewManager

@end

@implementation AMapPlanDriveManager
RCT_EXPORT_MODULE()

- (UIView *)view {
    return [AMapPlanDrive new];
}

RCT_EXPORT_VIEW_PROPERTY(strategy, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(start, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(destination, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(coordinates, NSArray)
RCT_EXPORT_VIEW_PROPERTY(nonColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(clearColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(slowColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(busyColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(showImgRoad, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onStatusPlanComplete, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(changePlanRoad:(nonnull NSNumber *)reactTag params:(NSDictionary *)params){
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        AMapPlanDrive *planView = (AMapPlanDrive *) viewRegistry[reactTag];
        NSLog(@"%@",params);
        NSInteger choice = [params[@"choice"] intValue];
        if(choice <= planView.route.paths.count -1 && choice >= 0) {
            [planView presentCurrentCourseWithPath:planView.route.paths[choice]];
        }
    }];
}
@end
