package qiuxiang.amap3d.map_view

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

class MapInfoWindow(context: Context) : ReactViewGroup(context) {
  init {
    addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
      val layoutParams = this.layoutParams
      if (layoutParams == null || layoutParams.width != this.width || layoutParams.height != this.height) {
        this.layoutParams = LayoutParams(this.width, this.height)
      }
    }
  }
}