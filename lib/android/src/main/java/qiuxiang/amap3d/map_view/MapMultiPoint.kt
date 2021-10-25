package qiuxiang.amap3d.map_view

import android.content.Context
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import qiuxiang.amap3d.toLatLng

class MapMultiPoint(context: Context) : ReactViewGroup(context), MapOverlay {
  private var overlay: MultiPointOverlay? = null
  private var items: ArrayList<MultiPointItem> = ArrayList()
  private var icon: BitmapDescriptor? = null

  fun setPoints(points: ReadableArray) {
    items = ArrayList((0 until points.size())
      .map {
        val data = points.getMap(it)
        val item = MultiPointItem(data!!.toLatLng())
        if (data.hasKey("title")) {
          item.title = data.getString("title")
        }
        if (data.hasKey("subtitle")) {
          item.snippet = data.getString("subtitle")
        }
        item.customerId = id.toString() + "_" + it
        item
      })
    overlay?.setItems(items)
  }

  override fun add(map: AMap) {
    overlay = map.addMultiPointOverlay(MultiPointOverlayOptions().icon(icon))
    overlay?.setItems(items)
    overlay?.setEnable(true)
  }

  override fun remove() {
    overlay?.destroy()
  }

  fun setImage(image: String) {
    val drawable = context.resources.getIdentifier(image, "drawable", context.packageName)
    icon = BitmapDescriptorFactory.fromResource(drawable)
  }
}