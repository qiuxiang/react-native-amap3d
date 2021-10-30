import UIKit

@objc(AMapViewManager)
class AMapViewManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool {
    false
  }

  override func view() -> MapView {
    let view = MapView()
    view.delegate = view
    return view
  }

  @objc func moveCamera(_ reactTag: NSNumber, position: NSDictionary, duration: Int) {
    getView(reactTag: reactTag) { view in
      view.moveCamera(position: position, duration: duration)
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

  @objc var onLoad: RCTDirectEventBlock = { _ in
  }
  @objc var onCameraIdle: RCTDirectEventBlock = { _ in
  }
  @objc var onPress: RCTDirectEventBlock = { _ in
  }
  @objc var onPressPoi: RCTDirectEventBlock = { _ in
  }
  @objc var onLongPress: RCTDirectEventBlock = { _ in
  }

  @objc func setBuildingsEnabled(_ enabled: Bool) {
    isShowsBuildings = enabled
  }

  @objc func setTrafficEnabled(_ enabled: Bool) {
    isShowTraffic = enabled
  }

  @objc func setIndoorViewEnabled(_ enabled: Bool) {
    isShowsIndoorMap = enabled
  }

  @objc func setCompassEnabled(_ enabled: Bool) {
    showsCompass = enabled
  }

  @objc func setScaleControlsEnabled(_ enabled: Bool) {
    showsScale = enabled
  }

  @objc func setScrollGesturesEnabled(_ enabled: Bool) {
    isScrollEnabled = enabled
  }

  @objc func setZoomGesturesEnabled(_ enabled: Bool) {
    isZoomEnabled = enabled
  }

  @objc func setRotateGesturesEnabled(_ enabled: Bool) {
    isRotateEnabled = enabled
  }

  @objc func setTiltGesturesEnabled(_ enabled: Bool) {
    isRotateCameraEnabled = enabled
  }

  @objc func setInitialCameraPosition(_ json: NSDictionary) {
    if (!initialized) {
      initialized = true
      moveCamera(position: json)
    }
  }

  func moveCamera(position: NSDictionary, duration: Int = 0) {
    let status = MAMapStatus()
    if let it = position["zoom"] as? Float {
      status.zoomLevel = CGFloat(it)
    }
    if let it = position["tilt"] as? Float {
      status.cameraDegree = CGFloat(it)
    }
    if let it = position["bearing"] as? Float {
      status.rotationDegree = CGFloat(it)
    }
    if let it = position["target"] as? NSDictionary {
      status.centerCoordinate = it.coordinate
    }
    setMapStatus(status, animated: true, duration: Double(duration) / 1000)
  }

  func mapInitComplete(_ mapView: MAMapView!) {
    onLoad(nil)
  }

  func mapView(_ mapView: MAMapView!, didSingleTappedAt coordinate: CLLocationCoordinate2D) {
    onPress(coordinate.json)
  }

  func mapView(_ mapView: MAMapView!, didTouchPois pois: [Any]!) {
    let poi = pois[0] as! MATouchPoi
    onPressPoi(["name": poi.name!, "id": poi.uid!])
  }

  func mapView(_ mapView: MAMapView!, didLongPressedAt coordinate: CLLocationCoordinate2D) {
    onLongPress(coordinate.json)
  }

  func mapView(_ mapView: MAMapView!, regionDidChangeAnimated animated: Bool) {
    onCameraIdle([
      "cameraPosition": [
        "target": centerCoordinate.json,
        "zoom": zoomLevel,
        "bearing": rotationDegree,
        "tilt": cameraDegree,
      ],
    ])
  }
}
