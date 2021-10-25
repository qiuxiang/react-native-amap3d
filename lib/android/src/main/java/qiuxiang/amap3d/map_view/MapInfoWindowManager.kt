package qiuxiang.amap3d.map_view

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class MapInfoWindowManager : ViewGroupManager<MapInfoWindow>() {
  override fun getName(): String {
    return "AMapInfoWindow"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapInfoWindow {
    return MapInfoWindow(reactContext)
  }
}