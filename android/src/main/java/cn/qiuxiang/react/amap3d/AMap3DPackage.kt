package cn.qiuxiang.react.amap3d

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class AMap3DPackage : ReactPackage {
    override fun createJSModules(): List<Class<out JavaScriptModule>> {
        return emptyList()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return emptyList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
                AMapViewManager(),
                AMapMarkerManager(),
                AMapOverlayManager(),
                AMapInfoWindowManager(),
                AMapPolylineManager(),
                AMapPolygonManager(),
                AMapCircleManager())
    }
}
