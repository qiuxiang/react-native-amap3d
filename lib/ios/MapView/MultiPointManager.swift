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
  var multiPointRenderer: MAMultiPointOverlayRenderer?
  var icon: UIImage? = nil

  func renderer() -> MAOverlayRenderer {
    if (multiPointRenderer == nil) {
      multiPointRenderer = MAMultiPointOverlayRenderer(multiPointOverlay: (overlay as! MAMultiPointOverlay))
      multiPointRenderer?.icon = icon
      multiPointRenderer?.delegate = self
    }
    return multiPointRenderer!
  }

  @objc func setIcon(_ icon: NSDictionary) {
    imageLoader?.loadImage(with: RCTConvert.nsurlRequest(icon), callback: { _, image in
      self.multiPointRenderer?.icon = image
    })
  }

  @objc func setItems(_ items: NSArray) {
    overlay = MAMultiPointOverlay(multiPointItems: items.map { i -> MAMultiPointItem in
      let data = i as! NSDictionary
      let item = MAMultiPointItem()
      item.coordinate = data.coordinate
      return item
    })
  }

  func multiPointOverlayRenderer(_ renderer: MAMultiPointOverlayRenderer!, didItemTapped item: MAMultiPointItem!) {
    onPress(["index": (overlay as! MAMultiPointOverlay).items.firstIndex(of: item)!])
  }

  @objc var onPress: RCTDirectEventBlock = { _ in
  }
}