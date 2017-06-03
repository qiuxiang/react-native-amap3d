package cn.qiuxiang.react.amap3d;

import android.view.ViewGroup;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.HashMap;
import java.util.Map;

class AMapOverlayManager extends ViewGroupManager<AMapOverlay> {
    private static final int UPDATE = 1;

    @Override
    public String getName() {
        return "AMapOverlay";
    }

    @Override
    protected AMapOverlay createViewInstance(ThemedReactContext reactContext) {
        return new AMapOverlay(reactContext);
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("update", UPDATE);
    }

    @Override
    public void receiveCommand(AMapOverlay overlay, int commandId, ReadableArray args) {
        switch (commandId) {
            case UPDATE:
                overlay.update();
                break;
        }
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        return new SizeReportingShadowNode();
    }

    @Override
    public void updateExtraData(AMapOverlay overlay, Object extraData) {
        // noinspection unchecked
        HashMap<String, Float> data = (HashMap<String, Float>) extraData;
        overlay.setLayoutParams(new ViewGroup.LayoutParams(
                Math.round(data.get("width")), Math.round(data.get("height"))));
    }
}
