package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.getEventTypeConstants

@Suppress("unused")
internal class MapMultiPointManager : SimpleViewManager<MapMultiPoint>() {
  override fun getName(): String {
    return "AMapMultiPoint"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapMultiPoint {
    return MapMultiPoint(reactContext)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants("onPress")
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