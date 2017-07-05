package cn.qiuxiang.react.amap3d

import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.LatLngBounds
import com.facebook.react.bridge.ReadableMap
import android.graphics.Color

/**
 * Created by yuekong on 2017/7/4.
 */
class AMapConverter {
    companion object {
        fun LatLng(map: ReadableMap): LatLng {
            return LatLng(map.getDouble("latitude"), map.getDouble("longitude"))
        }

        fun LatLngDelta(map: ReadableMap): LatLng {
            return LatLng(map.getDouble("latitudeDelta"), map.getDouble("longitudeDelta"))
        }

        fun LatLngBounds(map: ReadableMap): LatLngBounds {
            val center = LatLng(map.getMap("center"))
            val span = LatLngDelta(map.getMap("span"))
            return LatLngBounds(
                    LatLng(center.latitude - span.latitude, center.longitude - span.longitude),
                    LatLng(center.latitude + span.latitude, center.longitude + span.longitude)
            )
        }

        fun color(color: Int, opacity: Float): Int {
            return Color.argb(((opacity * Color.alpha(color)).toInt()), Color.red(color), Color.green(color), Color.blue(color))
        }
    }
}