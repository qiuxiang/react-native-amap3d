package cn.qiuxiang.react.amap3d.navigation

import com.facebook.react.uimanager.ThemedReactContext

class AMapDriveManager : AMapNavigationManager<AMapDrive>() {
    override fun getName(): String {
        return "AMapDrive"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapDrive {
        return AMapDrive(reactContext)
    }
}
