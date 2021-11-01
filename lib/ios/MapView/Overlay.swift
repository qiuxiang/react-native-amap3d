protocol Overlay: UIView {
  var overlay: MABaseOverlay? { get }
  func getRenderer() -> MAOverlayRenderer
}