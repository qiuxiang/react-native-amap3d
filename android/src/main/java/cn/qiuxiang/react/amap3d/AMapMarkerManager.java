package cn.qiuxiang.react.amap3d;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.HashMap;
import java.util.Map;

class AMapMarkerManager extends SimpleViewManager<AMapMarker> {
    @Override
    public String getName() {
        return "AMapMarker";
    }

    @Override
    protected AMapMarker createViewInstance(ThemedReactContext reactContext) {
        return new AMapMarker(reactContext);
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

    @ReactProp(name = "image")
    public void setImage(AMapMarker marker, String image) {
        marker.setImage(image);
    }
}
