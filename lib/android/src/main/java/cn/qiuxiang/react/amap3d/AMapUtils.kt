package cn.qiuxiang.react.amap3d

import android.content.res.Resources

val Float.toPx: Int
    get() = (this * Resources.getSystem().displayMetrics.density).toInt()
