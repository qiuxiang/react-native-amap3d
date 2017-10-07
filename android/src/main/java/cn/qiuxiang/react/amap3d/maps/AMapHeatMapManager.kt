package cn.qiuxiang.react.amap3d.maps

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class AMapHeatMapManager : SimpleViewManager<AMapHeatMap>() {
    override fun getName(): String {
        return "AMapHeatMap"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapHeatMap {
        return AMapHeatMap(reactContext)
    }

    @ReactProp(name = "coordinates")
    fun setCoordinate(heatMap: AMapHeatMap, coordinates: ReadableArray) {
        heatMap.setCoordinates(coordinates)
    }

    @ReactProp(name = "radius")
    fun setRadius(heatMap: AMapHeatMap, radius: Int) {
        heatMap.radius = radius
    }

    @ReactProp(name = "opacity")
    fun setOpacity(heatMap: AMapHeatMap, opacity: Double) {
        heatMap.opacity = opacity
    }
}