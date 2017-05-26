package com.qiuxiang;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

class AMapViewManager extends SimpleViewManager<AMapView> {
    @Override
    public String getName() {
        return "AMapView";
    }

    @Override
    protected AMapView createViewInstance(ThemedReactContext reactContext) {
        return new AMapView(reactContext);
    }

    @ReactProp(name = "showUserLocation")
    public void setMyLocationEnabled(AMapView view, boolean enabled) {
        view.getMap().setMyLocationEnabled(enabled);
    }
}
