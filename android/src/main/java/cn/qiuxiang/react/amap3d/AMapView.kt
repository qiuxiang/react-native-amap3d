package cn.qiuxiang.react.amap3d

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import com.amap.api.maps.AMap
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.TextureMapView
import com.amap.api.maps.model.*
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class AMapView(context: Context) : TextureMapView(context) {
    private val eventEmitter: RCTEventEmitter = (context as ThemedReactContext).getJSModule(RCTEventEmitter::class.java)
    private val markers = HashMap<String, AMapMarker>()
    private val polylines = HashMap<String, AMapPolyline>()
    private val polygons = HashMap<String, AMapPolygon>()
    private val circles = HashMap<String, AMapCircle>()

    init {
        super.onCreate(null)

        // 设置默认的定位模式
        val locationStyle = MyLocationStyle()
        locationStyle.myLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER)
        map.myLocationStyle = locationStyle

        map.setOnMapClickListener { latLng ->
            for (marker in markers.values) {
                marker.active = false
            }

            val event = Arguments.createMap()
            event.putDouble("latitude", latLng.latitude)
            event.putDouble("longitude", latLng.longitude)
            emit(id, "onMapClick", event)
        }

        map.setOnMapLongClickListener { latLng ->
            val event = Arguments.createMap()
            event.putDouble("latitude", latLng.latitude)
            event.putDouble("longitude", latLng.longitude)
            emit(id, "onMapLongClick", event)
        }

        map.setOnMyLocationChangeListener { location ->
            val event = Arguments.createMap()
            event.putDouble("latitude", location.latitude)
            event.putDouble("longitude", location.longitude)
            event.putDouble("accuracy", location.accuracy.toDouble())
            emit(id, "onLocationChange", event)
        }

        map.setOnMarkerClickListener { marker ->
            emit(markers[marker.id]?.id, "onMarkerClick")
            false
        }

        map.setOnMarkerDragListener(object : AMap.OnMarkerDragListener {
            override fun onMarkerDragStart(marker: Marker) {
                emit(markers[marker.id]?.id, "onMarkerDragStart")
            }

            override fun onMarkerDrag(marker: Marker) {
                emit(markers[marker.id]?.id, "onMarkerDrag")
            }

            override fun onMarkerDragEnd(marker: Marker) {
                val position = marker.position
                val data = Arguments.createMap()
                data.putDouble("latitude", position.latitude)
                data.putDouble("longitude", position.longitude)
                emit(markers[marker.id]?.id, "onMarkerDragEnd", data)
            }
        })

        map.setOnCameraChangeListener(object: AMap.OnCameraChangeListener {
            override fun onCameraChangeFinish(position: CameraPosition?) {
                emitCameraChangeEvent("onCameraChangeFinish", position)
            }

            override fun onCameraChange(position: CameraPosition?) {
                emitCameraChangeEvent("onCameraChange", position)
            }
        })

        map.setOnInfoWindowClickListener { marker ->
            emit(markers[marker.id]?.id, "onInfoWindowClick")
        }

        map.setOnPolylineClickListener { polyline ->
            emit(polylines[polyline.id]?.id, "onPolylineClick")
        }

        map.setInfoWindowAdapter(InfoWindowAdapter(context, markers))
    }

    @SuppressLint("MissingSuperCall")
    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        map.isMyLocationEnabled = false
    }

    fun emitCameraChangeEvent(event: String, position: CameraPosition?) {
        position?.let {
            val data = Arguments.createMap()
            data.putDouble("zoomLevel", it.zoom.toDouble())
            data.putDouble("tilt", it.tilt.toDouble())
            data.putDouble("rotation", it.bearing.toDouble())
            data.putDouble("latitude", it.target.latitude)
            data.putDouble("longitude", it.target.longitude)
            if (event == "onCameraChangeFinish") {
                val southwest = map.projection.visibleRegion.latLngBounds.southwest
                val northeast = map.projection.visibleRegion.latLngBounds.northeast
                data.putDouble("latitudeDelta", Math.abs(southwest.latitude - northeast.latitude))
                data.putDouble("longitudeDelta", Math.abs(southwest.longitude - northeast.longitude))
            }
            emit(id, event, data)
        }
    }

    fun addMarker(marker: AMapMarker) {
        marker.addToMap(map)
        markers.put(marker.marker?.id!!, marker)
    }

    fun addPolyline(polyline: AMapPolyline) {
        polyline.addToMap(map)
        polylines.put(polyline.polyline?.id!!, polyline)
    }

    fun  addPolygon(polygon: AMapPolygon) {
        polygon.addToMap(map)
        polygons.put(polygon.polygon?.id!!, polygon)
    }

    fun addCircle(circle: AMapCircle) {
        circle.addToMap(map)
        circles.put(circle.circle?.id!!, circle)
    }

    fun emit(id: Int?, name: String, data: WritableMap = Arguments.createMap()) {
        id?.let { eventEmitter.receiveEvent(it, name, data) }
    }

    fun remove(child: View) {
        when (child) {
            is AMapMarker -> {
                markers.remove(child.marker?.id)
                child.marker?.destroy()
            }
            is AMapPolyline -> {
                polylines.remove(child.polyline?.id)
                child.polyline?.remove()
            }
            is AMapPolygon -> {
                polygons.remove(child.polygon?.id)
                child.polygon?.remove()
            }
            is AMapCircle -> {
                polygons.remove(child.circle?.id)
                child.circle?.remove()
            }
        }
    }

    val animateCallback = object: AMap.CancelableCallback {
        override fun onCancel() {
            emit(id, "onAnimateCancel")
        }

        override fun onFinish() {
            emit(id, "onAnimateFinish")
        }
    }

    fun animateTo(args: ReadableArray?) {
        val currentCameraPosition = map.cameraPosition
        val target = args?.getMap(0)!!
        val duration = args.getInt(1)

        var coordinate = currentCameraPosition.target
        var zoomLevel = currentCameraPosition.zoom
        var tilt = currentCameraPosition.tilt
        var rotation = currentCameraPosition.bearing

        if (target.hasKey("coordinate")) {
            val json = target.getMap("coordinate")
            coordinate = LatLng(json.getDouble("latitude"), json.getDouble("longitude"))
        }

        if (target.hasKey("zoomLevel")) {
            zoomLevel = target.getDouble("zoomLevel").toFloat()
        }

        if (target.hasKey("tilt")) {
            tilt = target.getDouble("tilt").toFloat()
        }

        if (target.hasKey("rotation")) {
            rotation = target.getDouble("rotation").toFloat()
        }

        val cameraUpdate = CameraUpdateFactory.newCameraPosition(
                CameraPosition(coordinate, zoomLevel, tilt, rotation))
        map.animateCamera(cameraUpdate, duration.toLong(), animateCallback)
    }

    fun setLimitRegion(limitRegion: ReadableMap) {
        val latitude = limitRegion.getDouble("latitude")
        val longitude = limitRegion.getDouble("longitude")
        val latitudeDelta = limitRegion.getDouble("latitudeDelta")
        val longitudeDelta = limitRegion.getDouble("longitudeDelta")
        map.setMapStatusLimits(LatLngBounds(
                LatLng(latitude - latitudeDelta / 2, longitude - longitudeDelta / 2),
                LatLng(latitude + latitudeDelta / 2, longitude + longitudeDelta / 2)
        ))
    }
}
