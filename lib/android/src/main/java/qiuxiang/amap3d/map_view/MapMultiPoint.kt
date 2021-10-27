package qiuxiang.amap3d.map_view

import android.content.Context
import android.graphics.Bitmap
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.facebook.drawee.backends.pipeline.Fresco.getImagePipeline
import com.facebook.imagepipeline.request.BasePostprocessor
import com.facebook.imagepipeline.request.ImageRequestBuilder.newBuilderWithSource
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.views.imagehelper.ImageSource
import com.facebook.react.views.view.ReactViewGroup
import qiuxiang.amap3d.toLatLng

class MapMultiPoint(context: Context) : ReactViewGroup(context), MapOverlay {
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
        MultiPointItem(points.getMap(item).toLatLng()).apply { customerId = "${id}_$item" }
      }
    overlay?.items = items
  }

  fun setImage(source: ReadableMap) {
    val uri = ImageSource(context, source.getString("uri")).uri
    val request = newBuilderWithSource(uri).let {
      it.postprocessor = object : BasePostprocessor() {
        override fun process(bitmap: Bitmap) {
          icon = BitmapDescriptorFactory.fromBitmap(bitmap)
          addToMap()
        }
      }
      it.build()
    }
    getImagePipeline().fetchDecodedImage(request, this)
  }
}
