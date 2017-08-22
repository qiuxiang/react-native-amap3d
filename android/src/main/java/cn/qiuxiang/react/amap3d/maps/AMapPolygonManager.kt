package cn.qiuxiang.react.amap3d.maps

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class AMapPolygonManager : ViewGroupManager<AMapPolygon>() {
    override fun getName(): String {
        return "AMapPolygon"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapPolygon {
        return AMapPolygon(reactContext)
    }

    @ReactProp(name = "coordinates")
    fun setCoordinate(polygon: AMapPolygon, coordinates: ReadableArray) {
        polygon.setCoordinates(coordinates)
    }

    @ReactProp(name = "fillColor", customType = "Color")
    fun setFillColor(polygon: AMapPolygon, fillColor: Int) {
        polygon.fillColor = fillColor
    }

    @ReactProp(name = "strokeColor", customType = "Color")
    fun setStrokeColor(polygon: AMapPolygon, strokeColor: Int) {
        polygon.strokeColor = strokeColor
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(polygon: AMapPolygon, strokeWidth: Float) {
        polygon.strokeWidth = strokeWidth
    }

    @ReactProp(name = "zIndex")
    fun setZIndex_(polygon: AMapPolygon, zIndex: Float) {
        polygon.zIndex = zIndex
    }
}
