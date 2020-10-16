package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import android.view.View
import cn.qiuxiang.react.amap3d.toLatLng
import cn.qiuxiang.react.amap3d.toLatLngBounds
import cn.qiuxiang.react.amap3d.toWritableMap
import com.amap.api.maps.AMap
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.TextureMapView
import com.amap.api.maps.model.BitmapDescriptorFactory
import com.amap.api.maps.model.CameraPosition
import com.amap.api.maps.model.Marker
import com.amap.api.maps.model.MyLocationStyle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class AMapView(context: Context) : TextureMapView(context) {
    private val eventEmitter: RCTEventEmitter = (context as ThemedReactContext).getJSModule(RCTEventEmitter::class.java)
    private val markers = HashMap<String, AMapMarker>()
    private val lines = HashMap<String, AMapPolyline>()
    private val locationStyle by lazy {
        val locationStyle = MyLocationStyle()
        locationStyle.myLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER)
        locationStyle
    }

    init {
        super.onCreate(null)

        map.setOnMapClickListener { latLng ->
            for (marker in markers.values) {
                marker.active = false
            }

            emit(id, "onClick", latLng.toWritableMap())
        }

        map.setOnMapLongClickListener { latLng ->
            emit(id, "onLongClick", latLng.toWritableMap())
        }

        map.setOnMyLocationChangeListener { location ->
            val event = Arguments.createMap()
            event.putDouble("latitude", location.latitude)
            event.putDouble("longitude", location.longitude)
            event.putDouble("accuracy", location.accuracy.toDouble())
            event.putDouble("altitude", location.altitude)
            event.putDouble("heading", location.bearing.toDouble())
            event.putDouble("speed", location.speed.toDouble())
            event.putDouble("timestamp", location.time.toDouble())
            emit(id, "onLocation", event)
        }

        map.setOnMarkerClickListener { marker ->
            markers[marker.id]?.let {
                it.active = true
                emit(it.id, "onPress")
            }
            true
        }

        map.setOnPOIClickListener { poi ->
            val data = poi.coordinate.toWritableMap()
            data.putString("id", poi.poiId)
            data.putString("name", poi.name)
            emit(id, "onClick", data)
        }

        map.setOnMarkerDragListener(object : AMap.OnMarkerDragListener {
            override fun onMarkerDragStart(marker: Marker) {
                emit(markers[marker.id]?.id, "onDragStart")
            }

            override fun onMarkerDrag(marker: Marker) {
                emit(markers[marker.id]?.id, "onDrag")
            }

            override fun onMarkerDragEnd(marker: Marker) {
                emit(markers[marker.id]?.id, "onDragEnd", marker.position.toWritableMap())
            }
        })

        map.setOnCameraChangeListener(object : AMap.OnCameraChangeListener {
            override fun onCameraChangeFinish(position: CameraPosition?) {
                emitCameraChangeEvent("onStatusChangeComplete", position)
            }

            override fun onCameraChange(position: CameraPosition?) {
                emitCameraChangeEvent("onStatusChange", position)
            }
        })

        map.setOnInfoWindowClickListener { marker ->
            emit(markers[marker.id]?.id, "onInfoWindowPress")
        }

        map.setOnPolylineClickListener { polyline ->
            emit(lines[polyline.id]?.id, "onPress")
        }

        map.setOnMultiPointClickListener { item ->
            val slice = item.customerId.split("_")
            val data = Arguments.createMap()
            data.putInt("index", slice[1].toInt())
            emit(slice[0].toInt(), "onItemPress", data)
            false
        }

        map.setInfoWindowAdapter(AMapInfoWindowAdapter(context, markers))
    }

    fun emitCameraChangeEvent(event: String, position: CameraPosition?) {
        position?.let {
            val data = Arguments.createMap()
            data.putMap("center", it.target.toWritableMap())
            data.putDouble("zoomLevel", it.zoom.toDouble())
            data.putDouble("tilt", it.tilt.toDouble())
            data.putDouble("rotation", it.bearing.toDouble())
            if (event == "onStatusChangeComplete") {
                data.putMap("region", map.projection.visibleRegion.latLngBounds.toWritableMap())
            }
            emit(id, event, data)
        }
    }

    fun emit(id: Int?, event: String, data: WritableMap = Arguments.createMap()) {
        id?.let { eventEmitter.receiveEvent(it, event, data) }
    }

    fun add(child: View) {
        if (child is AMapOverlay) {
            child.add(map)
            if (child is AMapMarker) {
                markers[child.marker?.id!!] = child
            }
            if (child is AMapPolyline) {
                lines[child.polyline?.id!!] = child
            }
        }
    }

    fun remove(child: View) {
        if (child is AMapOverlay) {
            child.remove()
            if (child is AMapMarker) {
                markers.remove(child.marker?.id)
            }
            if (child is AMapPolyline) {
                lines.remove(child.polyline?.id)
            }
        }
    }

    private val animateCallback = object : AMap.CancelableCallback {
        override fun onCancel() {
            emit(id, "onAnimateCancel")
        }

        override fun onFinish() {
            emit(id, "onAnimateFinish")
        }
    }

    fun animateTo(args: ReadableArray?) {
        val currentCameraPosition = map.cameraPosition
        val status = args?.getMap(0)!!
        val duration = args.getInt(1)

        var center = currentCameraPosition.target
        var zoomLevel = currentCameraPosition.zoom
        var tilt = currentCameraPosition.tilt
        var rotation = currentCameraPosition.bearing

        if (status.hasKey("center")) {
            center = status.getMap("center")!!.toLatLng()
        }

        if (status.hasKey("zoomLevel")) {
            zoomLevel = status.getDouble("zoomLevel").toFloat()
        }

        if (status.hasKey("tilt")) {
            tilt = status.getDouble("tilt").toFloat()
        }

        if (status.hasKey("rotation")) {
            rotation = status.getDouble("rotation").toFloat()
        }

        val cameraUpdate = CameraUpdateFactory.newCameraPosition(
                CameraPosition(center, zoomLevel, tilt, rotation))
        map.animateCamera(cameraUpdate, duration.toLong(), animateCallback)
    }

    fun setRegion(region: ReadableMap) {
        map.moveCamera(CameraUpdateFactory.newLatLngBounds(region.toLatLngBounds(), 0))
    }

    fun setLimitRegion(region: ReadableMap) {
        map.setMapStatusLimits(region.toLatLngBounds())
    }

    fun setLocationEnabled(enabled: Boolean) {
        map.isMyLocationEnabled = enabled
        map.myLocationStyle = locationStyle
    }

    fun setLocationInterval(interval: Long) {
        locationStyle.interval(interval)
        map.myLocationStyle = locationStyle
    }

    fun setLocationStyle(style: ReadableMap) {
        if (style.hasKey("fillColor")) {
            locationStyle.radiusFillColor(style.getInt("fillColor"))
        }

        if (style.hasKey("strokeColor")) {
            locationStyle.strokeColor(style.getInt("strokeColor"))
        }

        if (style.hasKey("strokeWidth")) {
            locationStyle.strokeWidth(style.getDouble("strokeWidth").toFloat())
        }

        if (style.hasKey("image")) {
            val drawable = context.resources.getIdentifier(
                    style.getString("image"), "drawable", context.packageName)
            locationStyle.myLocationIcon(BitmapDescriptorFactory.fromResource(drawable))
        }

        if (style.hasKey("showLocation")) {
            locationStyle.showMyLocation(style.getBoolean("showLocation"))
        }

        if (style.hasKey("anchor")) {
            val anchor = style.getArray("anchor");
            locationStyle.anchor(anchor!!.getDouble(0).toFloat(), anchor.getDouble(1).toFloat())
        }

        map.myLocationStyle = locationStyle
    }

    fun setLocationType(type: Int) {
        locationStyle.myLocationType(type)
        map.myLocationStyle = locationStyle
    }
}
