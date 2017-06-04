package cn.qiuxiang.react.amap3d

import android.graphics.Bitmap
import android.graphics.Canvas
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.views.view.ReactViewGroup

class AMapMarker(context: ThemedReactContext) : ReactViewGroup(context) {
    var infoWindow: ReactViewGroup? = null
    private var marker: Marker? = null
    private var position: LatLng? = null
    private var title = ""
    private var snippet = ""
    private var flat: Boolean = false
    private var opacity: Float = 1f
    private var draggable: Boolean = false
    private var active: Boolean = false
    private var infoWindowEnabled: Boolean = true
    private var bitmapDescriptor: BitmapDescriptor? = null
    private val eventEmitter: RCTEventEmitter = context.getJSModule(RCTEventEmitter::class.java)

    fun addToMap(map: AMap) {
        marker = map.addMarker(markerOptions)
        if (active) {
            marker?.showInfoWindow()
        } else {
            marker?.hideInfoWindow()
        }
    }

    val markerId: String?
        get() = marker?.id

    private val markerOptions: MarkerOptions
        get() = MarkerOptions()
                .setFlat(flat)
                .icon(bitmapDescriptor)
                .alpha(opacity)
                .draggable(draggable)
                .position(position)
                .title(title)
                .infoWindowEnable(infoWindowEnabled)
                .snippet(snippet)

    fun setTitle(title: String) {
        this.title = title
        marker?.title = title
    }

    fun setSnippet(snippet: String) {
        this.snippet = snippet
        marker?.snippet = snippet
    }

    fun setCoordinate(coordinate: ReadableMap) {
        position = LatLng(coordinate.getDouble("latitude"), coordinate.getDouble("longitude"))
        marker?.position = position
    }

    fun setFlat(flat: Boolean) {
        this.flat = flat
        marker?.isFlat = flat
    }

    fun setOpacity(opacity: Float) {
        this.opacity = opacity
        marker?.alpha = opacity
    }

    fun setDraggable(draggable: Boolean) {
        this.draggable = draggable
        marker?.isDraggable = draggable
    }

    fun setIcon(icon: String) {
        if (icon.startsWith("HUE_")) {
            bitmapDescriptor = COLORS[icon]?.let { BitmapDescriptorFactory.defaultMarker(it) }
            marker?.setIcon(bitmapDescriptor)
        }
    }

    fun sendEvent(name: String, data: WritableMap) {
        eventEmitter.receiveEvent(id, name, data)
    }

    fun setActive(selected: Boolean) {
        this.active = selected
        if (selected) {
            marker?.showInfoWindow()
        } else {
            marker?.hideInfoWindow()
        }
    }

    fun setIconView(overlay: AMapOverlay) {
        overlay.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> updateIcon(overlay) }
        overlay.setOnUpdateListener(object : AMapOverlay.OnUpdateListener {
            override fun onUpdate() {
                updateIcon(overlay)
            }
        })
    }

    private fun updateIcon(overlay: AMapOverlay) {
        val bitmap = Bitmap.createBitmap(
                overlay.width, overlay.height, Bitmap.Config.ARGB_8888)
        overlay.draw(Canvas(bitmap))
        bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap)
        marker?.setIcon(bitmapDescriptor)
    }

    fun setEnabledInfoWindow(enabled: Boolean) {
        infoWindowEnabled = enabled
    }

    companion object {
        private val COLORS = mapOf(
                "HUE_AZURE" to BitmapDescriptorFactory.HUE_AZURE,
                "HUE_BLUE" to BitmapDescriptorFactory.HUE_BLUE,
                "HUE_CYAN" to BitmapDescriptorFactory.HUE_CYAN,
                "HUE_GREEN" to BitmapDescriptorFactory.HUE_GREEN,
                "HUE_MAGENTA" to BitmapDescriptorFactory.HUE_MAGENTA,
                "HUE_ORANGE" to BitmapDescriptorFactory.HUE_ORANGE,
                "HUE_RED" to BitmapDescriptorFactory.HUE_RED,
                "HUE_ROSE" to BitmapDescriptorFactory.HUE_ROSE,
                "HUE_VIOLET" to BitmapDescriptorFactory.HUE_VIOLET,
                "HUE_YELLOW" to BitmapDescriptorFactory.HUE_YELLOW
        )
    }
}
