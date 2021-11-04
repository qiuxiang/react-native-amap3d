package qiuxiang.amap3d.map_view

import android.view.View
import com.amap.api.maps.CameraUpdateFactory
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.amap3d.getEventTypeConstants
import qiuxiang.amap3d.toLatLng

@Suppress("unused")
internal class MapViewManager : ViewGroupManager<MapView>() {
  private val commands = mapOf(
    "moveCamera" to { view: MapView, args: ReadableArray? -> view.moveCamera(args) },
    "call" to { view: MapView, args: ReadableArray? -> view.call(args) },
  )

  override fun getName(): String {
    return "AMapView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapView {
    return MapView(reactContext)
  }

  override fun onDropViewInstance(view: MapView) {
    super.onDropViewInstance(view)
    view.onDestroy()
  }

  override fun getCommandsMap(): Map<String, Int> {
    return commands.keys.mapIndexed { index, key -> key to index }.toMap()
  }

  override fun receiveCommand(view: MapView, command: Int, args: ReadableArray?) {
    commands.values.toList()[command](view, args)
  }

  override fun addView(mapView: MapView, child: View, index: Int) {
    mapView.add(child)
    super.addView(mapView, child, index)
  }

  override fun removeViewAt(parent: MapView, index: Int) {
    parent.remove(parent.getChildAt(index))
    super.removeViewAt(parent, index)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants(
      "onLoad",
      "onPress",
      "onPressPoi",
      "onLongPress",
      "onCameraMove",
      "onCameraIdle",
      "onLocation",
      "onCallback",
    )
  }

  @ReactProp(name = "initialCameraPosition")
  fun setInitialCameraPosition(view: MapView, position: ReadableMap) {
    view.setInitialCameraPosition(position)
  }

  @ReactProp(name = "myLocationEnabled")
  fun setMyLocationEnabled(view: MapView, enabled: Boolean) {
    view.map.isMyLocationEnabled = enabled
  }

  @ReactProp(name = "indoorViewEnabled")
  fun setIndoorViewEnabled(view: MapView, enabled: Boolean) {
    view.map.showIndoorMap(enabled)
  }

  @ReactProp(name = "buildingsEnabled")
  fun setBuildingsEnabled(view: MapView, enabled: Boolean) {
    view.map.showBuildings(enabled)
  }

  @ReactProp(name = "compassEnabled")
  fun setCompassEnabled(view: MapView, show: Boolean) {
    view.map.uiSettings.isCompassEnabled = show
  }

  @ReactProp(name = "zoomControlsEnabled")
  fun setZoomControlsEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isZoomControlsEnabled = enabled
  }

  @ReactProp(name = "scaleControlsEnabled")
  fun setScaleControlsEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isScaleControlsEnabled = enabled
  }

  @ReactProp(name = "language")
  fun setLanguage(view: MapView, language: String) {
    view.map.setMapLanguage(language)
  }

  @ReactProp(name = "myLocationButtonEnabled")
  fun setMyLocationButtonEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isMyLocationButtonEnabled = enabled
  }

  @ReactProp(name = "trafficEnabled")
  fun setTrafficEnabled(view: MapView, enabled: Boolean) {
    view.map.isTrafficEnabled = enabled
  }

  @ReactProp(name = "maxZoom")
  fun setMaxZoom(view: MapView, zoomLevel: Float) {
    view.map.maxZoomLevel = zoomLevel
  }

  @ReactProp(name = "minZoom")
  fun setMinZoom(view: MapView, zoomLevel: Float) {
    view.map.minZoomLevel = zoomLevel
  }

  @ReactProp(name = "mapType")
  fun setMapType(view: MapView, mapType: Int) {
    view.map.mapType = mapType + 1
  }

  @ReactProp(name = "zoomGesturesEnabled")
  fun setZoomGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isZoomGesturesEnabled = enabled
  }

  @ReactProp(name = "scrollGesturesEnabled")
  fun setScrollGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isScrollGesturesEnabled = enabled
  }

  @ReactProp(name = "rotateGesturesEnabled")
  fun setRotateGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isRotateGesturesEnabled = enabled
  }

  @ReactProp(name = "tiltGesturesEnabled")
  fun setTiltGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isTiltGesturesEnabled = enabled
  }

  @ReactProp(name = "cameraPosition")
  fun setCameraPosition(view: MapView, center: ReadableMap) {
    view.map.moveCamera(CameraUpdateFactory.changeLatLng(center.toLatLng()))
  }
}
