#import <React/RCTUIManager.h>
#import "AMapView.h"
#import "AMapMarker.h"
#import "AMapModel.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"
#pragma ide diagnostic ignored "-Woverriding-method-mismatch"

@interface AMapViewManager : RCTViewManager <MAMapViewDelegate>
@end

@implementation AMapViewManager {
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    AMapView *mapView = [AMapView new];
    mapView.runLoopMode = NSDefaultRunLoopMode;
    mapView.centerCoordinate = CLLocationCoordinate2DMake(39.9042, 116.4074);
    mapView.zoomLevel = 10;
    mapView.delegate = self;
    return mapView;
}

RCT_EXPORT_VIEW_PROPERTY(locationEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsCompass, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsScale, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsIndoorMap, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsLabels, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsTraffic, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsBuildings, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(maxZoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(minZoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(rotateEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(tiltEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(mapType, MAMapType)
RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(limitRegion, MACoordinateRegion)
RCT_EXPORT_VIEW_PROPERTY(tilt, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(rotation, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(distanceFilter, CLLocationDistance)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLongPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLocation, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onStatusChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onStatusChangeComplete, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(animateTo:(nonnull NSNumber *)reactTag params:(NSDictionary *)params duration:(NSInteger)duration) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        AMapView *mapView = (AMapView *) viewRegistry[reactTag];
        MAMapStatus *mapStatus = mapView.getMapStatus;
        if (params[@"zoomLevel"]) {
            mapStatus.zoomLevel = [params[@"zoomLevel"] floatValue];
        }
        if (params[@"coordinate"]) {
            NSDictionary *coordinate = params[@"coordinate"];
            mapStatus.centerCoordinate = CLLocationCoordinate2DMake(
                    [coordinate[@"latitude"] doubleValue],
                    [coordinate[@"longitude"] doubleValue]);
        }
        if (params[@"tilt"]) {
            mapStatus.cameraDegree = [params[@"tilt"] floatValue];
        }
        if (params[@"rotation"]) {
            mapStatus.rotationDegree = [params[@"rotation"] floatValue];
        }
        [mapView setMapStatus:mapStatus animated:YES duration:duration / 1000.0];
    }];
}

- (void)mapView:(AMapView *)mapView didSingleTappedAtCoordinate:(CLLocationCoordinate2D)coordinate {
    if (mapView.onPress) {
        mapView.onPress(@{
                @"latitude": @(coordinate.latitude),
                @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapView:(AMapView *)mapView didLongPressedAtCoordinate:(CLLocationCoordinate2D)coordinate {
    if (mapView.onLongPress) {
        mapView.onLongPress(@{
                @"latitude": @(coordinate.latitude),
                @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapView:(AMapView *)mapView didUpdateUserLocation:(MAUserLocation *)userLocation updatingLocation:(BOOL)updatingLocation {
    if (mapView.onLocation) {
        mapView.onLocation(@{
                @"latitude": @(userLocation.coordinate.latitude),
                @"longitude": @(userLocation.coordinate.longitude),
                @"accuracy": @((userLocation.location.horizontalAccuracy + userLocation.location.verticalAccuracy) / 2),
        });
    }
}

- (MAAnnotationView *)mapView:(MAMapView *)mapView viewForAnnotation:(id <MAAnnotation>)annotation {
    if ([annotation isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) annotation;
        [marker updateActive];
        return marker.annotationView;
    }
    return nil;
}

- (MAOverlayRenderer *)mapView:(MAMapView *)mapView rendererForOverlay:(id <MAOverlay>)overlay {
    if ([overlay isKindOfClass:[AMapModel class]]) {
        return ((AMapModel *)overlay).renderer;
    }
    return nil;
}

- (void)mapView:(MAMapView *)mapView didSelectAnnotationView:(MAAnnotationView *)view {
    if ([view.annotation isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) view.annotation;
        if (marker.onPress) {
            marker.onPress(nil);
        }
    }
}

- (void)mapView:(MAMapView *)mapView didDeselectAnnotationView:(MAAnnotationView *)view {
    if ([view.annotation isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) view.annotation;
        marker.active = NO;
    }
}

- (void)mapView:(MAMapView *)mapView didAnnotationViewCalloutTapped:(MAAnnotationView *)view {
    if ([view.annotation isKindOfClass:[AMapMarker class]]) {
        AMapMarker *marker = (AMapMarker *) view.annotation;
        if (marker.onInfoWindowPress) {
            marker.onInfoWindowPress(nil);
        }
    }
}

- (void)mapView:(MAMapView *)mapView annotationView:(MAAnnotationView *)view didChangeDragState:(MAAnnotationViewDragState)newState
   fromOldState:(MAAnnotationViewDragState)oldState {
    AMapMarker *marker = (AMapMarker *) view.annotation;
    if (newState == MAAnnotationViewDragStateStarting && marker.onDragStart) {
        marker.onDragStart(nil);
    }
    if (newState == MAAnnotationViewDragStateDragging) {
        if (marker.onDrag) {
            marker.onDrag(nil);
        }
    }
    if (newState == MAAnnotationViewDragStateEnding && marker.onDragEnd) {
        marker.onDragEnd(@{
                @"latitude": @(marker.coordinate.latitude),
                @"longitude": @(marker.coordinate.longitude),
        });
    }
}

- (void)mapViewRegionChanged:(AMapView *)mapView {
    if (mapView.onStatusChange) {
        MAMapStatus *status = mapView.getMapStatus;
        mapView.onStatusChange(@{
                @"zoomLevel": @(status.zoomLevel),
                @"tilt": @(status.cameraDegree),
                @"rotation": @(status.rotationDegree),
                @"latitude": @(status.centerCoordinate.latitude),
                @"longitude": @(status.centerCoordinate.longitude),
        });
    }
}

- (void)mapView:(AMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
    if (mapView.onStatusChangeComplete) {
        MAMapStatus *status = mapView.getMapStatus;
        mapView.onStatusChangeComplete(@{
                @"zoomLevel": @(status.zoomLevel),
                @"tilt": @(status.cameraDegree),
                @"rotation": @(status.rotationDegree),
                @"latitude": @(status.centerCoordinate.latitude),
                @"longitude": @(status.centerCoordinate.longitude),
                @"latitudeDelta": @(mapView.region.span.latitudeDelta),
                @"longitudeDelta": @(mapView.region.span.longitudeDelta),
        });
    }
}

@end
