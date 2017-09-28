package cn.qiuxiang.react.amap3d.modules

import com.amap.api.trace.LBSTraceClient
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule


@Suppress("unused")
class AMapTraceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val traceClient = LBSTraceClient.getInstance(reactContext)
    private val eventEmitter by lazy { reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java) }

    override fun getName(): String {
        return "AMapTrace"
    }

    @ReactMethod
    fun start() {
        traceClient.stopTrace()
        traceClient.startTrace { _, list, message ->
            val data = Arguments.createMap()
            val locations = Arguments.createArray()
            list?.forEach {
                val coordinate = Arguments.createMap()
                coordinate.putDouble("latitude", it.latitude)
                coordinate.putDouble("longitude", it.longitude)
                locations.pushMap(coordinate)
            }
            data.putArray("locations", locations)
            data.putString("message", message)
            eventEmitter.emit("onTrace", data)
        }
    }
}