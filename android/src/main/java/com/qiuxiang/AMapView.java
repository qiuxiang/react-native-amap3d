package com.qiuxiang;

import android.content.Context;
import android.location.Location;

import com.amap.api.maps.AMap;
import com.amap.api.maps.MapView;

public class AMapView extends MapView {
    private final AMap amap;

    public AMapView(Context context) {
        super(context);
        super.onCreate(null);
        amap = this.getMap();
    }

    public AMap getMap() {
        return amap;
    }

//    public Location getMyLocation() {
//        Location location = amap.getMyLocation();
//        return location;
//    }

    public void setMyLocationEnabled(boolean enabled) {
        amap.setMyLocationEnabled(enabled);
    }
}
