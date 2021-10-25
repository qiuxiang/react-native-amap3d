package qiuxiang.amap3d.map_view

import android.content.Context
import android.graphics.Color
import com.amap.api.maps.AMap
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Polygon
import com.amap.api.maps.model.PolygonOptions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import qiuxiang.amap3d.toLatLngList

class MapPolygon(context: Context) : ReactViewGroup(context), MapOverlay {
  private var polygon: Polygon? = null
  private var coordinates: ArrayList<LatLng> = ArrayList()

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

  fun setCoordinates(coordinates: ReadableArray) {
    this.coordinates = coordinates.toLatLngList()
    polygon?.points = this.coordinates
  }

  override fun add(map: AMap) {
    polygon = map.addPolygon(
      PolygonOptions()
        .addAll(coordinates)
        .strokeColor(strokeColor)
        .strokeWidth(strokeWidth)
        .fillColor(fillColor)
        .zIndex(zIndex)
    )
  }

  override fun remove() {
    polygon?.remove()
  }
}
