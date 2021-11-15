@objc(AMapViewManager)
class AMapViewManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }

  override func view() -> UIView {
    let view = MapView()
    view.delegate = view
    return view
  }

  @objc func moveCamera(_ reactTag: NSNumber, position: NSDictionary, duration: Int) {
    getView(reactTag: reactTag) { view in
      view.moveCamera(position: position, duration: duration)
    }
  }

  @objc func call(_ reactTag: NSNumber, callerId: Double, name: String, args: NSDictionary) {
    getView(reactTag: reactTag) { view in
      view.call(id: callerId, name: name, args: args)
    }
  }

  func getView(reactTag: NSNumber, callback: @escaping (MapView) -> Void) {
    bridge.uiManager.addUIBlock { _, viewRegistry in
      callback(viewRegistry![reactTag] as! MapView)
    }
  }
}

class MapView: MAMapView, MAMapViewDelegate {
  var initialized = false
  var overlayMap: [MABaseOverlay: Overlay] = [:]
  var markerMap: [MAPointAnnotation: Marker] = [:]

  @objc var onLoad: RCTBubblingEventBlock = { _ in }
  @objc var onCameraMove: RCTBubblingEventBlock = { _ in }
  @objc var onCameraIdle: RCTBubblingEventBlock = { _ in }
  @objc var onPress: RCTBubblingEventBlock = { _ in }
  @objc var onPressPoi: RCTBubblingEventBlock = { _ in }
  @objc var onLongPress: RCTBubblingEventBlock = { _ in }
  @objc var onLocation: RCTBubblingEventBlock = { _ in }
  @objc var onCallback: RCTBubblingEventBlock = { _ in }

  @objc func setInitialCameraPosition(_ json: NSDictionary) {
    if !initialized {
      initialized = true
      moveCamera(position: json)
    }
  }

  func moveCamera(position: NSDictionary, duration: Int = 0) {
    let status = MAMapStatus()
    status.zoomLevel = (position["zoom"] as? Double)?.cgFloat ?? zoomLevel
    status.cameraDegree = (position["tilt"] as? Double)?.cgFloat ?? cameraDegree
    status.rotationDegree = (position["bearing"] as? Double)?.cgFloat ?? rotationDegree
    status.centerCoordinate = (position["target"] as? NSDictionary)?.coordinate ?? centerCoordinate
    setMapStatus(status, animated: true, duration: Double(duration) / 1000)
  }

  func call(id: Double, name: String, args: NSDictionary) {
    switch name {
    case "getLatLng":
      callback(id: id, data: convert(args.point, toCoordinateFrom: self).json)
    default:
      break
    }
  }

  func callback(id: Double, data: [String: Any]) {
    onCallback(["id": id, "data": data])
  }

  override func didAddSubview(_ subview: UIView) {
    if let overlay = (subview as? Overlay)?.getOverlay() {
      overlayMap[overlay] = subview as? Overlay
      add(overlay)
    }
    if let annotation = (subview as? Marker)?.annotation {
      markerMap[annotation] = subview as? Marker
      addAnnotation(annotation)
    }
  }

  override func removeReactSubview(_ subview: UIView!) {
    super.removeReactSubview(subview)
    if let overlay = (subview as? Overlay)?.getOverlay() {
      overlayMap.removeValue(forKey: overlay)
      remove(overlay)
    }
    if let annotation = (subview as? Marker)?.annotation {
      markerMap.removeValue(forKey: annotation)
      removeAnnotation(annotation)
    }
  }

  func mapView(_: MAMapView, rendererFor overlay: MAOverlay) -> MAOverlayRenderer? {
    if let key = overlay as? MABaseOverlay {
      return overlayMap[key]?.getRenderer()
    }
    return nil
  }

  func mapView(_: MAMapView!, viewFor annotation: MAAnnotation) -> MAAnnotationView? {
    if let key = annotation as? MAPointAnnotation {
      return markerMap[key]?.getView()
    }
    return nil
  }

  func mapView(_: MAMapView!, annotationView view: MAAnnotationView!, didChange newState: MAAnnotationViewDragState, fromOldState _: MAAnnotationViewDragState) {
    if let key = view.annotation as? MAPointAnnotation {
      let market = markerMap[key]!
      if newState == MAAnnotationViewDragState.starting {
        market.onDragStart(nil)
      }
      if newState == MAAnnotationViewDragState.dragging {
        market.onDrag(nil)
      }
      if newState == MAAnnotationViewDragState.ending {
        market.onDragEnd(view.annotation.coordinate.json)
      }
    }
  }

  func mapView(_: MAMapView!, didAnnotationViewTapped view: MAAnnotationView!) {
    if let key = view.annotation as? MAPointAnnotation {
      markerMap[key]?.onPress(nil)
    }
  }

  func mapInitComplete(_: MAMapView!) {
    onLoad(nil)
  }

  func mapView(_: MAMapView!, didSingleTappedAt coordinate: CLLocationCoordinate2D) {
    onPress(coordinate.json)
  }

  func mapView(_: MAMapView!, didTouchPois pois: [Any]!) {
    let poi = pois[0] as! MATouchPoi
    onPressPoi(["name": poi.name!, "id": poi.uid!, "position": poi.coordinate.json])
  }

  func mapView(_: MAMapView!, didLongPressedAt coordinate: CLLocationCoordinate2D) {
    onLongPress(coordinate.json)
  }

  func mapViewRegionChanged(_: MAMapView!) {
    onCameraMove(cameraEvent)
  }

  func mapView(_: MAMapView!, regionDidChangeAnimated _: Bool) {
    onCameraIdle(cameraEvent)
  }

  func mapView(_: MAMapView!, didUpdate userLocation: MAUserLocation!, updatingLocation _: Bool) {
    onLocation(userLocation.json)
  }
}
