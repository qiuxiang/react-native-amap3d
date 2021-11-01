@objc(AMapSdk)
class AMapSdk: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    false
  }

  @objc func setApiKey(_ apiKey: String) {
    AMapServices.shared().apiKey = apiKey
  }

  @objc func getVersion(_ resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
    resolve("8.0.1")
  }
}
