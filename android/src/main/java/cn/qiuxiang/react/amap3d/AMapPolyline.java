package cn.qiuxiang.react.amap3d;

import android.content.Context;

import com.amap.api.maps.AMap;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Polyline;
import com.amap.api.maps.model.PolylineOptions;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.ArrayList;

public class AMapPolyline extends ReactViewGroup {
    private ArrayList<LatLng> coordinates;
    private Polyline polyline;
    private int color;
    private float width;
    private float zIndex;
    private boolean geodesic;
    private boolean dottedLine;
    private float opacity;
    private ArrayList<Integer> colors;
    private boolean gradient;

    public AMapPolyline(Context context) {
        super(context);
    }

    public void setCoordinates(ReadableArray coordinates) {
        this.coordinates = new ArrayList<>(coordinates.size());
        for (int i = 0; i < coordinates.size(); i++) {
            ReadableMap coordinate = coordinates.getMap(i);
            this.coordinates.add(i, new LatLng(
                    coordinate.getDouble("latitude"),
                    coordinate.getDouble("longitude")));
        }
        if (polyline != null) {
            polyline.setPoints(this.coordinates);
        }
    }

    public void setColor(int color) {
        this.color = color;
        if (polyline != null) {
            polyline.setColor(color);
        }
    }

    public void setWidth(float width) {
        this.width = width;
        if (polyline != null) {
            polyline.setWidth(width);
        }
    }

    public void setZIndex(float zIndex) {
        this.zIndex = zIndex;
        if (polyline != null) {
            polyline.setZIndex(zIndex);
        }
    }

    public void setGeodesic(boolean geodesic) {
        this.geodesic = geodesic;
        if (polyline != null) {
            polyline.setGeodesic(geodesic);
        }
    }

    public void setDottedLine(boolean dottedLine) {
        this.dottedLine = dottedLine;
        if (polyline != null) {
            polyline.setDottedLine(dottedLine);
        }
    }

    public void setGradient(boolean gradient) {
        this.gradient = gradient;
    }

    public void setOpacity(float opacity) {
        this.opacity = opacity;
        if (polyline != null) {
            polyline.setTransparency(opacity);
        }
    }

    public void setColors(ReadableArray colors) {
        this.colors = new ArrayList<>(colors.size());
        for (int i = 0; i < colors.size(); i++) {
            this.colors.add(colors.getInt(i));
        }
    }

    public void addToMap(AMap map) {
        polyline = map.addPolyline(new PolylineOptions()
                .addAll(coordinates)
                .color(color)
                .colorValues(colors)
                .width(width)
                .useGradient(gradient)
                .geodesic(geodesic)
                .setDottedLine(dottedLine)
                .transparency(opacity)
                .zIndex(zIndex));
    }

    public String getPolylineId() {
        return polyline.getId();
    }
}
