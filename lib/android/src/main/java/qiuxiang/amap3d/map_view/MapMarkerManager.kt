package qiuxiang.amap3d.map_view

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
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
    when (view) {
      is MapInfoWindow -> marker.infoWindow = view
      else -> super.addView(marker, view, index)
    }
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
    return MapBuilder.of(
      "onPress", MapBuilder.of("registrationName", "onAMapPress"),
      "onDragStart", MapBuilder.of("registrationName", "onAMapDragStart"),
      "onDrag", MapBuilder.of("registrationName", "onAMapDrag"),
      "onDragEnd", MapBuilder.of("registrationName", "onAMapDragEnd"),
      "onInfoWindowPress", MapBuilder.of("registrationName", "onAMapInfoWindowPress")
    )
  }

  companion object {
    const val UPDATE = 1
    const val ACTIVE = 2
    const val LOCK_TO_SCREEN = 3
  }

  override fun getCommandsMap(): Map<String, Int> {
    return mapOf(
      "update" to UPDATE,
      "active" to ACTIVE,
      "lockToScreen" to LOCK_TO_SCREEN
    )
  }

  override fun receiveCommand(marker: MapMarker, commandId: Int, args: ReadableArray?) {
    when (commandId) {
      UPDATE -> marker.updateIcon()
      ACTIVE -> marker.active = true
      LOCK_TO_SCREEN -> marker.lockToScreen(args)
    }
  }

  @ReactProp(name = "title")
  fun setTitle(marker: MapMarker, title: String) {
    marker.title = title
  }

  @ReactProp(name = "description")
  fun setSnippet(marker: MapMarker, description: String) {
    marker.snippet = description
  }

  @ReactProp(name = "coordinate")
  fun setCoordinate(view: MapMarker, coordinate: ReadableMap) {
    view.position = coordinate.toLatLng()
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

  @ReactProp(name = "clickDisabled")
  fun setClickDisabled(marker: MapMarker, disabled: Boolean) {
    marker.clickDisabled = disabled
  }

  @ReactProp(name = "infoWindowDisabled")
  fun setInfoWindowDisabled(marker: MapMarker, disabled: Boolean) {
    marker.infoWindowDisabled = disabled
  }

  @ReactProp(name = "active")
  fun setSelected(marker: MapMarker, active: Boolean) {
    marker.active = active
  }

  @ReactProp(name = "color")
  fun setIcon(marker: MapMarker, icon: String) {
    marker.setIconColor(icon)
  }

  @ReactProp(name = "image")
  fun setImage(marker: MapMarker, image: String) {
    marker.setImage(image)
  }

  @ReactProp(name = "zIndex")
  fun setZIndez(marker: MapMarker, zIndex: Float) {
    marker.zIndex = zIndex
  }

  @ReactProp(name = "anchor")
  fun setAnchor(view: MapMarker, coordinate: ReadableMap) {
    view.setAnchor(coordinate.getDouble("x"), coordinate.getDouble("y"))
  }
}
