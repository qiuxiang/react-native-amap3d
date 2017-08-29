package cn.qiuxiang.react.amap3d.maps

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class AMapMarkerIconManager : ViewGroupManager<AMapMarkerIcon>() {
    override fun getName(): String {
        return "AMapOverlay"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapMarkerIcon {
        return AMapMarkerIcon(reactContext)
    }
}
