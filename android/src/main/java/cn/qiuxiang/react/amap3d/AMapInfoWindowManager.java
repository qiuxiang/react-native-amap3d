package cn.qiuxiang.react.amap3d;

import android.widget.LinearLayout;

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
        // we use a custom shadow node that emits the width/height of the view
        // after layout with the updateExtraData method. Without this, we can't generate
        // a bitmap of the appropriate width/height of the rendered view.
        return new SizeReportingShadowNode();
    }


    @Override
    public void updateExtraData(AMapInfoWindow infoWindow, Object extraData) {
        // This method is called from the shadow node with the width/height of the rendered
        // marker view.
        //
        // noinspection unchecked
        HashMap<String, Float> data = (HashMap<String, Float>) extraData;
        infoWindow.setLayoutParams(new LinearLayout.LayoutParams(
                Math.round(data.get("width")), Math.round(data.get("height"))));
    }
}
