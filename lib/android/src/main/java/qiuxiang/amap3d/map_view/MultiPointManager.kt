package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.getEventTypeConstants

@Suppress("unused")
internal class MultiPointManager : SimpleViewManager<MultiPoint>() {
  override fun getName(): String {
    return "AMapMultiPoint"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MultiPoint {
    return MultiPoint(reactContext)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants("onPress")
  }

  @ReactProp(name = "items")
  fun setPoints(multiPoint: MultiPoint, items: ReadableArray) {
    multiPoint.setItems(items)
  }

  @ReactProp(name = "icon")
  fun setIcon(multiPoint: MultiPoint, icon: ReadableMap?) {
    icon?.let { multiPoint.setIcon(it) }
  }
}