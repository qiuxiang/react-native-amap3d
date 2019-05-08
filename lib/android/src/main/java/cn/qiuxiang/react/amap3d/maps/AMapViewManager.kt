package cn.qiuxiang.react.amap3d.maps

import android.view.View
import cn.qiuxiang.react.amap3d.toLatLng
import cn.qiuxiang.react.amap3d.toLatLngBounds
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.model.MyLocationStyle
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class AMapViewManager : ViewGroupManager<AMapView>() {
    companion object {
        const val ANIMATE_TO = 1
    }

    override fun getName(): String {
        return "AMapView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapView {
        return AMapView(reactContext)
    }

    override fun onDropViewInstance(view: AMapView) {
        super.onDropViewInstance(view)
        view.onDestroy()
    }

    override fun getCommandsMap(): Map<String, Int> {
        return mapOf("animateTo" to ANIMATE_TO)
    }

    override fun receiveCommand(overlay: AMapView, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            ANIMATE_TO -> overlay.animateTo(args)
        }
    }

    override fun addView(mapView: AMapView, child: View, index: Int) {
        mapView.add(child)
        super.addView(mapView, child, index)
    }

    override fun removeViewAt(parent: AMapView, index: Int) {
        parent.remove(parent.getChildAt(index))
        super.removeViewAt(parent, index)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return MapBuilder.of(
                "onPress", MapBuilder.of("registrationName", "onAMapPress"),
                "onLongPress", MapBuilder.of("registrationName", "onAMapLongPress"),
                "onAnimateCancel", MapBuilder.of("registrationName", "onAMapAnimateCancel"),
                "onAnimateFinish", MapBuilder.of("registrationName", "onAMapAnimateFinish"),
                "onStatusChange", MapBuilder.of("registrationName", "onAMapStatusChange")
        )
    }

    @ReactProp(name = "locationEnabled")
    fun setLocationEnabled(view: AMapView, enabled: Boolean) {
        view.setLocationEnabled(enabled)
    }

    @ReactProp(name = "indoorEnabled")
    fun setIndoorMapEnabled(view: AMapView, enabled: Boolean) {
        view.map.showIndoorMap(enabled)
    }

    @ReactProp(name = "indoorSwitchDisabled")
    fun setIndoorSwitchEnabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isIndoorSwitchEnabled = !disabled
    }

    @ReactProp(name = "buildingsDisabled")
    fun showBuildings(view: AMapView, disabled: Boolean) {
        view.map.showBuildings(!disabled)
    }

    @ReactProp(name = "labelsDisabled")
    fun showMapText(view: AMapView, disabled: Boolean) {
        view.map.showMapText(!disabled)
    }

    @ReactProp(name = "compassDisabled")
    fun setCompassEnabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isCompassEnabled = !disabled
    }

    @ReactProp(name = "zoomControlsDisabled")
    fun setZoomControlsEnabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isZoomControlsEnabled = !disabled
    }

    @ReactProp(name = "scaleBarDisabled")
    fun setScaleBarDisabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isScaleControlsEnabled = !disabled
    }

    @ReactProp(name = "trafficEnabled")
    fun setTrafficEnabled(view: AMapView, enabled: Boolean) {
        view.map.isTrafficEnabled = enabled
    }

    @ReactProp(name = "maxZoomLevel")
    fun setMaxZoomLevel(view: AMapView, zoomLevel: Float) {
        view.map.maxZoomLevel = zoomLevel
    }

    @ReactProp(name = "minZoomLevel")
    fun setMinZoomLevel(view: AMapView, zoomLevel: Float) {
        view.map.minZoomLevel = zoomLevel
    }

    @ReactProp(name = "zoomLevel")
    fun setZoomLevel(view: AMapView, zoomLevel: Float) {
        view.map.moveCamera(CameraUpdateFactory.zoomTo(zoomLevel))
    }

    @ReactProp(name = "mapType")
    fun setMapType(view: AMapView, mapType: Int) {
        view.map.mapType = mapType
    }

    @ReactProp(name = "zoomDisabled")
    fun setZoomGesturesEnabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isZoomGesturesEnabled = !disabled
    }

    @ReactProp(name = "scrollDisabled")
    fun setScrollGesturesEnabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isScrollGesturesEnabled = !disabled
    }

    @ReactProp(name = "rotateDisabled")
    fun setRotateGesturesEnabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isRotateGesturesEnabled = !disabled
    }

    @ReactProp(name = "tiltDisabled")
    fun setTiltGesturesEnabled(view: AMapView, disabled: Boolean) {
        view.map.uiSettings.isTiltGesturesEnabled = !disabled
    }

    @ReactProp(name = "center")
    fun setCenter(view: AMapView, center: ReadableMap) {
        view.map.moveCamera(CameraUpdateFactory.changeLatLng(center.toLatLng()))
    }

    @ReactProp(name = "region")
    fun setRegion(view: AMapView, region: ReadableMap) {
        view.map.moveCamera(CameraUpdateFactory.newLatLngBounds(region.toLatLngBounds(), 0))
    }

    @ReactProp(name = "limitRegion")
    fun setLimitRegion(view: AMapView, limitRegion: ReadableMap) {
        view.map.setMapStatusLimits(limitRegion.toLatLngBounds())
    }

    @ReactProp(name = "tilt")
    fun setTilt(view: AMapView, tilt: Float) {
        view.map.moveCamera(CameraUpdateFactory.changeTilt(tilt))
    }

    @ReactProp(name = "heading")
    fun setHeading(view: AMapView, heading: Float) {
        view.map.moveCamera(CameraUpdateFactory.changeBearing(heading))
    }

//    @ReactProp(name = "locationStyle")
//    fun setLocationStyle(view: AMapView, style: ReadableMap) {
//        view.setLocationStyle(style)
//    }
//
//    @ReactProp(name = "locationType")
//    fun setLocationStyle(view: AMapView, type: String) {
//        when (type) {
//            "show" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_SHOW)
//            "locate" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_LOCATE)
//            "follow" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_FOLLOW)
//            "map_rotate" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_MAP_ROTATE)
//            "location_rotate" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE)
//            "location_rotate_no_center" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER)
//            "follow_no_center" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_FOLLOW_NO_CENTER)
//            "map_rotate_no_center" -> view.setLocationType(MyLocationStyle.LOCATION_TYPE_MAP_ROTATE_NO_CENTER)
//        }
//    }
}
