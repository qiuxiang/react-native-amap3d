package cn.qiuxiang.react.amap3d;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

class AMapPolylineManager extends ViewGroupManager<AMapPolyline> {
    @Override
    public String getName() {
        return "AMapPolyline";
    }

    @Override
    protected AMapPolyline createViewInstance(ThemedReactContext reactContext) {
        return new AMapPolyline(reactContext);
    }

    @ReactProp(name = "coordinates")
    public void setCoordinate(AMapPolyline polyline, ReadableArray coordinates) {
        polyline.setCoordinates(coordinates);
    }

    @ReactProp(name = "colors")
    public void setColors(AMapPolyline polyline, ReadableArray colors) {
        polyline.setColors(colors);
    }

    @ReactProp(name = "color", customType = "Color")
    public void setColor(AMapPolyline polyline, int color) {
        polyline.setColor(color);
    }

    @ReactProp(name = "width")
    public void setWidth(AMapPolyline polyline, int width) {
        polyline.setWidth(width);
    }

    @ReactProp(name = "zIndex")
    public void setZIndex(AMapPolyline polyline, int zIndex) {
        polyline.setZIndex(zIndex);
    }

    @ReactProp(name = "opacity")
    public void setOpacity(AMapPolyline polyline, float opacity) {
        polyline.setOpacity(opacity);
    }

    @ReactProp(name = "geodesic")
    public void setGeodesic(AMapPolyline polyline, boolean geodesic) {
        polyline.setGeodesic(geodesic);
    }

    @ReactProp(name = "dottedLine")
    public void setDottedLine(AMapPolyline polyline, boolean dottedLine) {
        polyline.setDottedLine(dottedLine);
    }

    @ReactProp(name = "gradient")
    public void setGradient(AMapPolyline polyline, boolean gradient) {
        polyline.setGradient(gradient);
    }
}
