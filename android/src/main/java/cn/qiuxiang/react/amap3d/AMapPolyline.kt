package cn.qiuxiang.react.amap3d

import android.graphics.Color
import com.amap.api.maps.AMap
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Polyline
import com.amap.api.maps.model.PolylineOptions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.views.view.ReactViewGroup

class AMapPolyline(context: ThemedReactContext) : ReactViewGroup(context) {
    private var polyline: Polyline? = null
    private var coordinates: ArrayList<LatLng> = ArrayList()
    private var width: Float = 1f
    private var color: Int = Color.BLACK
    private var colors: ArrayList<Int> = ArrayList()
    private var opacity: Float = 1f
    private var zIndex: Float = 0f
    private var geodesic: Boolean = false
    private var dottedLine: Boolean = false
    private var gradient: Boolean = false
    private val eventEmitter: RCTEventEmitter = context.getJSModule(RCTEventEmitter::class.java)

    val polylineId: String?
        get() = polyline?.id

    fun setCoordinates(coordinates: ReadableArray) {
        this.coordinates = ArrayList((0..coordinates.size() - 1)
                .map { coordinates.getMap(it) }
                .map { LatLng(it.getDouble("latitude"), it.getDouble("longitude")) })

        polyline?.points = this.coordinates
    }

    fun setColor(color: Int) {
        this.color = color
        polyline?.color = color
    }

    fun setWidth(width: Float) {
        this.width = width
        polyline?.width = width
    }

    fun setZIndex(zIndex: Float) {
        this.zIndex = zIndex
        polyline?.zIndex = zIndex
    }

    fun setGeodesic(geodesic: Boolean) {
        this.geodesic = geodesic
        polyline?.isGeodesic = geodesic
    }

    fun setDottedLine(dottedLine: Boolean) {
        this.dottedLine = dottedLine
        polyline?.isDottedLine = dottedLine
    }

    fun setGradient(gradient: Boolean) {
        this.gradient = gradient
    }

    fun setOpacity(opacity: Float) {
        this.opacity = opacity
        polyline?.setTransparency(opacity)
    }

    fun setColors(colors: ReadableArray) {
        this.colors = ArrayList((0..colors.size() - 1).map { colors.getInt(it) })
    }

    fun addToMap(map: AMap) {
        polyline = map.addPolyline(PolylineOptions()
                .addAll(coordinates)
                .color(color)
                .colorValues(colors)
                .width(width)
                .useGradient(gradient)
                .geodesic(geodesic)
                .setDottedLine(dottedLine)
                .transparency(opacity)
                .zIndex(zIndex))
    }

    fun sendEvent(name: String, data: WritableMap) {
        eventEmitter.receiveEvent(id, name, data)
    }
}
