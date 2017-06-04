package cn.qiuxiang.react.amap3d

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class AMapPolylineManager : ViewGroupManager<AMapPolyline>() {
    override fun getName(): String {
        return "AMapPolyline"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapPolyline {
        return AMapPolyline(reactContext)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf("onPolylineClick" to mapOf("registrationName" to "onPolylineClick"))
    }

    @ReactProp(name = "coordinates")
    fun setCoordinate(polyline: AMapPolyline, coordinates: ReadableArray) {
        polyline.setCoordinates(coordinates)
    }

    @ReactProp(name = "colors")
    fun setColors(polyline: AMapPolyline, colors: ReadableArray) {
        polyline.setColors(colors)
    }

    @ReactProp(name = "color", customType = "Color")
    fun setColor(polyline: AMapPolyline, color: Int) {
        polyline.setColor(color)
    }

    @ReactProp(name = "width")
    fun setWidth(polyline: AMapPolyline, width: Int) {
        polyline.setWidth(width.toFloat())
    }

    @ReactProp(name = "zIndex")
    fun setZIndex(polyline: AMapPolyline, zIndex: Int) {
        polyline.setZIndex(zIndex.toFloat())
    }

    @ReactProp(name = "opacity")
    override fun setOpacity(polyline: AMapPolyline, opacity: Float) {
        polyline.setOpacity(opacity)
    }

    @ReactProp(name = "geodesic")
    fun setGeodesic(polyline: AMapPolyline, geodesic: Boolean) {
        polyline.setGeodesic(geodesic)
    }

    @ReactProp(name = "dottedLine")
    fun setDottedLine(polyline: AMapPolyline, dottedLine: Boolean) {
        polyline.setDottedLine(dottedLine)
    }

    @ReactProp(name = "gradient")
    fun setGradient(polyline: AMapPolyline, gradient: Boolean) {
        polyline.setGradient(gradient)
    }
}
