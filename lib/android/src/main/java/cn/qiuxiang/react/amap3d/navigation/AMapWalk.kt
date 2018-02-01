package cn.qiuxiang.react.amap3d.navigation

import android.annotation.SuppressLint
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext

@SuppressLint("ViewConstructor")
class AMapWalk(context: ThemedReactContext) : AMapNavigation(context) {
    override fun calculateRoute(args: ReadableArray?) {
        navigation.calculateWalkRoute(
                latLngFromReadableMap(args?.getMap(0)!!),
                latLngFromReadableMap(args.getMap(1))
        )
    }
}