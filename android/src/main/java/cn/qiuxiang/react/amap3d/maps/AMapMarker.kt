package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.view.View
import cn.qiuxiang.react.amap3d.toPx
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup

class AMapMarker(context: Context) : ReactViewGroup(context), AMapOverlay {
    companion object {
        private val COLORS = mapOf(
                "AZURE" to BitmapDescriptorFactory.HUE_AZURE,
                "BLUE" to BitmapDescriptorFactory.HUE_BLUE,
                "CYAN" to BitmapDescriptorFactory.HUE_CYAN,
                "GREEN" to BitmapDescriptorFactory.HUE_GREEN,
                "MAGENTA" to BitmapDescriptorFactory.HUE_MAGENTA,
                "ORANGE" to BitmapDescriptorFactory.HUE_ORANGE,
                "RED" to BitmapDescriptorFactory.HUE_RED,
                "ROSE" to BitmapDescriptorFactory.HUE_ROSE,
                "VIOLET" to BitmapDescriptorFactory.HUE_VIOLET,
                "YELLOW" to BitmapDescriptorFactory.HUE_YELLOW
        )
    }

    private var icon: View? = null
    private var bitmapDescriptor: BitmapDescriptor? = null
    private var anchorU: Float = 0.5f
    private var anchorV: Float = 1f
    var infoWindow: AMapInfoWindow? = null

    var marker: Marker? = null
        private set

    var position: LatLng? = null
        set(value) {
            field = value
            marker?.position = value
        }

    var zIndex: Float = 0.0f
        set(value) {
            field = value
            marker?.zIndex = value
        }

    var title = ""
        set(value) {
            field = value
            marker?.title = value
        }

    var snippet = ""
        set(value) {
            field = value
            marker?.snippet = value
        }

    var flat: Boolean = false
        set(value) {
            field = value
            marker?.isFlat = value
        }

    var opacity: Float = 1f
        set(value) {
            field = value
            marker?.alpha = value
        }

    var draggable: Boolean = false
        set(value) {
            field = value
            marker?.isDraggable = value
        }

    var clickDisabled: Boolean = false
        set(value) {
            field = value
            marker?.isClickable = !value
        }

    var infoWindowDisabled: Boolean = false
        set(value) {
            field = value
            marker?.isInfoWindowEnable = !value
        }

    var active: Boolean = false
        set(value) {
            field = value
            if (value) {
                marker?.showInfoWindow()
            } else {
                marker?.hideInfoWindow()
            }
        }

    override fun addView(child: View, index: Int) {
        super.addView(child, index)
        icon = child
        icon?.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> updateIcon() }
    }

    override fun add(map: AMap) {
        marker = map.addMarker(MarkerOptions()
                .setFlat(flat)
                .icon(bitmapDescriptor)
                .alpha(opacity)
                .draggable(draggable)
                .position(position)
                .anchor(anchorU, anchorV)
                .infoWindowEnable(!infoWindowDisabled)
                .title(title)
                .snippet(snippet)
                .zIndex(zIndex))

        this.clickDisabled = clickDisabled
        this.active = active
    }

    override fun remove() {
        marker?.destroy()
    }

    fun setIconColor(icon: String) {
        bitmapDescriptor = COLORS[icon.toUpperCase()]?.let {
            BitmapDescriptorFactory.defaultMarker(it)
        }
        marker?.setIcon(bitmapDescriptor)
    }

    fun updateIcon() {
        icon?.let {
            val bitmap = Bitmap.createBitmap(
                    it.width, it.height, Bitmap.Config.ARGB_8888)
            it.draw(Canvas(bitmap))
            bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap)
            marker?.setIcon(bitmapDescriptor)
        }
    }

    fun setImage(name: String) {
        val drawable = context.resources.getIdentifier(name, "drawable", context.packageName)
        bitmapDescriptor = BitmapDescriptorFactory.fromResource(drawable)
        marker?.setIcon(bitmapDescriptor)
    }

    fun setAnchor(x: Double, y: Double) {
        anchorU = x.toFloat()
        anchorV = y.toFloat()
        marker?.setAnchor(anchorU, anchorV)
    }

    fun lockToScreen(args: ReadableArray?) {
        if (args != null) {
            val x = args.getDouble(0).toFloat().toPx
            val y = args.getDouble(1).toFloat().toPx
            marker?.setPositionByPixels(x, y)
        }
    }
}
