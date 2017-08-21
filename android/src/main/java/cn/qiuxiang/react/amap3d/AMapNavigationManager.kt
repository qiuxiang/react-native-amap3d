package cn.qiuxiang.react.amap3d

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class AMapNavigationManager : ViewGroupManager<AMapNavigation>() {
    override fun getName(): String {
        return "AMapNavigation"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapNavigation {
        return AMapNavigation(reactContext)
    }

    override fun onDropViewInstance(view: AMapNavigation) {
        super.onDropViewInstance(view)
        view.onDestroy()
    }

    companion object {
        val START = 1
        val CALCULATE_WALK_ROUTE = 2
        val CALCULATE_RIDE_ROUTE = 3
        val CALCULATE_DRIVE_ROUTE = 4
    }

    override fun getCommandsMap(): Map<String, Int> {
        return mapOf(
                "start" to START,
                "calculateWalkRoute" to CALCULATE_WALK_ROUTE,
                "calculateRideRoute" to CALCULATE_RIDE_ROUTE,
                "calculateDriveRoute" to CALCULATE_DRIVE_ROUTE
        )
    }

    override fun receiveCommand(view: AMapNavigation, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            START -> view.start()
            CALCULATE_WALK_ROUTE -> view.calculateWalkRoute(args)
            CALCULATE_RIDE_ROUTE -> view.calculateRideRoute(args)
            CALCULATE_DRIVE_ROUTE -> view.calculateDriveRoute(args)
        }
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
                "onCalculateRouteSuccess" to mapOf("registrationName" to "onCalculateRouteSuccess"),
                "onCalculateRouteFailure" to mapOf("registrationName" to "onCalculateRouteFailure")
        )
    }
}
