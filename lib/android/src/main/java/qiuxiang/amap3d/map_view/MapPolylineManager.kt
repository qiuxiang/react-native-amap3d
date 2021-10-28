package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.getEventTypeConstants
import qiuxiang.amap3d.toLatLngList
import qiuxiang.amap3d.toPx

@Suppress("unused")
internal class MapPolylineManager : SimpleViewManager<MapPolyline>() {
  override fun getName(): String {
    return "AMapPolyline"
  }

  override fun createViewInstance(context: ThemedReactContext): MapPolyline {
    return MapPolyline(context)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants("onPress")
  }

  @ReactProp(name = "points")
  fun setPoints(polyline: MapPolyline, points: ReadableArray) {
    polyline.points = points.toLatLngList()
  }

  @ReactProp(name = "colors")
  fun setColors(polyline: MapPolyline, colors: ReadableArray) {
    polyline.colors = (0 until colors.size()).map { colors.getInt(it) }
  }

  @ReactProp(name = "color", customType = "Color")
  fun setColor(polyline: MapPolyline, color: Int) {
    polyline.color = color
  }

  @ReactProp(name = "width")
  fun setWidth(polyline: MapPolyline, width: Float) {
    polyline.width = width.toPx().toFloat()
  }

  @ReactProp(name = "zIndex")
  fun setIndex(polyline: MapPolyline, zIndex: Float) {
    polyline.zIndex = zIndex
  }

  @ReactProp(name = "geodesic")
  fun setGeodesic(polyline: MapPolyline, geodesic: Boolean) {
    polyline.geodesic = geodesic
  }

  @ReactProp(name = "dashed")
  fun setDashed(polyline: MapPolyline, dashed: Boolean) {
    polyline.dashed = dashed
  }

  @ReactProp(name = "gradient")
  fun setGradient(polyline: MapPolyline, gradient: Boolean) {
    polyline.gradient = gradient
  }
}
