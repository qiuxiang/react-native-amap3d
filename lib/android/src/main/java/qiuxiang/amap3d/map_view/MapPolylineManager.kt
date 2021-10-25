package qiuxiang.amap3d.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.toPx

@Suppress("unused")
internal class MapPolylineManager : SimpleViewManager<MapPolyline>() {
  override fun getName(): String {
    return "AMapPolyline"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapPolyline {
    return MapPolyline(reactContext)
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return mapOf("onPress" to mapOf("registrationName" to "onPress"))
  }

  @ReactProp(name = "coordinates")
  fun setCoordinate(polyline: MapPolyline, coordinates: ReadableArray) {
    polyline.setCoordinates(coordinates)
  }

  @ReactProp(name = "colors")
  fun setColors(polyline: MapPolyline, colors: ReadableArray) {
    polyline.setColors(colors)
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
  fun setZIndez(polyline: MapPolyline, zIndex: Float) {
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
