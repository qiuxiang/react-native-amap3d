package cn.qiuxiang.react.amap3d

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import com.amap.api.maps.AMap
import com.amap.api.maps.model.*
import com.facebook.react.views.view.ReactViewGroup

class AMapMarker(context: Context) : ReactViewGroup(context) {
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

    var infoWindow: AMapOverlay? = null

    var infoWindowEnabled: Boolean = true
        set(value) {
            field = value
            marker?.isInfoWindowEnable = value
        }

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

    var clickable_: Boolean = true
        set(value) {
            field = value
            marker?.isClickable = value
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

    private var bitmapDescriptor: BitmapDescriptor? = null

    fun addToMap(map: AMap) {
        marker = map.addMarker(MarkerOptions()
                .setFlat(flat)
                .icon(bitmapDescriptor)
                .alpha(opacity)
                .draggable(draggable)
                .position(position)
                .title(title)
                .infoWindowEnable(infoWindowEnabled)
                .snippet(snippet)
                .zIndex(zIndex))

        if (active) {
            marker?.showInfoWindow()
        } else {
            marker?.hideInfoWindow()
        }

        marker?.isClickable = this.clickable_
    }

    fun setIcon(icon: String) {
        bitmapDescriptor = COLORS[icon.toUpperCase()]?.let {
            BitmapDescriptorFactory.defaultMarker(it)
        }
        marker?.setIcon(bitmapDescriptor)
    }

    fun setIconView(overlay: AMapOverlay) {
        overlay.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> updateIconView(overlay) }
        overlay.onUpdate {
            updateIconView(overlay)
        }
    }

    /**
     * TODO: 如果 IconView 里包含 Image，由于不知道 Image 什么时候加载完毕，会导致 Image 可能无法正确显示
     */
    private fun updateIconView(overlay: AMapOverlay) {
        val bitmap = Bitmap.createBitmap(
                overlay.width, overlay.height, Bitmap.Config.ARGB_8888)
        overlay.draw(Canvas(bitmap))
        bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap)
        marker?.setIcon(bitmapDescriptor)
    }
}
