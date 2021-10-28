package qiuxiang.amap3d.map_view

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.getEventTypeConstants
import qiuxiang.amap3d.toLatLng

@Suppress("unused")
internal class MapMarkerManager : ViewGroupManager<MapMarker>() {
  override fun getName(): String {
    return "AMapMarker"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapMarker {
    return MapMarker(reactContext)
  }

  override fun addView(marker: MapMarker, view: View, index: Int) {
    super.addView(marker, view, index)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants("onPress", "onDrag", "onDragStart", "onDragEnd")
  }

  companion object {
    const val update = 1
  }

  override fun getCommandsMap(): Map<String, Int> {
    return mapOf("update" to update)
  }

  override fun receiveCommand(marker: MapMarker, commandId: Int, args: ReadableArray?) {
    when (commandId) {
      update -> marker.updateIcon()
    }
  }

  @ReactProp(name = "latLng")
  fun setLatLng(view: MapMarker, position: ReadableMap) {
    view.position = position.toLatLng()
  }

  @ReactProp(name = "flat")
  fun setFlat(marker: MapMarker, flat: Boolean) {
    marker.flat = flat
  }

  @ReactProp(name = "opacity")
  override fun setOpacity(marker: MapMarker, opacity: Float) {
    marker.opacity = opacity
  }

  @ReactProp(name = "draggable")
  fun setDraggable(marker: MapMarker, draggable: Boolean) {
    marker.draggable = draggable
  }

  @ReactProp(name = "zIndex")
  fun setIndex(marker: MapMarker, zIndex: Float) {
    marker.zIndex = zIndex
  }

  @ReactProp(name = "anchor")
  fun setAnchor(view: MapMarker, anchor: ReadableMap) {
    view.setAnchor(anchor.getDouble("x"), anchor.getDouble("y"))
  }

  @ReactProp(name = "icon")
  fun setIcon(view: MapMarker, icon: ReadableMap?) {
    icon?.let { view.setIcon(it) }
  }
}
