@objc(AMapMultiPointManager)
class AMapMultiPointManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool {
    false
  }

  override func view() -> UIView {
    let view = MultiPoint()
    view.imageLoader = bridge.module(forName: "ImageLoader") as? RCTImageLoader
    return view
  }
}

class MultiPoint: UIView, Overlay, MAMultiPointOverlayRendererDelegate {
  var imageLoader: RCTImageLoader? = nil
  var overlay: MABaseOverlay? = nil
  var renderer: MAMultiPointOverlayRenderer?
  var icon: UIImage? = nil

  func getRenderer() -> MAOverlayRenderer {
    if (renderer == nil) {
      renderer = MAMultiPointOverlayRenderer(multiPointOverlay: (overlay as! MAMultiPointOverlay))
      renderer?.icon = icon
      renderer?.delegate = self
    }
    return renderer!
  }

  @objc func setIcon(_ icon: NSDictionary) {
    imageLoader?.loadImage(with: RCTConvert.nsurlRequest(icon), callback: { _, image in
      self.renderer?.icon = image
    })
  }

  @objc func setItems(_ items: NSArray) {
    overlay = MAMultiPointOverlay(multiPointItems: items.map { it -> MAMultiPointItem in
      let item = MAMultiPointItem()
      item.coordinate = (it as! NSDictionary).coordinate
      return item
    })
  }

  func multiPointOverlayRenderer(_ renderer: MAMultiPointOverlayRenderer!, didItemTapped item: MAMultiPointItem!) {
    onPress(["index": (overlay as! MAMultiPointOverlay).items.firstIndex(of: item)!])
  }

  @objc var onPress: RCTDirectEventBlock = { _ in
  }
}