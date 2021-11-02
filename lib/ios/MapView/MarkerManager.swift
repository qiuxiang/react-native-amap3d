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

  @objc var draggable = false { didSet { view?.isDraggable = draggable } }
  @objc var zIndex = 1 { didSet { view?.zIndex = zIndex } }
  @objc var centerOffset = CGPoint() { didSet { view?.centerOffset = centerOffset } }

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
        DispatchQueue.main.async {
          self.icon = image
          self.view?.image = image
        }
      }
    )
  }

  @objc func setLatLng(_ coordinate: CLLocationCoordinate2D) {
    annotation.coordinate = coordinate
  }
  
  @objc func gaction(_ recognizer: UITapGestureRecognizer) {
    onPress(nil)
  }
  
  override func didAddSubview(_ subview: UIView) {
    iconView = subview
  }

  func update() {}

  func getView() -> MAAnnotationView {
    if view == nil {
      view = MAPinAnnotationView(annotation: annotation, reuseIdentifier: nil)
      view?.isDraggable = draggable
      view?.zIndex = zIndex
      view?.centerOffset = centerOffset
      if icon != nil {
        view?.image = icon
      }
      if iconView != nil {
        view?.addSubview(iconView!)
        view?.image = nil
      }
      view?.addGestureRecognizer(UIGestureRecognizer(target: self, action: #selector(gaction)))
    }
    return view!
  }
}
