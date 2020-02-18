package cn.qiuxiang.react.amap3d.poi

import com.amap.api.services.poisearch.PoiSearch
import com.facebook.react.bridge.*
import com.facebook.react.bridge.Arguments.createArray
import com.facebook.react.bridge.Arguments.createMap


class AMapPOIKeywordsSearch internal constructor(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var poiSearch: PoiSearch? = null

    override fun getName(): String {
        return "AMapPOIKeywordsSearchManager"
    }

    @ReactMethod
    fun keywordsSearchWithOptions(options: ReadableMap, promise: Promise) {
        try {
            var keywords = ""
            if (options.hasKey("keywords")) {
                keywords = options.getString("keywords")!!
            } else {
                promise.reject("", "keywords is empty")
                return
            }
            if(keywords.isEmpty()){
                promise.resolve(createArray())
                return
            }

            var types = ""
            if (options.hasKey("types")) {
                types = options.getString("types")!!
            }

            var cityCode = ""
            if (options.hasKey(("cityCode"))) {
                cityCode = options.getString("cityCode")!!
            }

            var query = AMapPOIKeyWordsSearchReq(keywords, types, "")


            if (options.hasKey("pageSize")) {
                query.pageSize = options.getInt("pageSize")
            }

            if (options.hasKey("pageNum")) {
                query.pageNum = options.getInt("pageNum")
            }
            poiSearch = PoiSearch(this.reactContext, query)
            val result = poiSearch!!.searchPOI()
            if (result != null) {
                val poiArray = createArray()
                for (poi in result.pois) {
                    val poiMap = createMap()
                    poiMap.putString("uid", poi.poiId)
                    poiMap.putString("name", poi.title)
                    poiMap.putString("type", poi.typeDes)
                    poiMap.putString("typeCode", poi.typeCode)
                    poiMap.putDouble("latitude", poi.latLonPoint.latitude)
                    poiMap.putDouble("longitude", poi.latLonPoint.longitude)
                    poiMap.putString("address", poi.snippet)
                    poiMap.putString("tel", poi.tel)
                    poiMap.putInt("distance", poi.distance)
                    poiMap.putString("cityCode", poi.cityCode)
                    poiMap.putString("cityName", poi.cityName)
                    poiMap.putString("provinceCode", poi.provinceCode)
                    poiMap.putString("provinceName", poi.provinceName)
                    poiMap.putString("adCode", poi.adCode)
                    poiMap.putString("adName", poi.adName)
                    poiArray.pushMap(poiMap)
                }
                promise.resolve(poiArray)
            }
        } catch (e: Exception) {
            promise.reject("-1",e.message)
        }

    }


}
