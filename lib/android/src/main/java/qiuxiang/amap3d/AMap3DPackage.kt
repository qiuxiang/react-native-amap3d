package qiuxiang.amap3d

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import qiuxiang.amap3d.map_view.*
import qiuxiang.amap3d.modules.SdkModule

class AMap3DPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(
      SdkModule(reactContext),
    )
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(
      MapViewManager(),
      MarkerManager(),
      PolylineManager(),
      PolygonManager(),
      CircleManager(),
      HeatMapManager(),
      MultiPointManager()
    )
  }
}
