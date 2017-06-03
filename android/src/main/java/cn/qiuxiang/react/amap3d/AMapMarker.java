package cn.qiuxiang.react.amap3d;

import android.annotation.SuppressLint;

import com.amap.api.maps.AMap;
import com.amap.api.maps.model.BitmapDescriptor;
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Marker;
import com.amap.api.maps.model.MarkerOptions;
import com.facebook.common.executors.CallerThreadExecutor;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.datasource.DataSubscriber;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.image.CloseableStaticBitmap;
import com.facebook.imagepipeline.request.ImageRequest;
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
        COLORS = new HashMap<String, Float>();
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
    private boolean flat = false;
    private float opacity = 1;
    private boolean draggable = false;
    private boolean selected;
    private BitmapDescriptor bitmapDescriptor;
    private RCTEventEmitter eventEmitter;
    private DataSubscriber<CloseableReference<CloseableImage>> dataSubscriber =
            new BaseDataSubscriber<CloseableReference<CloseableImage>>() {
                @Override
                protected void onNewResultImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
                    CloseableReference<CloseableImage> ref = dataSource.getResult();
                    if (ref != null) {
                        try {
                            bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(
                                    ((CloseableStaticBitmap) ref.get()).getUnderlyingBitmap());
                            if (marker != null) {
                                marker.setIcon(bitmapDescriptor);
                            }
                        } finally {
                            CloseableReference.closeSafely(ref);
                        }
                    }
                }

                @Override
                protected void onFailureImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
                }
            };

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

    public void setImage(String image) {
        if (image.startsWith("HUE_")) {
            bitmapDescriptor = BitmapDescriptorFactory.defaultMarker(COLORS.get(image));
            if (marker != null) {
                marker.setIcon(bitmapDescriptor);
            }
        } else {
            DataSource<CloseableReference<CloseableImage>> dataSource = Fresco
                    .getImagePipeline().fetchDecodedImage(ImageRequest.fromUri(image), this);
            dataSource.subscribe(dataSubscriber, CallerThreadExecutor.getInstance());
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

    public void setInfoWindowLayout(int width, int height) {
        infoWindow.setLayoutParams(new ReactViewGroup.LayoutParams(width, height));
    }
}
