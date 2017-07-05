#import <React/RCTViewManager.h>
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
    // when scroll view contains Map maybe we need stop Map Rending Cost.
    mapView.runLoopMode = NSDefaultRunLoopMode;
    mapView.allowsAnnotationViewSorting = YES;
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
RCT_EXPORT_VIEW_PROPERTY(rotate, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLongPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLocation, RCTBubblingEventBlock)

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
        if (marker.active) {
            dispatch_async(dispatch_get_main_queue(), ^{
                // directly call selectAnnotation not work, because of there has no current AnnotationView presentation.
                // use RUNLOOP
                [mapView selectAnnotation:marker animated:YES];
            });
        }
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
    AMapMarker *marker = (AMapMarker *) view.annotation;
    if (marker.onMarkerClick) {
        marker.onMarkerClick(@{});
    }
}

- (void)mapView:(MAMapView *)mapView didAnnotationViewCalloutTapped:(MAAnnotationView *)view {
    AMapMarker *marker = (AMapMarker *) view.annotation;
    if (marker.onInfoWindowClick) {
        marker.onInfoWindowClick(@{});
    }
}

- (void)mapView:(MAMapView *)mapView annotationView:(MAAnnotationView *)view didChangeDragState:(MAAnnotationViewDragState)newState
   fromOldState:(MAAnnotationViewDragState)oldState {
    AMapMarker *marker = (AMapMarker *) view.annotation;
    
    if (newState == MAAnnotationViewDragStateStarting && marker.onMarkerDragStart) {
        marker.onMarkerDragStart(@{});
    }
    if (newState == MAAnnotationViewDragStateDragging && marker.onMarkerDrag) {
        marker.onMarkerDrag(@{});
    }
    if (newState == MAAnnotationViewDragStateEnding && marker.onMarkerDragEnd) {
        marker.onMarkerDragEnd(@{
                @"latitude": @(marker.coordinate.latitude),
                @"longitude": @(marker.coordinate.longitude),
        });
    }
    if (newState == MAAnnotationViewDragStateCanceling || newState == MAAnnotationViewDragStateEnding) {
        [marker resetImage];
    }
}

RCT_EXPORT_METHOD(animateToCoordinate:(nonnull NSNumber *)reactTag coordinate:(CLLocationCoordinate2D)coord duration:(NSInteger)duration) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = [viewRegistry objectForKey:reactTag];
        if (view && [view isKindOfClass:[MAMapView class]]) {
            MAMapView *mapView = (MAMapView *) view;
            MAMapStatus *mapStatus = [mapView getMapStatus];
            
            mapStatus.centerCoordinate = coord;
            [mapView setMapStatus:mapStatus animated:duration > 0 duration:1.0f * duration / 1000];
        }
    }];
}

RCT_EXPORT_METHOD(animateToZoomLevel:(nonnull NSNumber *)reactTag zoomLevel:(CGFloat)zoomLevel duration:(NSInteger)duration) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = [viewRegistry objectForKey:reactTag];
        if (view && [view isKindOfClass:[MAMapView class]]) {
            MAMapView *mapView = (MAMapView *) view;
            MAMapStatus *mapStatus = [mapView getMapStatus];
            
            mapStatus.zoomLevel = zoomLevel;
            [mapView setMapStatus:mapStatus animated:duration > 0 duration:1.0f * duration / 1000];
        }
    }];
}

RCT_EXPORT_METHOD(animateToMapStatus:(nonnull NSNumber *)reactTag mapStatus:(MAMapStatus *)changeStatus duration:(NSInteger)duration) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = [viewRegistry objectForKey:reactTag];
        if (view && [view isKindOfClass:[MAMapView class]]) {
            MAMapView *mapView = (MAMapView *) view;
            MAMapStatus *mapStatus = [mapView getMapStatus];
            if (changeStatus.centerCoordinate.latitude >= 0 && changeStatus.centerCoordinate.longitude >= 0) {
                mapStatus.centerCoordinate = changeStatus.centerCoordinate;
            }
            if (changeStatus.zoomLevel >= 0) {
                mapStatus.zoomLevel = changeStatus.zoomLevel;
            }
            if (changeStatus.cameraDegree >= 0) {
                mapStatus.cameraDegree = changeStatus.cameraDegree;
            }
            if (changeStatus.rotationDegree >= 0) {
                mapStatus.rotationDegree = changeStatus.rotationDegree;
            }
            if (changeStatus.screenAnchor.x >= 0 && changeStatus.screenAnchor.y >= 0) {
                mapStatus.screenAnchor = changeStatus.screenAnchor;
            }
            
            [mapView setMapStatus:mapStatus animated:duration > 0 duration:1.0f * duration / 1000];
        }
    }];
}

@end
