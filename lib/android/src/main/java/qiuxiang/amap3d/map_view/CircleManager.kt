package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.toLatLng
import qiuxiang.amap3d.toPx

@Suppress("unused")
internal class CircleManager : SimpleViewManager<Circle>() {
  override fun getName(): String {
    return "AMapCircle"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): Circle {
    return Circle(reactContext)
  }

  @ReactProp(name = "center")
  fun setCenter(circle: Circle, center: ReadableMap) {
    circle.center = center.toLatLng()
  }

  @ReactProp(name = "radius")
  fun setRadius(circle: Circle, radius: Double) {
    circle.radius = radius
  }

  @ReactProp(name = "fillColor", customType = "Color")
  fun setFillColor(circle: Circle, fillColor: Int) {
    circle.fillColor = fillColor
  }

  @ReactProp(name = "strokeColor", customType = "Color")
  fun setStrokeColor(circle: Circle, strokeColor: Int) {
    circle.strokeColor = strokeColor
  }

  @ReactProp(name = "strokeWidth")
  fun setStrokeWidth(circle: Circle, strokeWidth: Float) {
    circle.strokeWidth = strokeWidth.toPx().toFloat()
  }

  @ReactProp(name = "zIndex")
  fun setIndex(circle: Circle, zIndex: Float) {
    circle.zIndex = zIndex
  }
}
