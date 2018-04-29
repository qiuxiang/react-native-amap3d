package cn.qiuxiang.react.amap3d.maps

import cn.qiuxiang.react.amap3d.toLatLng
import cn.qiuxiang.react.amap3d.toPx
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class AMapCircleManager : SimpleViewManager<AMapCircle>() {
    override fun getName(): String {
        return "AMapCircle"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapCircle {
        return AMapCircle(reactContext)
    }

    @ReactProp(name = "coordinate")
    fun setCoordinate(circle: AMapCircle, coordinate: ReadableMap) {
        circle.center = coordinate.toLatLng()
    }

    @ReactProp(name = "radius")
    fun setRadius(circle: AMapCircle, radius: Double) {
        circle.radius = radius
    }

    @ReactProp(name = "fillColor", customType = "Color")
    fun setFillColor(circle: AMapCircle, fillColor: Int) {
        circle.fillColor = fillColor
    }

    @ReactProp(name = "strokeColor", customType = "Color")
    fun setStrokeColor(circle: AMapCircle, strokeColor: Int) {
        circle.strokeColor = strokeColor
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(circle: AMapCircle, strokeWidth: Float) {
        circle.strokeWidth = strokeWidth.toPx().toFloat()
    }

    @ReactProp(name = "zIndex")
    fun setZIndez(circle: AMapCircle, zIndex: Float) {
        circle.zIndex = zIndex
    }
}
