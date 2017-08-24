package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

class AMapInfoWindow(context: Context) : ReactViewGroup(context) {
    init {
        addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
            val layoutParams = this.layoutParams
            if (layoutParams == null || layoutParams.width != this.width || layoutParams.height != this.height) {
                this.layoutParams = LayoutParams(this.width, this.height)
            }
        }
    }
}