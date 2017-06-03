package cn.qiuxiang.react.amap3d;

import android.view.ViewGroup;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.HashMap;

class AMapInfoWindowManager extends ViewGroupManager<AMapInfoWindow> {
    @Override
    public String getName() {
        return "AMapInfoWindow";
    }

    @Override
    protected AMapInfoWindow createViewInstance(ThemedReactContext reactContext) {
        return new AMapInfoWindow(reactContext);
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        return new SizeReportingShadowNode();
    }

    @Override
    public void updateExtraData(AMapInfoWindow infoWindow, Object extraData) {
        // noinspection unchecked
        HashMap<String, Float> data = (HashMap<String, Float>) extraData;
        infoWindow.setLayoutParams(new ViewGroup.LayoutParams(
                Math.round(data.get("width")), Math.round(data.get("height"))));
    }
}
