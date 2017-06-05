package cn.qiuxiang.react.amap3d

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

class AMapOverlay(context: Context) : ReactViewGroup(context) {
    private var updateHandler: (() -> Unit)? = null

    fun onUpdate(handler: () -> Unit) {
        updateHandler = handler
    }

    fun update() {
        updateHandler?.invoke()
    }
}
