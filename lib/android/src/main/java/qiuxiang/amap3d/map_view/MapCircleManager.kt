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

  @ReactProp(name = "coordinate")
  fun setCoordinate(circle: MapCircle, coordinate: ReadableMap) {
    circle.center = coordinate.toLatLng()
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
  fun setZIndez(circle: MapCircle, zIndex: Float) {
    circle.zIndex = zIndex
  }
}
