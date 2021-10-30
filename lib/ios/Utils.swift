extension NSDictionary {
  var coordinate: CLLocationCoordinate2D {
    CLLocationCoordinate2DMake(self["latitude"] as! Double, self["longitude"] as! Double)
  }
}

extension CLLocationCoordinate2D {
  var json: [String: Double] {
    ["latitude": latitude, "longitude": longitude]
  }
}
