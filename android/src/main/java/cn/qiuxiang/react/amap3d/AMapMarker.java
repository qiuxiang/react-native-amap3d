package cn.qiuxiang.react.amap3d;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.view.View;

import com.amap.api.maps.AMap;
import com.amap.api.maps.model.BitmapDescriptor;
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Marker;
import com.amap.api.maps.model.MarkerOptions;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.HashMap;
import java.util.Map;

@SuppressLint("ViewConstructor")
public class AMapMarker extends ReactViewGroup {
    private static final Map<String, Float> COLORS;

    static {
        COLORS = new HashMap<>();
        COLORS.put("HUE_AZURE", BitmapDescriptorFactory.HUE_AZURE);
        COLORS.put("HUE_BLUE", BitmapDescriptorFactory.HUE_BLUE);
        COLORS.put("HUE_CYAN", BitmapDescriptorFactory.HUE_CYAN);
        COLORS.put("HUE_GREEN", BitmapDescriptorFactory.HUE_GREEN);
        COLORS.put("HUE_MAGENTA", BitmapDescriptorFactory.HUE_MAGENTA);
        COLORS.put("HUE_ORANGE", BitmapDescriptorFactory.HUE_ORANGE);
        COLORS.put("HUE_RED", BitmapDescriptorFactory.HUE_RED);
        COLORS.put("HUE_ROSE", BitmapDescriptorFactory.HUE_ROSE);
        COLORS.put("HUE_VIOLET", BitmapDescriptorFactory.HUE_VIOLET);
        COLORS.put("HUE_YELLOW", BitmapDescriptorFactory.HUE_YELLOW);
    }

    private ReactViewGroup infoWindow;
    private Marker marker;
    private LatLng position;
    private String title = "";
    private String snippet = "";
    private boolean flat;
    private float opacity;
    private boolean draggable;
    private boolean selected;
    private boolean infoWindowEnabled;
    private BitmapDescriptor bitmapDescriptor;
    private RCTEventEmitter eventEmitter;

    public AMapMarker(ThemedReactContext context) {
        super(context);
        eventEmitter = context.getJSModule(RCTEventEmitter.class);
    }

    public void addToMap(AMap map) {
        marker = map.addMarker(getMarkerOptions());
        if (selected) {
            marker.showInfoWindow();
        } else {
            marker.hideInfoWindow();
        }
    }

    public String getMarkerId() {
        return marker.getId();
    }

    private MarkerOptions getMarkerOptions() {
        return new MarkerOptions()
                .setFlat(flat)
                .icon(bitmapDescriptor)
                .alpha(opacity)
                .draggable(draggable)
                .position(position)
                .title(title)
                .infoWindowEnable(infoWindowEnabled)
                .snippet(snippet);
    }

    public void setTitle(String title) {
        this.title = title;
        if (marker != null) {
            marker.setTitle(title);
        }
    }

    public void setSnippet(String snippet) {
        this.snippet = snippet;
        if (marker != null) {
            marker.setSnippet(snippet);
        }
    }

    public void setCoordinate(ReadableMap coordinate) {
        position = new LatLng(coordinate.getDouble("latitude"), coordinate.getDouble("longitude"));
        if (marker != null) {
            marker.setPosition(position);
        }
    }

    public void setFlat(boolean flat) {
        this.flat = flat;
        if (marker != null) {
            marker.setFlat(flat);
        }
    }

    public void setOpacity(float opacity) {
        this.opacity = opacity;
        if (marker != null) {
            marker.setAlpha(opacity);
        }
    }

    public void setDraggable(boolean draggable) {
        this.draggable = draggable;
        if (marker != null) {
            marker.setDraggable(draggable);
        }
    }

    public void setIcon(String icon) {
        if (icon.startsWith("HUE_")) {
            bitmapDescriptor = BitmapDescriptorFactory.defaultMarker(COLORS.get(icon));
            if (marker != null) {
                marker.setIcon(bitmapDescriptor);
            }
        }
    }

    public void sendEvent(String name, WritableMap data) {
        eventEmitter.receiveEvent(getId(), name, data);
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
        if (marker != null) {
            if (selected) {
                marker.showInfoWindow();
            } else {
                marker.hideInfoWindow();
            }
        }
    }

    public ReactViewGroup getInfoWindow() {
        return infoWindow;
    }

    public void setInfoWindow(ReactViewGroup view) {
        infoWindow = view;
    }

    public void setIconView(final AMapOverlay overlay) {
        overlay.addOnLayoutChangeListener(new OnLayoutChangeListener() {
            @Override
            public void onLayoutChange(View view, int i, int i1, int i2, int i3, int i4, int i5, int i6, int i7) {
                updateIcon(overlay);
            }
        });
        overlay.setOnUpdateListener(new AMapOverlay.OnUpdateListener() {
            @Override
            public void onUpdate() {
                updateIcon(overlay);
            }
        });
    }

    private void updateIcon(AMapOverlay overlay) {
        Bitmap bitmap = Bitmap.createBitmap(
                overlay.getWidth(),
                overlay.getHeight(),
                Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        overlay.draw(canvas);
        bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap);
        if (marker != null) {
            marker.setIcon(bitmapDescriptor);
        }
    }

    public void setEnabledInfoWindow(boolean enabled) {
        infoWindowEnabled = enabled;
    }
}
