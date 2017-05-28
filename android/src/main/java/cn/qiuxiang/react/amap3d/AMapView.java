package cn.qiuxiang.react.amap3d;

import android.content.Context;
import android.graphics.Color;

import com.amap.api.maps.AMap;
import com.amap.api.maps.MapView;
import com.amap.api.maps.UiSettings;
import com.amap.api.maps.model.MyLocationStyle;

public class AMapView extends MapView {
    public final AMap map;
    public final UiSettings ui;
    public final MyLocationStyle locationStyle;

    public AMapView(Context context) {
        super(context);
        super.onCreate(null);
        map = this.getMap();
        ui = map.getUiSettings();
        locationStyle = new MyLocationStyle();
        locationStyle.myLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER);
        map.setMyLocationStyle(locationStyle);
    }
}
