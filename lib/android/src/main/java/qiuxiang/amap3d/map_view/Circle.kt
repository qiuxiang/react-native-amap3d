package qiuxiang.amap3d.map_view

import android.content.Context
import android.graphics.Color
import com.amap.api.maps.AMap
import com.amap.api.maps.model.Circle
import com.amap.api.maps.model.CircleOptions
import com.amap.api.maps.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class Circle(context: Context) : ReactViewGroup(context), Overlay {
  private var circle: Circle? = null

  var center: LatLng? = null
    set(value) {
      field = value
      circle?.center = value
    }

  var radius: Double = 0.0
    set(value) {
      field = value
      circle?.radius = value
    }

  var strokeWidth: Float = 1f
    set(value) {
      field = value
      circle?.strokeWidth = value
    }

  var strokeColor: Int = Color.BLACK
    set(value) {
      field = value
      circle?.strokeColor = value
    }

  var fillColor: Int = Color.BLACK
    set(value) {
      field = value
      circle?.fillColor = value
    }

  var zIndex: Float = 0f
    set(value) {
      field = value
      circle?.zIndex = value
    }

  override fun add(map: AMap) {
    circle = map.addCircle(
      CircleOptions()
        .center(center)
        .radius(radius)
        .strokeColor(strokeColor)
        .strokeWidth(strokeWidth)
        .fillColor(fillColor)
        .zIndex(zIndex)
    )
  }

  override fun remove() {
    circle?.remove()
  }
}
