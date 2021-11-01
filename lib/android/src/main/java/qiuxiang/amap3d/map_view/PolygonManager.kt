package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.toLatLngList
import qiuxiang.amap3d.toPx

@Suppress("unused")
internal class PolygonManager : SimpleViewManager<Polygon>() {
  override fun getName(): String {
    return "AMapPolygon"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): Polygon {
    return Polygon(reactContext)
  }

  @ReactProp(name = "points")
  fun setPoints(polygon: Polygon, points: ReadableArray) {
    polygon.points = points.toLatLngList()
  }

  @ReactProp(name = "fillColor", customType = "Color")
  fun setFillColor(polygon: Polygon, fillColor: Int) {
    polygon.fillColor = fillColor
  }

  @ReactProp(name = "strokeColor", customType = "Color")
  fun setStrokeColor(polygon: Polygon, strokeColor: Int) {
    polygon.strokeColor = strokeColor
  }

  @ReactProp(name = "strokeWidth")
  fun setStrokeWidth(polygon: Polygon, strokeWidth: Float) {
    polygon.strokeWidth = strokeWidth.toPx().toFloat()
  }

  @ReactProp(name = "zIndex")
  fun setIndex(polygon: Polygon, zIndex: Float) {
    polygon.zIndex = zIndex
  }
}
