package cn.qiuxiang.react.amap3d.poi

import com.amap.api.services.poisearch.PoiSearch
import com.facebook.react.bridge.Promise

class AMapPOIKeyWordsSearchReq(keyword: String, type: String, cityCode: String) : PoiSearch.Query(keyword, type, cityCode) {
    var promise: Promise? = null
}