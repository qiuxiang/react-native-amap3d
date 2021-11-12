extension NSDictionary {
  var coordinate: CLLocationCoordinate2D {
    CLLocationCoordinate2DMake(self["latitude"] as! Double, self["longitude"] as! Double)
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

extension MACoordinateRegion {
  var json: [String: Any] {
    [
      "southwest": [
        "latitude": center.latitude - span.latitudeDelta / 2,
        "longitude": center.longitude - span.longitudeDelta / 2,
      ],
      "northeast": [
        "latitude": center.latitude + span.latitudeDelta / 2,
        "longitude": center.longitude + span.longitudeDelta / 2,
      ],
    ]
  }
}

extension MAMapStatus {
  var json: [String: Any] {
    [
      "target": centerCoordinate.json,
      "zoom": zoomLevel,
      "bearing": rotationDegree,
      "tilt": cameraDegree,
    ]
  }
}

extension MAMapView {
  var cameraEvent: [String: Any] {
    [
      "cameraPosition": getMapStatus().json,
      "latLngBounds": region.json,
    ]
  }
}

extension Double {
  var cgFloat: CGFloat {
    CGFloat(self)
  }
}

extension RCTConvert {
  @objc static func MAMapType(_ json: Any) -> MAMapType {
    MAMapKit.MAMapType(rawValue: json as! NSInteger)!
  }
}

extension RCTImageLoader {
  func loadImage(_ icon: NSDictionary?, callback: @escaping (UIImage) -> Void) {
    if icon == nil {
      return
    }
    let width = icon?["width"] as? Double ?? 0
    let height = icon?["height"] as? Double ?? 0
    loadImage(
      with: RCTConvert.nsurlRequest(icon),
      size: CGSize(width: width, height: height),
      scale: RCTScreenScale(),
      clipped: false,
      resizeMode: RCTResizeMode.cover,
      progressBlock: { _, _ in },
      partialLoad: { _ in },
      completionBlock: { _, image in
        if image != nil {
          DispatchQueue.main.async {
            callback(image!)
          }
        }
      }
    )
  }
}
