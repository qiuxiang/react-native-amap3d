package qiuxiang.amap3d

import android.content.res.Resources
import com.amap.api.maps.model.CameraPosition
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.LatLngBounds
import com.amap.api.maps.model.Poi
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

fun Float.toPx(): Int {
  return (this * Resources.getSystem().displayMetrics.density).toInt()
}

fun ReadableMap.toLatLng(): LatLng {
  return LatLng(getDouble("latitude"), getDouble("longitude"))
}

fun ReadableArray.toLatLngList(): List<LatLng> {
  return (0 until size()).map { getMap(it).toLatLng() }
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

fun LatLngBounds.toJson(): WritableMap {
  return Arguments.createMap().apply {
    putMap("southwest", southwest.toJson())
    putMap("northeast", northeast.toJson())
  }
}

fun ReadableMap.toLatLngBounds(): LatLngBounds {
  return LatLngBounds(getMap("southwest")?.toLatLng(), getMap("northeast")?.toLatLng())
}

fun ReadableMap.getFloat(key: String): Float? {
  if (hasKey(key)) return getDouble(key).toFloat()
  return null
}

fun getEventTypeConstants(vararg list: String): Map<String, Any> {
  return list.map { it to mapOf("phasedRegistrationNames" to mapOf("bubbled" to it)) }.toMap()
}