package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import android.graphics.Color
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup

class AMapHeatMap(context: Context) : ReactViewGroup(context), AMapOverlay {
    private var overlay: TileOverlay? = null
    private var coordinates: ArrayList<LatLng> = ArrayList()

    var opacity: Double = 0.6
    var radius: Int = 12

    fun setCoordinates(coordinates: ReadableArray) {
        val _coordinates = ArrayList<LatLng>();
        coordinates.toArrayList().forEach({
            val _coordinate = (it as HashMap<String, HashMap<String, Double>>)["coordinate"]!!
            val _intensity = (it as HashMap<String, Int>)["intensity"]!!
            val latLng = LatLng(_coordinate["latitude"]!!, _coordinate["longitude"]!!)
            (1.._intensity).forEach() {
                _coordinates.add(latLng)
            }
        })
        this.coordinates = _coordinates
    }

    override fun add(map: AMap) {
        overlay = map.addTileOverlay(TileOverlayOptions().tileProvider(
                HeatmapTileProvider.Builder()
                        .data(coordinates)
                        .gradient(Gradient(intArrayOf(Color.rgb(0, 0, 255), Color.rgb(0, 255, 0), Color.rgb(255, 0, 0)), floatArrayOf(0.2f, 0.5f, 0.9f)))
                        .radius(radius)
                        .transparency(opacity)
                        .build()))
    }

    override fun remove() {
        overlay?.remove()
    }
}