package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class MapMultiPointManager : SimpleViewManager<MapMultiPoint>() {
  override fun getName(): String {
    return "AMapMultiPoint"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapMultiPoint {
    return MapMultiPoint(reactContext)
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
    return MapBuilder.of(
      "onItemPress", MapBuilder.of("registrationName", "onItemPress")
    )
  }

  @ReactProp(name = "points")
  fun setPoints(multiPoint: MapMultiPoint, points: ReadableArray) {
    multiPoint.setPoints(points)
  }

  @ReactProp(name = "image")
  fun setImage(multiPoint: MapMultiPoint, image: String) {
    multiPoint.setImage(image)
  }
}