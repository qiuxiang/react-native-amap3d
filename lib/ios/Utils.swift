extension NSDictionary {
  var coordinate: CLLocationCoordinate2D {
    CLLocationCoordinate2DMake(self["latitude"] as! Double, self["longitude"] as! Double)
  }
  
  var mapStatus: MAMapStatus {
    let status = MAMapStatus()
    if let it = self["zoom"] as? Double { status.zoomLevel = CGFloat(it) }
    if let it = self["tilt"] as? Double { status.cameraDegree = CGFloat(it) }
    if let it = self["bearing"] as? Double { status.rotationDegree = CGFloat(it) }
    if let it = self["target"] as? NSDictionary { status.centerCoordinate = it.coordinate }
    return status
  }
  
  var point: CGPoint {
    CGPoint(x: self["x"] as! Double, y: self["y"] as! Double)
  }
}

extension CLLocationCoordinate2D {
  var json: [String: Double] {
    ["latitude": latitude, "longitude": longitude]
  }
}

extension MAUserLocation {
  var json: [String: Any] {
    [
      "coords": [
        "latitude": coordinate.latitude,
        "longitude": coordinate.longitude,
        "altitude": location?.altitude ?? 0,
        "heading": heading?.trueHeading,
        "accuracy": location?.horizontalAccuracy ?? 0,
        "speed": location?.speed ?? 0,
      ],
      "timestamp": NSDate().timeIntervalSince1970 * 1000,
    ]
  }
}

extension MAMapView {
  var cameraPositionJson: [String: Any] {
    [
      "cameraPosition": [
        "target": centerCoordinate.json,
        "zoom": zoomLevel,
        "bearing": rotationDegree,
        "tilt": cameraDegree,
      ],
    ]
  }
}

extension RCTConvert {
  @objc static func MAMapType(_ json: Any) -> MAMapType {
    MAMapKit.MAMapType(rawValue: json as! NSInteger)!
  }
}
