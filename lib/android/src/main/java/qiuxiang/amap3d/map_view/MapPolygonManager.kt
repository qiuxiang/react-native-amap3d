package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.toLatLngList
import qiuxiang.amap3d.toPx

@Suppress("unused")
internal class MapPolygonManager : SimpleViewManager<MapPolygon>() {
  override fun getName(): String {
    return "AMapPolygon"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapPolygon {
    return MapPolygon(reactContext)
  }

  @ReactProp(name = "points")
  fun setPoints(polygon: MapPolygon, points: ReadableArray) {
    polygon.points = points.toLatLngList()
  }

  @ReactProp(name = "fillColor", customType = "Color")
  fun setFillColor(polygon: MapPolygon, fillColor: Int) {
    polygon.fillColor = fillColor
  }

  @ReactProp(name = "strokeColor", customType = "Color")
  fun setStrokeColor(polygon: MapPolygon, strokeColor: Int) {
    polygon.strokeColor = strokeColor
  }

  @ReactProp(name = "strokeWidth")
  fun setStrokeWidth(polygon: MapPolygon, strokeWidth: Float) {
    polygon.strokeWidth = strokeWidth.toPx().toFloat()
  }

  @ReactProp(name = "zIndex")
  fun setIndex(polygon: MapPolygon, zIndex: Float) {
    polygon.zIndex = zIndex
  }
}
