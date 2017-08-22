package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

class AMapOverlay(context: Context) : ReactViewGroup(context) {
    private var updateHandler: (() -> Unit)? = null

    fun onUpdate(handler: () -> Unit) {
        updateHandler = handler
    }

    fun update() {
        val layoutParams = this.layoutParams
        if (layoutParams == null || layoutParams.width != this.width || layoutParams.height != this.height) {
            this.layoutParams = LayoutParams(this.width, this.height)
        }
        updateHandler?.invoke()
    }
}
