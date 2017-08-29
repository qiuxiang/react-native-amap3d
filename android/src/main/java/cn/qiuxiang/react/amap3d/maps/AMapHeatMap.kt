package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import com.amap.api.maps.AMap
import com.amap.api.maps.model.HeatmapTileProvider
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.TileOverlay
import com.amap.api.maps.model.TileOverlayOptions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup

class AMapHeatMap(context: Context) : ReactViewGroup(context) {
    var overlay: TileOverlay? = null
        private set

    var opacity: Double = 0.6
    var radius: Int = 12

    private var coordinates: ArrayList<LatLng> = ArrayList()

    fun setCoordinates(coordinates: ReadableArray) {
        this.coordinates = ArrayList((0 until coordinates.size())
                .map { coordinates.getMap(it) }
                .map { LatLng(it.getDouble("latitude"), it.getDouble("longitude")) })
    }

    fun addToMap(map: AMap) {
        overlay = map.addTileOverlay(TileOverlayOptions().tileProvider(
                HeatmapTileProvider.Builder()
                        .data(coordinates)
                        .radius(radius)
                        .transparency(opacity)
                        .build()))
    }
}