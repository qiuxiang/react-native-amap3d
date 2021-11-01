package qiuxiang.amap3d.map_view

import android.content.Context
import android.graphics.Color
import com.amap.api.maps.AMap
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Polyline
import com.amap.api.maps.model.PolylineOptions
import com.facebook.react.views.view.ReactViewGroup

class Polyline(context: Context) : ReactViewGroup(context), Overlay {
  var polyline: Polyline? = null
  var gradient: Boolean = false
  var colors: List<Int> = emptyList()

  var points: List<LatLng> = emptyList()
    set(value) {
      field = value
      polyline?.points = value
    }

  var width: Float = 1f
    set(value) {
      field = value
      polyline?.width = value
    }

  var color: Int = Color.BLACK
    set(value) {
      field = value
      polyline?.color = value
    }

  var zIndex: Float = 0f
    set(value) {
      field = value
      polyline?.zIndex = value
    }

  var geodesic: Boolean = false
    set(value) {
      field = value
      polyline?.isGeodesic = value
    }

  var dashed: Boolean = false
    set(value) {
      field = value
      polyline?.isDottedLine = value
    }

  override fun add(map: AMap) {
    polyline = map.addPolyline(
      PolylineOptions()
        .addAll(points)
        .color(color)
        .colorValues(colors)
        .width(width)
        .useGradient(gradient)
        .geodesic(geodesic)
        .setDottedLine(dashed)
        .zIndex(zIndex)
    )
  }

  override fun remove() {
    polyline?.remove()
  }
}
