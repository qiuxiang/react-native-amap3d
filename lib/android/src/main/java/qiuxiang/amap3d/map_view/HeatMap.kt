package qiuxiang.amap3d.map_view

import android.content.Context
import com.amap.api.maps.AMap
import com.amap.api.maps.model.HeatmapTileProvider
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.TileOverlay
import com.amap.api.maps.model.TileOverlayOptions
import com.facebook.react.views.view.ReactViewGroup

class HeatMap(context: Context) : ReactViewGroup(context), Overlay {
  private var overlay: TileOverlay? = null
  var data: List<LatLng> = emptyList()
  var opacity: Double = 0.6
  var radius: Int = 12

  override fun add(map: AMap) {
    overlay = map.addTileOverlay(
      TileOverlayOptions().tileProvider(
        HeatmapTileProvider.Builder()
          .data(data)
          .radius(radius)
          .transparency(opacity)
          .build()
      )
    )
  }

  override fun remove() {
    overlay?.remove()
  }
}