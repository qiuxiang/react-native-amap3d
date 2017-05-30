package cn.qiuxiang.react.amap3d;

import android.view.View;

import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.model.LatLng;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

class AMapViewManager extends ViewGroupManager<AMapView> {
    private final Map<String, Integer> MAP_TYPES = MapBuilder.of(
            "standard", AMap.MAP_TYPE_NORMAL,
            "satellite", AMap.MAP_TYPE_SATELLITE,
            "navigation", AMap.MAP_TYPE_NAVI,
            "night", AMap.MAP_TYPE_NIGHT
    );

    @Override
    public String getName() {
        return "AMapView";
    }

    @Override
    public void addView(AMapView mapView, View child, int index) {
        if (child instanceof AMapMarker) {
            AMapMarker marker = (AMapMarker) child;
            marker.addToMap(mapView.map);
        }
    }

    @Override
    protected AMapView createViewInstance(ThemedReactContext reactContext) {
        return new AMapView(reactContext);
    }

    @ReactProp(name = "locationEnabled")
    public void setMyLocationEnabled(AMapView view, boolean enabled) {
        view.map.setMyLocationEnabled(enabled);
    }

    @ReactProp(name = "showsIndoorMap")
    public void showIndoorMap(AMapView view, boolean show) {
        view.map.showIndoorMap(show);
    }

    @ReactProp(name = "showsIndoorSwitch")
    public void setIndoorSwitchEnabled(AMapView view, boolean show) {
        view.ui.setIndoorSwitchEnabled(show);
    }

    @ReactProp(name = "showsBuildings")
    public void showBuildings(AMapView view, boolean show) {
        view.map.showBuildings(show);
    }

    @ReactProp(name = "showsLabels")
    public void showMapText(AMapView view, boolean show) {
        view.map.showMapText(show);
    }

    @ReactProp(name = "showsCompass")
    public void setCompassEnabled(AMapView view, boolean show) {
        view.ui.setCompassEnabled(show);
    }

    @ReactProp(name = "showsZoomControls")
    public void setZoomControlsEnabled(AMapView view, boolean enabled) {
        view.ui.setZoomControlsEnabled(enabled);
    }

    @ReactProp(name = "showsScale")
    public void setScaleControlsEnabled(AMapView view, boolean enabled) {
        view.ui.setScaleControlsEnabled(enabled);
    }

    @ReactProp(name = "showsLocationButton")
    public void setMyLocationButtonEnabled(AMapView view, boolean enabled) {
        view.ui.setMyLocationButtonEnabled(enabled);
    }

    @ReactProp(name = "showsTraffic")
    public void setTrafficEnabled(AMapView view, boolean enabled) {
        view.map.setTrafficEnabled(enabled);
    }

    @ReactProp(name = "maxZoomLevel")
    public void setMaxZoomLevel(AMapView view, float zoomLevel) {
        view.map.setMaxZoomLevel(zoomLevel);
    }

    @ReactProp(name = "minZoomLevel")
    public void setMinZoomLevel(AMapView view, float zoomLevel) {
        view.map.setMinZoomLevel(zoomLevel);
    }

    @ReactProp(name = "zoomLevel")
    public void setZoomLevel(AMapView view, float zoomLevel) {
        view.map.moveCamera(CameraUpdateFactory.zoomTo(zoomLevel));
    }

    @ReactProp(name = "mapType")
    public void setMapType(AMapView view, String mapType) {
        view.map.setMapType(MAP_TYPES.get(mapType));
    }

    @ReactProp(name = "zoomEnabled")
    public void setZoomGesturesEnabled(AMapView view, boolean enabled) {
        view.ui.setZoomGesturesEnabled(enabled);
    }

    @ReactProp(name = "scrollEnabled")
    public void setScrollGesturesEnabled(AMapView view, boolean enabled) {
        view.ui.setScrollGesturesEnabled(enabled);
    }

    @ReactProp(name = "rotateEnabled")
    public void setRotateGesturesEnabled(AMapView view, boolean enabled) {
        view.ui.setRotateGesturesEnabled(enabled);
    }

    @ReactProp(name = "tiltEnabled")
    public void setTiltGesturesEnabled(AMapView view, boolean enabled) {
        view.ui.setTiltGesturesEnabled(enabled);
    }

    @ReactProp(name = "coordinate")
    public void moveToCoordinate(AMapView view, ReadableMap coordinate) {
        view.map.moveCamera(CameraUpdateFactory.changeLatLng(new LatLng(
                coordinate.getDouble("latitude"),
                coordinate.getDouble("longitude"))));
    }

    @ReactProp(name = "tilt")
    public void changeTilt(AMapView view, float tilt) {
        view.map.moveCamera(CameraUpdateFactory.changeTilt(tilt));
    }

    // todo: 自定义 locationStyle
}
