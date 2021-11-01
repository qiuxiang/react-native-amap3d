@objc(AMapPolygonManager)
class AMapPolygonManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { Polygon() }
}

class Polygon: UIView, Overlay {
  var overlay = MAPolygon()
  var renderer: MAPolygonRenderer?

  @objc var strokeWidth = 1.0 { didSet { renderer?.lineWidth = strokeWidth } }
  @objc var strokeColor = UIColor.black { didSet { renderer?.strokeColor = strokeColor } }
  @objc var fillColor = UIColor.white { didSet { renderer?.fillColor = fillColor } }

  @objc func setPoints(_ points: NSArray) {
    var coordinates = points.map { it -> CLLocationCoordinate2D in (it as! NSDictionary).coordinate }
    overlay.setPolygonWithCoordinates(&coordinates, count: points.count)
  }

  func getOverlay() -> MABaseOverlay { overlay }
  func getRenderer() -> MAOverlayRenderer {
    if renderer == nil {
      renderer = MAPolygonRenderer(polygon: overlay)
      renderer?.fillColor = fillColor
      renderer?.strokeColor = strokeColor
      renderer?.lineWidth = strokeWidth
    }
    return renderer!
  }
}
