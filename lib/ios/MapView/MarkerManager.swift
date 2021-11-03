@objc(AMapMarkerManager)
class AMapMarkerManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }

  override func view() -> UIView {
    let view = Marker()
    view.imageLoader = bridge.module(forName: "ImageLoader") as? RCTImageLoader
    return view
  }

  @objc func update(_ reactTag: NSNumber) {
    getView(reactTag: reactTag) { view in view.update() }
  }

  func getView(reactTag: NSNumber, callback: @escaping (Marker) -> Void) {
    bridge.uiManager.addUIBlock { _, viewRegistry in
      callback(viewRegistry![reactTag] as! Marker)
    }
  }
}

class Marker: UIView {
  var imageLoader: RCTImageLoader?
  var view: MAAnnotationView?
  var annotation = MAPointAnnotation()
  var icon: UIImage?
  var iconView: UIView?
  var centerOffset: CGPoint?

  @objc var draggable = false { didSet { view?.isDraggable = draggable } }
  @objc var zIndex = 1 { didSet { view?.zIndex = zIndex } }

  @objc var onPress: RCTDirectEventBlock = { _ in }
  @objc var onDragStart: RCTDirectEventBlock = { _ in }
  @objc var onDrag: RCTDirectEventBlock = { _ in }
  @objc var onDragEnd: RCTDirectEventBlock = { _ in }

  @objc func setIcon(_ icon: NSDictionary?) {
    if icon == nil {
      return
    }
    let width = icon?["width"] as? Double ?? 0
    let height = icon?["height"] as? Double ?? 0
    imageLoader?.loadImage(
      with: RCTConvert.nsurlRequest(icon),
      size: CGSize(width: width, height: height),
      scale: RCTScreenScale(),
      clipped: false,
      resizeMode: RCTResizeMode.cover,
      progressBlock: { _, _ in },
      partialLoad: { _ in },
      completionBlock: { _, image in
        if image == nil {
          return
        }
        DispatchQueue.main.async {
          self.icon = image
          self.view?.image = image
          self.updateCenterOffset()
        }
      }
    )
  }

  @objc func setLatLng(_ coordinate: CLLocationCoordinate2D) {
    annotation.coordinate = coordinate
  }

  @objc func setCenterOffset(_ centerOffset: CGPoint) {
    self.centerOffset = centerOffset
    view?.centerOffset = centerOffset
  }

  override func didAddSubview(_ subview: UIView) {
    iconView = subview
  }

  func update() {
    if centerOffset == nil, view != nil {
      let size: CGSize = (view?.bounds.size)!
      view?.bounds = (iconView?.bounds)!
      view?.centerOffset = CGPoint(x: 0, y: -size.height / 2)
    }
  }

  func updateCenterOffset() {
    if centerOffset == nil, view != nil {
      let size: CGSize = (view?.image.size)!
      view?.centerOffset = CGPoint(x: 0, y: -size.height / 2)
    }
  }

  func getView() -> MAAnnotationView {
    if view == nil {
      view = MAAnnotationView(annotation: annotation, reuseIdentifier: nil)
      if icon == nil && iconView == nil {
        view?.image = MAPinAnnotationView(annotation: annotation, reuseIdentifier: nil).image
      }
      view?.isDraggable = draggable
      view?.zIndex = zIndex
      if centerOffset != nil {
        view?.centerOffset = centerOffset!
      }
      if icon != nil {
        view?.image = icon
        updateCenterOffset()
      }
      if iconView != nil {
        let button = UIButton()
        button.addSubview(iconView!)
        view?.addSubview(button)
        update()
      }
    }
    return view!
  }
}
