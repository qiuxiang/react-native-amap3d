package cn.qiuxiang.react.amap3d;

import android.view.View;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.HashMap;
import java.util.Map;

class AMapMarkerManager extends ViewGroupManager<AMapMarker> {
    @Override
    public String getName() {
        return "AMapMarker";
    }

    @Override
    protected AMapMarker createViewInstance(ThemedReactContext reactContext) {
        return new AMapMarker(reactContext);
    }

    @Override
    public void addView(AMapMarker marker, View view, int index) {
        marker.setInfoWindow((ReactViewGroup) view);
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("onMarkerClick", MapBuilder.of("registrationName", "onMarkerClick"));
        map.put("onMarkerDragStart", MapBuilder.of("registrationName", "onMarkerDragStart"));
        map.put("onMarkerDrag", MapBuilder.of("registrationName", "onMarkerDrag"));
        map.put("onMarkerDragEnd", MapBuilder.of("registrationName", "onMarkerDragEnd"));
        map.put("onInfoWindowClick", MapBuilder.of("registrationName", "onCalloutPress"));
        return map;
    }

    @ReactProp(name = "title")
    public void setTitle(AMapMarker marker, String title) {
        marker.setTitle(title);
    }

    @ReactProp(name = "description")
    public void setSnippet(AMapMarker marker, String description) {
        marker.setSnippet(description);
    }

    @ReactProp(name = "coordinate")
    public void setCoordinate(AMapMarker view, ReadableMap coordinate) {
        view.setCoordinate(coordinate);
    }

    @ReactProp(name = "flat")
    public void setFlat(AMapMarker marker, boolean flat) {
        marker.setFlat(flat);
    }

    @ReactProp(name = "opacity")
    public void setOpacity(AMapMarker marker, float opacity) {
        marker.setOpacity(opacity);
    }

    @ReactProp(name = "draggable")
    public void setDraggable(AMapMarker marker, boolean draggable) {
        marker.setDraggable(draggable);
    }

    @ReactProp(name = "selected")
    public void setSelected(AMapMarker marker, boolean selected) {
        marker.setSelected(selected);
    }

    @ReactProp(name = "icon")
    public void setIcon(AMapMarker marker, String icon) {
        marker.setIcon(icon);
    }

    // 对于 infoWindow，必须手动设置 layoutParams 才能正确显示，
    // 但我在 Android 端没有找到监听 infoWindow onLayout 的方法，
    // 我的解决办法是在 js 端监听 onLayout，并反馈到这里。
    //
    // PS.
    // react-native-maps 的解决方法是 LayoutShadowNode，详见：
    // https://github.com/airbnb/react-native-maps/blob/master/lib/android/src/main/java/com/airbnb/android/react/maps/SizeReportingShadowNode.java
    // 这里暂做保留。
    @ReactProp(name = "infoWindowLayout")
    public void setInfoWindowLayout(AMapMarker marker, ReadableMap layout) {
        marker.setInfoWindowLayout(layout.getInt("width"), layout.getInt("height"));
    }
}
