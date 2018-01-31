package cn.qiuxiang.react.amap3d.navigation

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager

abstract class AMapNavigationManager<T : AMapNavigation> : SimpleViewManager<T>() {
    override fun onDropViewInstance(view: T) {
        super.onDropViewInstance(view)
        view.stop()
        view.onDestroy()
    }

    companion object {
        val START = 1
        val CALCULATE_ROUTE = 2
    }

    override fun getCommandsMap(): Map<String, Int> {
        return mapOf(
                "start" to START,
                "calculateRoute" to CALCULATE_ROUTE
        )
    }

    override fun receiveCommand(view: T, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            START -> view.start()
            CALCULATE_ROUTE -> view.calculateRoute(args)
        }
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return MapBuilder.of(
                "onCalculateRouteSuccess", MapBuilder.of("registrationName", "onCalculateRouteSuccess"),
                "onCalculateRouteFailure", MapBuilder.of("registrationName", "onCalculateRouteFailure")
        )
    }
}
