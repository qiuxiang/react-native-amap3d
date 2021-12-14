package qiuxiang.amap3d.map_view

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.os.Handler
import android.os.Looper
import android.view.View
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.amap.api.maps.model.Marker
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.views.view.ReactViewGroup
import qiuxiang.amap3d.fetchImage

class Marker(context: Context) : ReactViewGroup(context), Overlay {
  private var view: View? = null
  private var icon: BitmapDescriptor? = null
  private var anchorX: Float = 0.5f
  private var anchorY: Float = 1f
  var marker: Marker? = null

  var position: LatLng? = null
    set(value) {
      field = value
      marker?.position = value
    }

  var zIndex: Float = 0.0f
    set(value) {
      field = value
      marker?.zIndex = value
    }

  var flat: Boolean = false
    set(value) {
      field = value
      marker?.isFlat = value
    }

  var opacity: Float = 1f
    set(value) {
      field = value
      marker?.alpha = value
    }

  var draggable: Boolean = false
    set(value) {
      field = value
      marker?.isDraggable = value
    }

  fun updateIcon() {
    view?.let {
      if (it.width != 0 && it.height != 0) {
        val bitmap = Bitmap.createBitmap(it.width, it.height, Bitmap.Config.ARGB_8888)
        it.draw(Canvas(bitmap))
        icon = BitmapDescriptorFactory.fromBitmap(bitmap)
        marker?.setIcon(icon)
      }
    }
  }

  fun setAnchor(x: Double, y: Double) {
    anchorX = x.toFloat()
    anchorY = y.toFloat()
    marker?.setAnchor(anchorX, anchorY)
  }

  override fun addView(child: View, index: Int) {
    super.addView(child, index)
    view = child
    view?.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> updateIcon() }
  }

  fun setIcon(source: ReadableMap) {
    fetchImage(source) {
      icon = it
      Handler(Looper.getMainLooper()).post {
        marker?.setIcon(it)
      }
    }
  }

  override fun add(map: AMap) {
    marker = map.addMarker(
      MarkerOptions()
        .setFlat(flat)
        .icon(icon)
        .alpha(opacity)
        .draggable(draggable)
        .position(position)
        .anchor(anchorX, anchorY)
        .zIndex(zIndex)
        .infoWindowEnable(false)
    )
  }

  override fun remove() {
    marker?.destroy()
  }
}
