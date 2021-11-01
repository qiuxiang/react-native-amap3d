package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.toLatLngList

@Suppress("unused")
internal class HeatMapManager : SimpleViewManager<HeatMap>() {
  override fun getName(): String {
    return "AMapHeatMap"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): HeatMap {
    return HeatMap(reactContext)
  }

  @ReactProp(name = "data")
  fun setData(heatMap: HeatMap, data: ReadableArray) {
    heatMap.data = data.toLatLngList()
  }

  @ReactProp(name = "radius")
  fun setRadius(heatMap: HeatMap, radius: Int) {
    heatMap.radius = radius
  }

  @ReactProp(name = "opacity")
  fun setOpacity(heatMap: HeatMap, opacity: Double) {
    heatMap.opacity = opacity
  }
}