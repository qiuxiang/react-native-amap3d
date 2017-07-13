package cn.qiuxiang.react.amap3d

import com.amap.api.maps.AMapUtils
import com.amap.api.maps.model.LatLng
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

@Suppress("unused")
class AMapUtilsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AMapUtils"
    }

    @ReactMethod
    fun distance(lat1: Double, lng1: Double, lat2: Double, lng2: Double, promise: Promise) {
        promise.resolve(AMapUtils.calculateLineDistance(LatLng(lat1, lng1), LatLng(lat2, lng2)))
    }
}