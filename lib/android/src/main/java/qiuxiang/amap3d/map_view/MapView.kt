package qiuxiang.amap3d.map_view

import android.annotation.SuppressLint
import android.view.View
import com.amap.api.maps.AMap
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.TextureMapView
import com.amap.api.maps.model.CameraPosition
import com.amap.api.maps.model.Marker
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import qiuxiang.amap3d.getFloat
import qiuxiang.amap3d.toJson
import qiuxiang.amap3d.toLatLng

@SuppressLint("ViewConstructor")
class MapView(context: ThemedReactContext) : TextureMapView(context) {
  @Suppress("Deprecation")
  private val eventEmitter =
    context.getJSModule(com.facebook.react.uimanager.events.RCTEventEmitter::class.java)
  private val markerMap = HashMap<String, MapMarker>()
  private val polylineMap = HashMap<String, MapPolyline>()
  private var initialCameraPosition: ReadableMap? = null

  init {
    super.onCreate(null)

    map.setOnMapLoadedListener { emit(id, "onLoad") }
    map.setOnMapClickListener { latLng -> emit(id, "onTap", latLng.toJson()) }
    map.setOnPOIClickListener { poi -> emit(id, "onTapPoi", poi.toJson()) }
    map.setOnMapLongClickListener { latLng -> emit(id, "onLongPress", latLng.toJson()) }

    map.setOnMarkerClickListener { marker ->
      markerMap[marker.id]?.let {
        it.active = true
        emit(it.id, "onPress")
      }
      true
    }


    map.setOnMarkerDragListener(object : AMap.OnMarkerDragListener {
      override fun onMarkerDragStart(marker: Marker) {
        emit(markerMap[marker.id]?.id, "onDragStart")
      }

      override fun onMarkerDrag(marker: Marker) {
        emit(markerMap[marker.id]?.id, "onDrag")
      }

      override fun onMarkerDragEnd(marker: Marker) {
        emit(markerMap[marker.id]?.id, "onDragEnd", marker.position.toJson())
      }
    })

    map.setOnCameraChangeListener(object : AMap.OnCameraChangeListener {
      override fun onCameraChangeFinish(position: CameraPosition) {
        emit(id, "onCameraIdle", position.toJson())
      }

      override fun onCameraChange(position: CameraPosition) {
        emit(id, "onCameraMove", position.toJson())
      }
    })

    map.setOnPolylineClickListener { polyline -> emit(polylineMap[polyline.id]?.id, "onPress") }

    map.setOnMultiPointClickListener { item ->
      item.customerId.split("_").let {
        emit(
          it[0].toInt(),
          "onPress",
          Arguments.createMap().apply { putInt("index", it[1].toInt()) },
        )
      }
      false
    }
  }

  fun emit(id: Int?, event: String, data: WritableMap = Arguments.createMap()) {
    @Suppress("Deprecation")
    id?.let { eventEmitter.receiveEvent(it, event, data) }
  }

  fun add(child: View) {
    if (child is MapOverlay) {
      child.add(map)
      if (child is MapMarker) {
        markerMap[child.marker?.id!!] = child
      }
      if (child is MapPolyline) {
        polylineMap[child.polyline?.id!!] = child
      }
    }
  }

  fun remove(child: View) {
    if (child is MapOverlay) {
      child.remove()
      if (child is MapMarker) {
        markerMap.remove(child.marker?.id)
      }
      if (child is MapPolyline) {
        polylineMap.remove(child.polyline?.id)
      }
    }
  }

  private val animateCallback = object : AMap.CancelableCallback {
    override fun onCancel() {}
    override fun onFinish() {}
  }

  fun moveCamera(args: ReadableArray?) {
    val data = args?.getMap(0)!!
    val duration = args.getInt(1).toLong()
    val target = data.getMap("target")?.toLatLng()
    val zoom = data.getFloat("zoom") ?: map.cameraPosition.zoom
    val tilt = data.getFloat("tilt") ?: map.cameraPosition.tilt
    val bearing = data.getFloat("bearing") ?: map.cameraPosition.bearing
    val cameraUpdate = CameraUpdateFactory.newCameraPosition(
      CameraPosition(target, zoom, tilt, bearing)
    )
    map.animateCamera(cameraUpdate, duration, animateCallback)
  }

  fun setInitialCameraPosition(position: ReadableMap) {
    if (initialCameraPosition == null) {
      initialCameraPosition = position
      moveCamera(Arguments.createArray().apply {
        pushMap(Arguments.createMap().apply { merge(position) })
        pushInt(0)
      })
    }
  }
}
