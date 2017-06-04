package cn.qiuxiang.react.amap3d

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewGroup

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
        val map = HashMap<String, Any>()
        map.put("onMarkerClick", MapBuilder.of("registrationName", "onMarkerClick"))
        map.put("onMarkerDragStart", MapBuilder.of("registrationName", "onMarkerDragStart"))
        map.put("onMarkerDrag", MapBuilder.of("registrationName", "onMarkerDrag"))
        map.put("onMarkerDragEnd", MapBuilder.of("registrationName", "onMarkerDragEnd"))
        map.put("onInfoWindowClick", MapBuilder.of("registrationName", "onInfoWindowClick"))
        return map
    }

    @ReactProp(name = "title")
    fun setTitle(marker: AMapMarker, title: String) {
        marker.setTitle(title)
    }

    @ReactProp(name = "description")
    fun setSnippet(marker: AMapMarker, description: String) {
        marker.setSnippet(description)
    }

    @ReactProp(name = "coordinate")
    fun setCoordinate(view: AMapMarker, coordinate: ReadableMap) {
        view.setCoordinate(coordinate)
    }

    @ReactProp(name = "flat")
    fun setFlat(marker: AMapMarker, flat: Boolean) {
        marker.setFlat(flat)
    }

    @ReactProp(name = "opacity")
    override fun setOpacity(marker: AMapMarker, opacity: Float) {
        marker.setOpacity(opacity)
    }

    @ReactProp(name = "draggable")
    fun setDraggable(marker: AMapMarker, draggable: Boolean) {
        marker.setDraggable(draggable)
    }

    @ReactProp(name = "selected")
    fun setSelected(marker: AMapMarker, selected: Boolean) {
        marker.setActive(selected)
    }

    @ReactProp(name = "icon")
    fun setIcon(marker: AMapMarker, icon: String) {
        marker.setIcon(icon)
    }

    @ReactProp(name = "showsInfoWindow")
    fun setEnabledInfoWindow(marker: AMapMarker, enabled: Boolean) {
        marker.setEnabledInfoWindow(enabled)
    }
}
