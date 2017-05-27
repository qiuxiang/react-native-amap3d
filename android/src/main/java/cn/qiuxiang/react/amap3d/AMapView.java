package cn.qiuxiang.react.amap3d;

import android.content.Context;

import com.amap.api.maps.AMap;
import com.amap.api.maps.MapView;
import com.amap.api.maps.UiSettings;

public class AMapView extends MapView {
    public final AMap map;
    public final UiSettings ui;

    public AMapView(Context context) {
        super(context);
        super.onCreate(null);
        map = this.getMap();
        ui = map.getUiSettings();
    }
}
