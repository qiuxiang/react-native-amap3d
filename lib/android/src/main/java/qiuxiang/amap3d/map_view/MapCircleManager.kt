package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.toLatLng
import qiuxiang.amap3d.toPx

@Suppress("unused")
internal class MapCircleManager : SimpleViewManager<MapCircle>() {
  override fun getName(): String {
    return "AMapCircle"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapCircle {
    return MapCircle(reactContext)
  }

  @ReactProp(name = "center")
  fun setCenter(circle: MapCircle, center: ReadableMap) {
    circle.center = center.toLatLng()
  }

  @ReactProp(name = "radius")
  fun setRadius(circle: MapCircle, radius: Double) {
    circle.radius = radius
  }

  @ReactProp(name = "fillColor", customType = "Color")
  fun setFillColor(circle: MapCircle, fillColor: Int) {
    circle.fillColor = fillColor
  }

  @ReactProp(name = "strokeColor", customType = "Color")
  fun setStrokeColor(circle: MapCircle, strokeColor: Int) {
    circle.strokeColor = strokeColor
  }

  @ReactProp(name = "strokeWidth")
  fun setStrokeWidth(circle: MapCircle, strokeWidth: Float) {
    circle.strokeWidth = strokeWidth.toPx().toFloat()
  }

  @ReactProp(name = "zIndex")
  fun setIndex(circle: MapCircle, zIndex: Float) {
    circle.zIndex = zIndex
  }
}
