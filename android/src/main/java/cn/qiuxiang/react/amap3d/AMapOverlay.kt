package cn.qiuxiang.react.amap3d

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

class AMapOverlay(context: Context) : ReactViewGroup(context) {
    private var onUpdateListener: OnUpdateListener? = null

    fun setOnUpdateListener(listener: OnUpdateListener) {
        onUpdateListener = listener
    }

    fun update() {
        onUpdateListener?.onUpdate()
    }

    interface OnUpdateListener {
        fun onUpdate()
    }
}
