package cn.qiuxiang.react.amap3d;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.location.Location;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.amap.api.maps.AMap;
import com.amap.api.maps.MapView;
import com.amap.api.maps.UiSettings;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Marker;
import com.amap.api.maps.model.MyLocationStyle;
import com.amap.api.maps.model.Polyline;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.HashMap;
import java.util.Map;

@SuppressLint("ViewConstructor")
public class AMapView extends MapView {
    public final AMap map;
    public final UiSettings ui;
    private final RCTEventEmitter eventEmitter;
    private Map<String, AMapMarker> markers = new HashMap<>();
    private Map<String, AMapPolyline> polylines = new HashMap<>();

    public AMapView(final ThemedReactContext context) {
        super(context);
        super.onCreate(null);
        map = this.getMap();
        ui = map.getUiSettings();
        eventEmitter = context.getJSModule(RCTEventEmitter.class);

        // 设置默认的定位模式
        MyLocationStyle locationStyle = new MyLocationStyle();
        locationStyle.myLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER);
        map.setMyLocationStyle(locationStyle);

        map.setOnMapLoadedListener(new AMap.OnMapLoadedListener() {
            @Override
            public void onMapLoaded() {
                sendEvent("onMapLoaded", Arguments.createMap());
            }
        });

        map.setOnMapClickListener(new AMap.OnMapClickListener() {
            @Override
            public void onMapClick(LatLng latLng) {
                WritableMap event = Arguments.createMap();
                event.putDouble("latitude", latLng.latitude);
                event.putDouble("longitude", latLng.longitude);
                sendEvent("onMapClick", event);
            }
        });

        map.setOnMapLongClickListener(new AMap.OnMapLongClickListener() {
            @Override
            public void onMapLongClick(LatLng latLng) {
                WritableMap event = Arguments.createMap();
                event.putDouble("latitude", latLng.latitude);
                event.putDouble("longitude", latLng.longitude);
                sendEvent("onMapLongClick", event);
            }
        });

        map.setOnMyLocationChangeListener(new AMap.OnMyLocationChangeListener() {
            @Override
            public void onMyLocationChange(Location location) {
                WritableMap event = Arguments.createMap();
                event.putDouble("latitude", location.getLatitude());
                event.putDouble("longitude", location.getLongitude());
                event.putDouble("accuracy", location.getAccuracy());
                sendEvent("onLocationChange", event);
            }
        });

        map.setOnMarkerClickListener(new AMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {
                markers.get(marker.getId()).sendEvent("onMarkerClick", Arguments.createMap());
                return false;
            }
        });

        map.setOnMarkerDragListener(new AMap.OnMarkerDragListener() {
            @Override
            public void onMarkerDragStart(Marker marker) {
                markers.get(marker.getId()).sendEvent("onMarkerDragStart", Arguments.createMap());
            }

            @Override
            public void onMarkerDrag(Marker marker) {
                markers.get(marker.getId()).sendEvent("onMarkerDrag", Arguments.createMap());
            }

            @Override
            public void onMarkerDragEnd(Marker marker) {
                LatLng position = marker.getPosition();
                WritableMap data = Arguments.createMap();
                data.putDouble("latitude", position.latitude);
                data.putDouble("longitude", position.longitude);
                markers.get(marker.getId()).sendEvent("onMarkerDragEnd", data);
            }
        });

        map.setOnInfoWindowClickListener(new AMap.OnInfoWindowClickListener() {
            @Override
            public void onInfoWindowClick(Marker marker) {
                markers.get(marker.getId()).sendEvent("onInfoWindowClick", Arguments.createMap());
            }
        });

        map.setInfoWindowAdapter(new AMap.InfoWindowAdapter() {
            @Override
            public View getInfoWindow(Marker marker) {
                return markers.get(marker.getId()).getInfoWindow();
            }

            @Override
            public View getInfoContents(Marker marker) {
                LinearLayout layout = new LinearLayout(context);
                layout.setOrientation(LinearLayout.VERTICAL);
                TextView titleView = new TextView(context);
                titleView.setText(marker.getTitle());
                titleView.setTextColor(Color.parseColor("#212121"));
                layout.addView(titleView);

                String snippet = marker.getSnippet();
                if (!snippet.isEmpty()) {
                    TextView snippetView = new TextView(context);
                    snippetView.setText(snippet);
                    snippetView.setSingleLine(false);
                    snippetView.setMaxEms(12);
                    snippetView.setPadding(0, (int) pxFromDp(context, 5), 0, 0);
                    snippetView.setTextColor(Color.parseColor("#757575"));
                    layout.addView(snippetView);
                }

                return layout;
            }
        });

        map.setOnPolylineClickListener(new AMap.OnPolylineClickListener() {
            @Override
            public void onPolylineClick(Polyline polyline) {
                polylines.get(polyline.getId()).sendEvent("onPolylineClick", Arguments.createMap());
            }
        });
    }

    private static float pxFromDp(Context context, float dp) {
        return dp * context.getResources().getDisplayMetrics().density;
    }

    public void addMarker(AMapMarker marker) {
        marker.addToMap(map);
        markers.put(marker.getMarkerId(), marker);
    }

    public void sendEvent(String name, WritableMap data) {
        eventEmitter.receiveEvent(getId(), name, data);
    }

    public void addPolyline(AMapPolyline polyline) {
        polyline.addToMap(map);
        polylines.put(polyline.getPolylineId(), polyline);
    }
}
