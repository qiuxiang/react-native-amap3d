package cn.qiuxiang.react.amap3d

import android.content.res.Resources
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.LatLngBounds
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import kotlin.math.abs

fun Float.toPx(): Int {
    return (this * Resources.getSystem().displayMetrics.density).toInt()
}

fun ReadableMap.toLatLng(): LatLng {
    return LatLng(getDouble("latitude"), getDouble("longitude"))
}

fun ReadableArray.toLatLngList(): ArrayList<LatLng> {
    return ArrayList((0 until size()).map { getMap(it)!!.toLatLng() })
}

fun LatLng.toWritableMap(): WritableMap {
    val map = Arguments.createMap()
    map.putDouble("latitude", latitude)
    map.putDouble("longitude", longitude)
    return map
}

fun LatLngBounds.toWritableMap(): WritableMap {
    val map = Arguments.createMap()
    map.putDouble("latitude", abs((southwest.latitude + northeast.latitude) / 2))
    map.putDouble("longitude", abs((southwest.longitude + northeast.longitude) / 2))
    map.putDouble("latitudeDelta", abs(southwest.latitude - northeast.latitude))
    map.putDouble("longitudeDelta", abs(southwest.longitude - northeast.longitude))
    return map
}

fun ReadableMap.toLatLngBounds(): LatLngBounds {
    val latitude = getDouble("latitude")
    val longitude = getDouble("longitude")
    val latitudeDelta = getDouble("latitudeDelta")
    val longitudeDelta = getDouble("longitudeDelta")
    return LatLngBounds(
            LatLng(latitude - latitudeDelta / 2, longitude - longitudeDelta / 2),
            LatLng(latitude + latitudeDelta / 2, longitude + longitudeDelta / 2)
    )
}