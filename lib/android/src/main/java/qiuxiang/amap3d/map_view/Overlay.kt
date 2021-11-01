package qiuxiang.amap3d.map_view

import com.amap.api.maps.AMap

interface Overlay {
  fun add(map: AMap)
  fun remove()
}