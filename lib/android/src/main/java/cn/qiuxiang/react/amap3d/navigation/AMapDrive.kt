package cn.qiuxiang.react.amap3d.navigation

import android.annotation.SuppressLint
import com.amap.api.navi.enums.PathPlanningStrategy
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext

@SuppressLint("ViewConstructor")
class AMapDrive(context: ThemedReactContext) : AMapNavigation(context) {
    override fun calculateRoute(args: ReadableArray?) {
        val points = args?.getArray(2)!!
        navigation.calculateDriveRoute(
                listOf(latLngFromReadableMap(args.getMap(0))),
                listOf(latLngFromReadableMap(args.getMap(1))),
                (0 until points.size()).map { latLngFromReadableMap(points.getMap(it)) },
                PathPlanningStrategy.DRIVING_DEFAULT
        )
    }
}
