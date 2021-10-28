package qiuxiang.amap3d.modules

import com.amap.api.maps.MapsInitializer
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

@Suppress("unused")
class SdkModule : ReactContextBaseJavaModule() {
  override fun getName(): String {
    return "AMapSdk"
  }

  @ReactMethod
  fun setApiKey(apiKey: String?) {
    apiKey?.let { MapsInitializer.setApiKey(it) }
  }

  @ReactMethod
  fun getVersion(promise: Promise) {
    promise.resolve(MapsInitializer.getVersion())
  }
}