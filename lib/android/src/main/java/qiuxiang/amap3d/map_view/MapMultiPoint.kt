package qiuxiang.amap3d.map_view

import android.content.Context
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import qiuxiang.amap3d.toLatLng

class MapMultiPoint(context: Context) : ReactViewGroup(context), MapOverlay {
  private var overlay: MultiPointOverlay? = null
  private var items: List<MultiPointItem> = emptyList()
  private var icon: BitmapDescriptor? = null

  override fun add(map: AMap) {
    overlay = map.addMultiPointOverlay(MultiPointOverlayOptions().icon(icon))
    overlay?.items = items
  }

  override fun remove() {
    overlay?.destroy()
  }

  fun setPoints(points: ReadableArray) {
    items = (0 until points.size())
      .map { item ->
        MultiPointItem(points.getMap(item).toLatLng()).apply { customerId = "${id}_$item" }
      }
    overlay?.items = items
  }

  fun setImage(image: String) {
    val drawable = context.resources.getIdentifier(image, "drawable", context.packageName)
    icon = BitmapDescriptorFactory.fromResource(drawable)
  }
}
