protocol Overlay: UIView {
  var overlay: MABaseOverlay? { get }
  func renderer() -> MAOverlayRenderer
}