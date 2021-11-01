@objc(AMapOffline)
class Offline: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    false
  }

  @objc func removeListeners(_: Int) {}
  @objc func addListener(_: String) {}
  @objc func download(_: String) {}
}
