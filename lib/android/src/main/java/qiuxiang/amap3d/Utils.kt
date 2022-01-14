package qiuxiang.amap3d

import android.content.res.Resources
import android.graphics.Bitmap
import android.graphics.Point
import android.location.Location
import android.view.View
import com.amap.api.maps.model.*
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.imagepipeline.common.ResizeOptions
import com.facebook.imagepipeline.request.BasePostprocessor
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.views.imagehelper.ImageSource

fun Float.toPx(): Int {
  return (this * Resources.getSystem().displayMetrics.density).toInt()
}

fun Int.toPx(): Int {
  return (this * Resources.getSystem().displayMetrics.density).toInt()
}

fun ReadableMap.toPoint(): Point {
  return Point(getDouble("x").toFloat().toPx(), getDouble("y").toFloat().toPx())
}

fun ReadableMap.toLatLng(): LatLng {
  return LatLng(getDouble("latitude"), getDouble("longitude"))
}

fun ReadableArray.toLatLngList(): List<LatLng> {
  return (0 until size()).map {
    // @todo 暂时兼容 0.63
    @Suppress("UNNECESSARY_NOT_NULL_ASSERTION")
    getMap(it)!!.toLatLng()
  }
}

fun LatLng.toJson(): WritableMap {
  return Arguments.createMap().apply {
    putDouble("latitude", latitude)
    putDouble("longitude", longitude)
  }
}

fun Poi.toJson(): WritableMap {
  return Arguments.createMap().apply {
    putMap("position", coordinate.toJson())
    putString("id", poiId)
    putString("name", name)
  }
}

fun CameraPosition.toJson(): WritableMap {
  return Arguments.createMap().apply {
    putMap("target", target.toJson())
    putDouble("zoom", zoom.toDouble())
    putDouble("tilt", tilt.toDouble())
    putDouble("bearing", bearing.toDouble())
  }
}

fun Location.toJson(): WritableMap {
  return Arguments.createMap().apply {
    putDouble("timestamp", time.toDouble())
    putMap("coords", Arguments.createMap().apply {
      putDouble("latitude", latitude)
      putDouble("longitude", longitude)
      putDouble("latitude", latitude)
      putDouble("accuracy", accuracy.toDouble())
      putDouble("heading", bearing.toDouble())
      putDouble("speed", speed.toDouble())
    })
  }
}

fun LatLngBounds.toJson(): WritableMap {
  return Arguments.createMap().apply {
    putMap("southwest", southwest.toJson())
    putMap("northeast", northeast.toJson())
  }
}

fun ReadableMap.getFloat(key: String): Float? {
  if (hasKey(key)) return getDouble(key).toFloat()
  return null
}

fun getEventTypeConstants(vararg list: String): Map<String, Any> {
  return list.associateWith { mapOf("phasedRegistrationNames" to mapOf("bubbled" to it)) }
}

fun View.fetchImage(source: ReadableMap, callback: (BitmapDescriptor) -> Unit) {
  val uri = ImageSource(context, source.getString("uri")).uri
  val request = ImageRequestBuilder.newBuilderWithSource(uri).let {
    it.postprocessor = object : BasePostprocessor() {
      override fun process(bitmap: Bitmap) {
        callback(BitmapDescriptorFactory.fromBitmap(bitmap))
      }
    }
    if (source.hasKey("width") && source.hasKey("height")) {
      it.resizeOptions = ResizeOptions.forDimensions(
        source.getInt("width").toPx(),
        source.getInt("height").toPx()
      )
    }
    it.build()
  }
  Fresco.getImagePipeline().fetchDecodedImage(request, this)
}