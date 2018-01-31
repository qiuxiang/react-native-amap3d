package cn.qiuxiang.react.amap3d

import com.amap.api.maps.offlinemap.OfflineMapCity
import com.amap.api.maps.offlinemap.OfflineMapManager
import com.amap.api.maps.offlinemap.OfflineMapProvince
import com.amap.api.maps.offlinemap.OfflineMapStatus
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

@Suppress("unused")
class AMapOfflineModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), OfflineMapManager.OfflineMapDownloadListener {
    private val manager = OfflineMapManager(reactContext, this)

    override fun getName(): String {
        return "AMapOffline"
    }

    @ReactMethod
    fun getProvinces(promise: Promise) {
        val provinces = Arguments.createArray()
        manager.offlineMapProvinceList.forEach { provinces.pushMap(buildProvince(it)) }
        promise.resolve(provinces)
    }

    @ReactMethod
    fun getCities(promise: Promise) {
        val cities = Arguments.createArray()
        manager.offlineMapCityList.forEach { cities.pushMap(buildCity(it)) }
        promise.resolve(cities)
    }

    @ReactMethod
    fun download(name: String) {
        manager.offlineMapProvinceList.forEach {
            if (it.provinceName == name) {
                return manager.downloadByProvinceName(name)
            }
            it.cityList.forEach {
                if (it.city == name) {
                    return manager.downloadByCityName(name)
                }
            }
        }
    }

    @ReactMethod
    fun stop() {
        manager.stop()
    }

    @ReactMethod
    fun remove(name: String) {
        manager.remove(name)
    }

    private fun buildCity(city: OfflineMapCity): WritableMap {
        val map = Arguments.createMap()
        map.putString("name", city.city)
        map.putString("code", city.code)
        map.putString("state", getState(city.state))
        map.putInt("size", city.size.toInt())
        return map
    }

    private fun buildProvince(province: OfflineMapProvince): WritableMap {
        val map = Arguments.createMap()
        map.putString("name", province.provinceName)
        map.putString("state", getState(province.state))
        map.putInt("size", province.size.toInt())

        val cities = Arguments.createArray()
        province.cityList.forEach { cities.pushMap(buildCity(it)) }
        map.putArray("cities", cities)

        return map
    }

    private fun getState(code: Int): String {
        var state = ""
        when (code) {
            OfflineMapStatus.SUCCESS -> state = "downloaded"
            OfflineMapStatus.LOADING -> state = "downloading"
            OfflineMapStatus.NEW_VERSION -> state = "expired"
            OfflineMapStatus.WAITING -> state = "waiting"
            OfflineMapStatus.UNZIP -> state = "unzip"
        }
        return state
    }

    override fun onDownload(state: Int, progress: Int, name: String?) {
        val data = Arguments.createMap()
        data.putString("name", name)
        data.putString("state", getState(state))
        data.putInt("progress", progress)
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("download", data)
    }

    override fun onCheckUpdate(p0: Boolean, p1: String?) {}

    override fun onRemove(p0: Boolean, p1: String?, p2: String?) {}
}