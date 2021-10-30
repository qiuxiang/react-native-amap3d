@objc(AMapOffline)
class Offline: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    false
  }

  @objc func removeListeners(_ name: Int) {
  }

  @objc func addListener(_ eventType: String) {
  }

  @objc func download(_ name: String) {
  }
}
