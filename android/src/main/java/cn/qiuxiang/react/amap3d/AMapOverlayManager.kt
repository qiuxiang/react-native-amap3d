package cn.qiuxiang.react.amap3d

import android.view.ViewGroup.LayoutParams
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class AMapOverlayManager : ViewGroupManager<AMapOverlay>() {
    override fun getName(): String {
        return "AMapOverlay"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapOverlay {
        return AMapOverlay(reactContext)
    }

    override fun getCommandsMap(): Map<String, Int> {
        return mapOf("update" to UPDATE)
    }

    override fun receiveCommand(overlay: AMapOverlay, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            UPDATE -> overlay.update()
        }
    }

    override fun createShadowNodeInstance(): LayoutShadowNode {
        return LayoutNode()
    }

    override fun updateExtraData(overlay: AMapOverlay, extraData: Any) {
        val data = extraData as LayoutNode.Layout
        overlay.layoutParams = LayoutParams(data.width, data.height)
    }

    companion object {
        val UPDATE = 1
    }
}
