package cn.qiuxiang.react.amap3d.navigation

import android.annotation.SuppressLint
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext

@SuppressLint("ViewConstructor")
class AMapRide(context: ThemedReactContext) : AMapNavigation(context) {
    override fun calculateRoute(args: ReadableArray?) {
        navigation.calculateRideRoute(
                latLngFromReadableMap(args?.getMap(0)!!),
                latLngFromReadableMap(args.getMap(1))
        )
    }
}