package qiuxiang.amap3d.map_view

import android.view.View
import qiuxiang.amap3d.toLatLng
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.model.MyLocationStyle
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class MapViewManager : ViewGroupManager<MapView>() {
  companion object {
    const val SET_STATUS = 1
  }

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
    return mapOf("setStatus" to SET_STATUS)
  }

  override fun receiveCommand(overlay: MapView, commandId: Int, args: ReadableArray?) {
    when (commandId) {
      SET_STATUS -> overlay.animateTo(args)
    }
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
    return listOf(
      "onLoad",
      "onClick",
      "onLongClick",
      "onLocation",
      "onAnimateCancel",
      "onAnimateFinish",
      "onStatusChange",
      "onStatusChangeComplete",
    ).map { it to mapOf("phasedRegistrationNames" to mapOf("bubbled" to it)) }.toMap()
  }

  @ReactProp(name = "locationEnabled")
  fun setMyLocationEnabled(view: MapView, enabled: Boolean) {
    view.setLocationEnabled(enabled)
  }

  @ReactProp(name = "showsIndoorMap")
  fun showIndoorMap(view: MapView, show: Boolean) {
    view.map.showIndoorMap(show)
  }

  @ReactProp(name = "showsIndoorSwitch")
  fun setIndoorSwitchEnabled(view: MapView, show: Boolean) {
    view.map.uiSettings.isIndoorSwitchEnabled = show
  }

  @ReactProp(name = "showsBuildings")
  fun showBuildings(view: MapView, show: Boolean) {
    view.map.showBuildings(show)
  }

  @ReactProp(name = "showsLabels")
  fun showMapText(view: MapView, show: Boolean) {
    view.map.showMapText(show)
  }

  @ReactProp(name = "showsCompass")
  fun setCompassEnabled(view: MapView, show: Boolean) {
    view.map.uiSettings.isCompassEnabled = show
  }

  @ReactProp(name = "showsZoomControls")
  fun setZoomControlsEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isZoomControlsEnabled = enabled
  }

  @ReactProp(name = "showsScale")
  fun setScaleControlsEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isScaleControlsEnabled = enabled
  }

  @ReactProp(name = "mapLanguage")
  fun setLanguage(view: MapView, mapLanguage: Int) {
    view.map.setMapLanguage(
      if (mapLanguage == 1) {
        "en"
      } else {
        "zh_cn"
      }
    )
  }

  @ReactProp(name = "showsLocationButton")
  fun setMyLocationButtonEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isMyLocationButtonEnabled = enabled
  }

  @ReactProp(name = "showsTraffic")
  fun setTrafficEnabled(view: MapView, enabled: Boolean) {
    view.map.isTrafficEnabled = enabled
  }

  @ReactProp(name = "maxZoomLevel")
  fun setMaxZoomLevel(view: MapView, zoomLevel: Float) {
    view.map.maxZoomLevel = zoomLevel
  }

  @ReactProp(name = "minZoomLevel")
  fun setMinZoomLevel(view: MapView, zoomLevel: Float) {
    view.map.minZoomLevel = zoomLevel
  }

  @ReactProp(name = "zoomLevel")
  fun setZoomLevel(view: MapView, zoomLevel: Float) {
    view.map.moveCamera(CameraUpdateFactory.zoomTo(zoomLevel))
  }

  @ReactProp(name = "mapType")
  fun setMapType(view: MapView, mapType: Int) {
    view.map.mapType = mapType + 1
  }

  @ReactProp(name = "zoomEnabled")
  fun setZoomGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isZoomGesturesEnabled = enabled
  }

  @ReactProp(name = "scrollEnabled")
  fun setScrollGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isScrollGesturesEnabled = enabled
  }

  @ReactProp(name = "rotateEnabled")
  fun setRotateGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isRotateGesturesEnabled = enabled
  }

  @ReactProp(name = "tiltEnabled")
  fun setTiltGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isTiltGesturesEnabled = enabled
  }

  @ReactProp(name = "center")
  fun setCenter(view: MapView, center: ReadableMap) {
    view.map.moveCamera(CameraUpdateFactory.changeLatLng(center.toLatLng()))
  }

  @ReactProp(name = "region")
  fun setRegion(view: MapView, region: ReadableMap) {
    view.setRegion(region)
  }

  @ReactProp(name = "limitRegion")
  fun setLimitRegion(view: MapView, limitRegion: ReadableMap) {
    view.setLimitRegion(limitRegion)
  }

  @ReactProp(name = "tilt")
  fun changeTilt(view: MapView, tilt: Float) {
    view.map.moveCamera(CameraUpdateFactory.changeTilt(tilt))
  }

  @ReactProp(name = "rotation")
  fun changeRotation(view: MapView, rotation: Float) {
    view.map.moveCamera(CameraUpdateFactory.changeBearing(rotation))
  }

  @ReactProp(name = "locationInterval")
  fun setLocationInterval(view: MapView, interval: Int) {
    view.setLocationInterval(interval.toLong())
  }

  @ReactProp(name = "locationStyle")
  fun setLocationStyle(view: MapView, style: ReadableMap) {
    view.setLocationStyle(style)
  }

  @ReactProp(name = "locationType")
  fun setLocationStyle(view: MapView, type: String) {
    when (type) {
      "show" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_SHOW)
      "locate" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_LOCATE)
      "follow" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_FOLLOW)
      "map_rotate" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_MAP_ROTATE)
      "location_rotate" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE)
      "location_rotate_no_center" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER)
      "follow_no_center" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_FOLLOW_NO_CENTER)
      "map_rotate_no_center" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_MAP_ROTATE_NO_CENTER)
    }
  }
}
