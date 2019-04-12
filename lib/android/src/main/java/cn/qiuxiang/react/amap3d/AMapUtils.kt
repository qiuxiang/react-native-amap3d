package cn.qiuxiang.react.amap3d

import android.content.res.Resources
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.LatLngBounds
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

fun Float.toPx(): Int {
    return (this * Resources.getSystem().displayMetrics.density).toInt()
}

fun ReadableMap.toLatLng(): LatLng {
    return LatLng(this.getDouble("latitude"), this.getDouble("longitude"))
}

fun ReadableArray.toLatLngList(): ArrayList<LatLng> {
    return ArrayList((0..(this.size() - 1)).map { this.getMap(it)!!.toLatLng() })
}

fun LatLng.toWritableMap(): WritableMap {
    val map = Arguments.createMap()
    map.putDouble("latitude", this.latitude)
    map.putDouble("longitude", this.longitude)
    return map
}

fun ReadableMap.toLatLngBounds(): LatLngBounds {
    val latitude = this.getDouble("latitude")
    val longitude = this.getDouble("longitude")
    val latitudeDelta = this.getDouble("latitudeDelta")
    val longitudeDelta = this.getDouble("longitudeDelta")
    return LatLngBounds(
            LatLng(latitude - latitudeDelta / 2, longitude - longitudeDelta / 2),
            LatLng(latitude + latitudeDelta / 2, longitude + longitudeDelta / 2)
    )
}