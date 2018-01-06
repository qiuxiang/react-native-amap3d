#import <React/RCTBridgeModule.h>
#import <MAMapKit/MAGeometry.h>

#pragma ide diagnostic ignored "OCUnusedClassInspection"

@interface AMapUtils : NSObject <RCTBridgeModule>
@end

@implementation AMapUtils

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(distance:(double)lat1
                      lng1:(double)lng1
                      lat2:(double)lat2
                      lng2:(double)lng2
                   resolve:(RCTPromiseResolveBlock)resolve
                    reject:(RCTPromiseRejectBlock)reject) {
    resolve(@(MAMetersBetweenMapPoints(
            MAMapPointForCoordinate(CLLocationCoordinate2DMake(lat1, lng1)),
            MAMapPointForCoordinate(CLLocationCoordinate2DMake(lat2, lng2))
    )));
}

@end
