package cn.qiuxiang.react.amap3d

import android.graphics.Color
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import com.amap.api.maps.AMap
import com.amap.api.maps.MapView
import com.amap.api.maps.model.Marker
import com.amap.api.maps.model.MyLocationStyle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

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
            sendEvent("onMapLoaded", Arguments.createMap())
        }

        map.setOnMapClickListener { latLng ->
            val event = Arguments.createMap()
            event.putDouble("latitude", latLng.latitude)
            event.putDouble("longitude", latLng.longitude)
            sendEvent("onMapClick", event)
        }

        map.setOnMapLongClickListener { latLng ->
            val event = Arguments.createMap()
            event.putDouble("latitude", latLng.latitude)
            event.putDouble("longitude", latLng.longitude)
            sendEvent("onMapLongClick", event)
        }

        map.setOnMyLocationChangeListener { location ->
            val event = Arguments.createMap()
            event.putDouble("latitude", location.latitude)
            event.putDouble("longitude", location.longitude)
            event.putDouble("accuracy", location.accuracy.toDouble())
            sendEvent("onLocationChange", event)
        }

        map.setOnMarkerClickListener { marker ->
            markers[marker.id]?.sendEvent("onMarkerClick", Arguments.createMap())
            false
        }

        map.setOnMarkerDragListener(object : AMap.OnMarkerDragListener {
            override fun onMarkerDragStart(marker: Marker) {
                markers[marker.id]?.sendEvent("onMarkerDragStart", Arguments.createMap())
            }

            override fun onMarkerDrag(marker: Marker) {
                markers[marker.id]?.sendEvent("onMarkerDrag", Arguments.createMap())
            }

            override fun onMarkerDragEnd(marker: Marker) {
                val position = marker.position
                val data = Arguments.createMap()
                data.putDouble("latitude", position.latitude)
                data.putDouble("longitude", position.longitude)
                markers[marker.id]?.sendEvent("onMarkerDragEnd", data)
            }
        })

        map.setOnInfoWindowClickListener { marker ->
            markers[marker.id]?.sendEvent("onInfoWindowClick", Arguments.createMap())
        }

        map.setInfoWindowAdapter(object : AMap.InfoWindowAdapter {
            private val paddingTop = context.resources.displayMetrics.density

            override fun getInfoWindow(marker: Marker): View {
                return markers[marker.id]?.infoWindow as View
            }

            override fun getInfoContents(marker: Marker): View {
                val layout = LinearLayout(context)
                layout.orientation = LinearLayout.VERTICAL
                val titleView = TextView(context)
                titleView.text = marker.title
                titleView.setTextColor(Color.parseColor("#212121"))
                layout.addView(titleView)

                val snippet = marker.snippet
                if (!snippet.isEmpty()) {
                    val snippetView = TextView(context)
                    snippetView.text = snippet
                    snippetView.setSingleLine(false)
                    snippetView.maxEms = 12
                    snippetView.setPadding(0, paddingTop.toInt(), 0, 0)
                    snippetView.setTextColor(Color.parseColor("#757575"))
                    layout.addView(snippetView)
                }

                return layout
            }
        })

        map.setOnPolylineClickListener { polyline ->
            polylines[polyline.id]?.sendEvent("onPolylineClick", Arguments.createMap())
        }
    }

    fun addMarker(marker: AMapMarker) {
        marker.addToMap(map)
        markers.put(marker.markerId!!, marker)
    }

    fun addPolyline(polyline: AMapPolyline) {
        polyline.addToMap(map)
        polylines.put(polyline.polylineId!!, polyline)
    }

    fun sendEvent(name: String, data: WritableMap) {
        eventEmitter.receiveEvent(id, name, data)
    }
}
