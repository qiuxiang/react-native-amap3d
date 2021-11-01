@objc(AMapCircleManager)
class AMapCircleManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { Circle() }
}

class Circle: UIView, Overlay {
  var overlay = MACircle()
  var renderer: MACircleRenderer?

  @objc var radius = 0.0 { didSet { overlay.radius = radius } }
  @objc var strokeWidth = 0.0 { didSet { renderer?.lineWidth = strokeWidth } }
  @objc var strokeColor = UIColor.black { didSet { renderer?.strokeColor = strokeColor } }
  @objc var fillColor = UIColor.white { didSet { renderer?.fillColor = fillColor } }

  @objc func setCircleCenter(_ center: CLLocationCoordinate2D) {
    overlay.coordinate = center
  }

  func getOverlay() -> MABaseOverlay { overlay }
  func getRenderer() -> MAOverlayRenderer {
    if renderer == nil {
      renderer = MACircleRenderer(circle: overlay)
      renderer?.fillColor = fillColor
      renderer?.strokeColor = strokeColor
      renderer?.lineWidth = strokeWidth
    }
    return renderer!
  }
}
