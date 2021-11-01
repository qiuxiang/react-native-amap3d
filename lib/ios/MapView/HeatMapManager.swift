@objc(AMapHeatMapManager)
class AMapHeatMapManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { HeatMap() }
}

class HeatMap: UIView, Overlay {
  var overlay = MAHeatMapTileOverlay()
  var renderer: MATileOverlayRenderer?

  func getOverlay() -> MABaseOverlay { overlay }
  func getRenderer() -> MAOverlayRenderer {
    if renderer == nil {
      renderer = MATileOverlayRenderer(tileOverlay: overlay)
    }
    return renderer!
  }

  @objc func setRadius(_ radius: Int) { overlay.radius = radius }
  @objc func setOpacity(_ opacity: Double) { overlay.opacity = opacity }
  @objc func setData(_ data: NSArray) {
    overlay.data = data.map { it -> MAHeatMapNode in
      let item = MAHeatMapNode()
      item.coordinate = (it as! NSDictionary).coordinate
      item.intensity = 1
      return item
    }
  }
}
