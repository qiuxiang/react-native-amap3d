package cn.qiuxiang.react.amap3d

import android.view.View
import com.amap.api.maps.AMap
import com.amap.api.maps.MapView
import com.amap.api.maps.model.Marker
import com.amap.api.maps.model.MyLocationStyle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.views.view.ReactViewGroup

class AMapView(context: ThemedReactContext) : MapView(context) {
    private val eventEmitter: RCTEventEmitter = context.getJSModule(RCTEventEmitter::class.java)
    private val markers = HashMap<String, AMapMarker>()
    private val polylines = HashMap<String, AMapPolyline>()

    init {
        super.onCreate(null)

        // 设置默认的定位模式
        val locationStyle = MyLocationStyle()
        locationStyle.myLocationType(MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER)
        map.myLocationStyle = locationStyle

        map.setOnMapLoadedListener {
            emit(id, "onMapLoaded")
        }

        map.setOnMapClickListener { latLng ->
            val event = Arguments.createMap()
            event.putDouble("latitude", latLng.latitude)
            event.putDouble("longitude", latLng.longitude)
            emit(id, "onMapClick")
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
            emit(id, "onLocationChange")
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

        map.setOnInfoWindowClickListener { marker ->
            emit(markers[marker.id]?.id, "onInfoWindowClick")
        }

        map.setOnPolylineClickListener { polyline ->
            emit(polylines[polyline.id]?.id, "onPolylineClick")
        }

        map.setInfoWindowAdapter(AMapInfoWindowAdapter(context, markers))
    }

    fun addMarker(marker: AMapMarker) {
        marker.addToMap(map)
        markers.put(marker.marker?.id!!, marker)
    }

    fun addPolyline(polyline: AMapPolyline) {
        polyline.addToMap(map)
        polylines.put(polyline.polyline?.id!!, polyline)
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
        }
    }
}
