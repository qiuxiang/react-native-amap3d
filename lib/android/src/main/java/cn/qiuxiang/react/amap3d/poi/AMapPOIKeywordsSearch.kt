package cn.qiuxiang.react.amap3d.poi

import com.amap.api.services.core.PoiItem
import com.amap.api.services.poisearch.PoiResult
import com.amap.api.services.poisearch.PoiSearch
import com.amap.api.services.poisearch.PoiSearch.OnPoiSearchListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments.createMap
import com.facebook.react.bridge.Arguments.createArray


class AMapPOIKeywordsSearch internal constructor(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), OnPoiSearchListener {
    private var poiSearch: PoiSearch? = null

    override fun getName(): String {
        return "AMapPOIKeywordsSearchManager"
    }

    @ReactMethod
    fun keywordsSearchWithOptions(options: ReadableMap, promise: Promise) {
        var keywords = ""
        if (options.hasKey("keywords")) {
            keywords = options.getString("keywords")!!
        } else {
            promise.reject("", "keywords is empty")
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

        var query = AMapPOIKeyWordsSearchReq(keywords, types, cityCode)

        query.promise = promise

        if (options.hasKey("pageSize")) {
            query!!.pageSize = options.getInt("pageSize")
        }

        if (options.hasKey("pageNum")) {
            query!!.pageNum = options.getInt("pageNum")
        }

        poiSearch = PoiSearch(this.reactContext, query)

        poiSearch!!.setOnPoiSearchListener(this)

        poiSearch!!.searchPOIAsyn()
    }

    override fun onPoiSearched(result: PoiResult, rCode: Int) {
        if (1000 == rCode) {
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
            (result.query as AMapPOIKeyWordsSearchReq).promise!!.resolve(poiArray);
        } else {
            (result.query as AMapPOIKeyWordsSearchReq).promise!!.reject(rCode.toString(), "error");
        }

    }

    override fun onPoiItemSearched(item: PoiItem, rCode: Int) {
        // TODO Auto-generated method stub

    }
}
