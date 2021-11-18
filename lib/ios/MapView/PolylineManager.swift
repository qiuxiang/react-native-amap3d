@objc(AMapPolylineManager)
class AMapPolylineManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { Polyline() }
}

class Polyline: UIView, Overlay {
  var overlay = MAMultiPolyline()
  var renderer: MAMultiColoredPolylineRenderer?

  @objc var width = 1.0 { didSet { renderer?.lineWidth = width } }
  @objc var color = UIColor.black { didSet { renderer?.strokeColor = color } }
  @objc var gradient = false { didSet { renderer?.isGradient = gradient } }
  @objc var dotted = false { didSet { setDotted() } }
  @objc var colors: [UIColor] = [] { didSet {
    renderer?.strokeColors = colors
    overlay.drawStyleIndexes = (0 ..< colors.count).map { it in NSNumber(value: it) }
  } }

  @objc func setPoints(_ points: NSArray) {
    var coordinates = points.map { it -> CLLocationCoordinate2D in (it as! NSDictionary).coordinate }
    overlay.setPolylineWithCoordinates(&coordinates, count: points.count)
  }

  func setDotted() {
    renderer?.lineDashType = dotted ? kMALineDashTypeDot : kMALineDashTypeNone
  }

  func getOverlay() -> MABaseOverlay { overlay }
  func getRenderer() -> MAOverlayRenderer {
    if renderer == nil {
      renderer = MAMultiColoredPolylineRenderer(multiPolyline: overlay)
      renderer?.strokeColor = color
      renderer?.lineWidth = width
      renderer?.isGradient = gradient
      renderer?.strokeColors = colors
      setDotted()
    }
    return renderer!
  }
}
