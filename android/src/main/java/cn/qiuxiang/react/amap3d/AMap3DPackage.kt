package cn.qiuxiang.react.amap3d

import cn.qiuxiang.react.amap3d.maps.*
import cn.qiuxiang.react.amap3d.navigation.AMapDriveManager
import cn.qiuxiang.react.amap3d.navigation.AMapRideManager
import cn.qiuxiang.react.amap3d.navigation.AMapWalkManager
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class AMap3DPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
                AMapUtilsModule(reactContext),
                AMapOfflineModule(reactContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
                AMapViewManager(),
                AMapMarkerManager(),
                AMapInfoWindowManager(),
                AMapPolylineManager(),
                AMapPolygonManager(),
                AMapCircleManager(),
                AMapHeatMapManager(),
                AMapMultiPointManager(),
                AMapDriveManager(),
                AMapWalkManager(),
                AMapRideManager()
        )
    }
}
