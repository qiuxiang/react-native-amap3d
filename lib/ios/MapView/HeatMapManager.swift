@objc(AMapHeatMapManager)
class AMapHeatMapManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool {
    false
  }

  override func view() -> UIView {
    HeatMap()
  }
}

class HeatMap: UIView, Overlay {
  var overlay: MABaseOverlay? = nil
  var renderer: MAHeatMapVectorOverlayRender?

  func getRenderer() -> MAOverlayRenderer {
    if (renderer == nil) {
      renderer = MAHeatMapVectorOverlayRender(heat: (overlay as! MAHeatMapVectorOverlay))
    }
    return renderer!
  }

  @objc func setData(_ data: NSArray) {
  }

  @objc func setRadius(_ radius: Double) {
  }

  @objc func setOpacity(_ opacity: Double) {
  }
}