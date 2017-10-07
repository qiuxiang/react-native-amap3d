package cn.qiuxiang.react.amap3d.maps

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class AMapMultiPointManager : SimpleViewManager<AMapMultiPoint>() {
    override fun getName(): String {
        return "AMapMultiPoint"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapMultiPoint {
        return AMapMultiPoint(reactContext)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
        return MapBuilder.of(
                "onItemPress", MapBuilder.of("registrationName", "onItemPress")
        )
    }

    @ReactProp(name = "points")
    fun setPoints(multiPoint: AMapMultiPoint, points: ReadableArray) {
        multiPoint.setPoints(points)
    }

    @ReactProp(name = "image")
    fun setImage(multiPoint: AMapMultiPoint, image: String) {
        multiPoint.setImage(image);
    }
}