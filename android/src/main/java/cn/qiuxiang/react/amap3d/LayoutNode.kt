package cn.qiuxiang.react.amap3d

import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.UIViewOperationQueue

class LayoutNode : LayoutShadowNode() {
    override fun onCollectExtraUpdates(operationQueue: UIViewOperationQueue) {
        super.onCollectExtraUpdates(operationQueue)
        operationQueue.enqueueUpdateExtraData(reactTag, Layout(
                layoutWidth.toInt(),
                layoutHeight.toInt()))
    }

    data class Layout(var width: Int, var height: Int)
}
