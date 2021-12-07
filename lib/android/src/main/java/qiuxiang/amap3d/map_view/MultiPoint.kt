package qiuxiang.amap3d.map_view

import android.content.Context
import com.amap.api.maps.AMap
import com.amap.api.maps.model.BitmapDescriptor
import com.amap.api.maps.model.MultiPointItem
import com.amap.api.maps.model.MultiPointOverlay
import com.amap.api.maps.model.MultiPointOverlayOptions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.views.view.ReactViewGroup
import qiuxiang.amap3d.fetchImage
import qiuxiang.amap3d.toLatLng

class MultiPoint(context: Context) : ReactViewGroup(context), Overlay {
  private lateinit var map: AMap
  private var overlay: MultiPointOverlay? = null
  private var items: List<MultiPointItem> = emptyList()
  private var icon: BitmapDescriptor? = null

  override fun add(map: AMap) {
    this.map = map
    addToMap()
  }

  override fun remove() {
    overlay?.destroy()
  }

  private fun addToMap() {
    if (overlay != null) return
    if (icon != null) {
      overlay = map.addMultiPointOverlay(MultiPointOverlayOptions().icon(icon))
      overlay?.items = items
    }
  }

  fun setItems(points: ReadableArray) {
    items = (0 until points.size())
      .map { item ->
        // 兼容 0.63
        MultiPointItem(points.getMap(item)!!.toLatLng()).apply { customerId = "${id}_$item" }
      }
    overlay?.items = items
  }

  fun setIcon(source: ReadableMap) {
    fetchImage(source) {
      icon = it
      addToMap()
    }
  }
}
