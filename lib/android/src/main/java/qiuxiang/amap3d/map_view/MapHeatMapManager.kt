package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class MapHeatMapManager : SimpleViewManager<MapHeatMap>() {
  override fun getName(): String {
    return "AMapHeatMap"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapHeatMap {
    return MapHeatMap(reactContext)
  }

  @ReactProp(name = "coordinates")
  fun setCoordinate(heatMap: MapHeatMap, coordinates: ReadableArray) {
    heatMap.setCoordinates(coordinates)
  }

  @ReactProp(name = "radius")
  fun setRadius(heatMap: MapHeatMap, radius: Int) {
    heatMap.radius = radius
  }

  @ReactProp(name = "opacity")
  fun setOpacity(heatMap: MapHeatMap, opacity: Double) {
    heatMap.opacity = opacity
  }
}