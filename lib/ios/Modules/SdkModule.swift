@objc(AMapSdk)
class AMapSdk: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    false
  }

  @objc func initSDK(_ apiKey: String) {
    AMapServices.shared().apiKey = apiKey
    MAMapView.updatePrivacyAgree(AMapPrivacyAgreeStatus.didAgree)
    MAMapView.updatePrivacyShow(AMapPrivacyShowStatus.didShow, privacyInfo: AMapPrivacyInfoStatus.didContain)
  }

  @objc func getVersion(_ resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
    resolve("8.0.1")
  }
}
