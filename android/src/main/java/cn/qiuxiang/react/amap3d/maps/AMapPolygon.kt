package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import android.graphics.Color
import com.amap.api.maps.AMap
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Polygon
import com.amap.api.maps.model.PolygonOptions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup

class AMapPolygon(context: Context) : ReactViewGroup(context) {
    var polygon: Polygon? = null
        private set

    var strokeWidth: Float = 1f
        set(value) {
            field = value
            polygon?.strokeWidth = value
        }

    var strokeColor: Int = Color.BLACK
        set(value) {
            field = value
            polygon?.strokeColor = value
        }

    var fillColor: Int = Color.BLACK
        set(value) {
            field = value
            polygon?.fillColor = value
        }

    var zIndex: Float = 0f
        set(value) {
            field = value
            polygon?.zIndex = value
        }

    private var coordinates: ArrayList<LatLng> = ArrayList()

    fun setCoordinates(coordinates: ReadableArray) {
        this.coordinates = ArrayList((0 until coordinates.size())
                .map { coordinates.getMap(it) }
                .map { LatLng(it.getDouble("latitude"), it.getDouble("longitude")) })

        polygon?.points = this.coordinates
    }

    fun addToMap(map: AMap) {
        polygon = map.addPolygon(PolygonOptions()
                .addAll(coordinates)
                .strokeColor(strokeColor)
                .strokeWidth(strokeWidth)
                .fillColor(fillColor)
                .zIndex(zIndex))
    }
}
