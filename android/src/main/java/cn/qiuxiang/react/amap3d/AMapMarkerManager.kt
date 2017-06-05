package cn.qiuxiang.react.amap3d

import android.view.View
import com.amap.api.maps.model.LatLng
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

internal class AMapMarkerManager : ViewGroupManager<AMapMarker>() {
    override fun getName(): String {
        return "AMapMarker"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapMarker {
        return AMapMarker(reactContext)
    }

    override fun addView(marker: AMapMarker, view: View, index: Int) {
        when (view) {
            is AMapInfoWindow -> marker.infoWindow = view
            is AMapOverlay -> marker.setIconView(view)
        }
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
        return mapOf(
                "onMarkerClick" to mapOf("registrationName" to "onMarkerClick"),
                "onMarkerDragStart" to mapOf("registrationName" to "onMarkerDragStart"),
                "onMarkerDrag" to mapOf("registrationName" to "onMarkerDrag"),
                "onMarkerDragEnd" to mapOf("registrationName" to "onMarkerDragEnd"),
                "onInfoWindowClick" to mapOf("registrationName" to "onInfoWindowClick"))
    }

    @ReactProp(name = "title")
    fun setTitle(marker: AMapMarker, title: String) {
        marker.title = title
    }

    @ReactProp(name = "description")
    fun setSnippet(marker: AMapMarker, description: String) {
        marker.snippet = description
    }

    @ReactProp(name = "coordinate")
    fun setCoordinate(view: AMapMarker, coordinate: ReadableMap) {
        view.position = LatLng(
                coordinate.getDouble("latitude"),
                coordinate.getDouble("longitude"))
    }

    @ReactProp(name = "flat")
    fun setFlat(marker: AMapMarker, flat: Boolean) {
        marker.flat = flat
    }

    @ReactProp(name = "opacity")
    override fun setOpacity(marker: AMapMarker, opacity: Float) {
        marker.opacity = opacity
    }

    @ReactProp(name = "draggable")
    fun setDraggable(marker: AMapMarker, draggable: Boolean) {
        marker.draggable = draggable
    }

    @ReactProp(name = "selected")
    fun setSelected(marker: AMapMarker, active: Boolean) {
        marker.active = active
    }

    @ReactProp(name = "icon")
    fun setIcon(marker: AMapMarker, icon: String) {
        marker.setIcon(icon)
    }

    @ReactProp(name = "showsInfoWindow")
    fun setEnabledInfoWindow(marker: AMapMarker, enabled: Boolean) {
        marker.infoWindowEnabled = enabled
    }
}
