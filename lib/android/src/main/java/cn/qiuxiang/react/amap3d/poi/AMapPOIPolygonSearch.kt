package cn.qiuxiang.react.amap3d.poi

import com.amap.api.services.core.LatLonPoint
import com.amap.api.services.core.PoiItem
import com.amap.api.services.poisearch.PoiResult
import com.amap.api.services.poisearch.PoiSearch
import com.amap.api.services.poisearch.PoiSearch.OnPoiSearchListener
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments.createMap
import com.facebook.react.bridge.Arguments.createArray



class AMapPOIPolygonSearch internal constructor(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), OnPoiSearchListener {
    private var eventEmitter: DeviceEventManagerModule.RCTDeviceEventEmitter? = null
    private var query: PoiSearch.Query? = null
    private var poiSearch: PoiSearch? = null

    override fun getName(): String {
        return "AMapPOIPolygonSearch"
    }

    @ReactMethod
    fun init(promise: Promise) {
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        promise.resolve(null)
    }

    @ReactMethod
    fun onPOISearch(options: ReadableMap) {
        var keywords = ""
        if (options.hasKey("keywords")) {
            keywords = options.getString("keywords")!!
        }

        var types = ""
        if (options.hasKey("types")) {
            types = options.getString("types")!!
        }

        var cityCode = ""
        if (options.hasKey(("cityCode"))) {
            cityCode = options.getString("cityCode")!!
        }

        query = PoiSearch.Query(keywords, types, cityCode)

        if (options.hasKey("pageSize")) {
            query!!.pageSize = options.getInt("pageSize")
        }

        if (options.hasKey("pageNum")) {
            query!!.pageNum = options.getInt("pageNum")
        }

        poiSearch = PoiSearch(this.reactContext, query)

        val points = ArrayList<LatLonPoint>()
        if (options.hasKey("coordinates")) {
            val coordinates: ReadableArray = options.getArray("coordinates")!!

            for (i in 0..(coordinates.size() - 1)) {
                val point: ReadableMap? = coordinates.getMap(i)
                points.add(LatLonPoint(point!!.getDouble("latitude"), point!!.getDouble("longitude")))
            }
        }

        poiSearch!!.bound = PoiSearch.SearchBound(points)
        poiSearch!!.setOnPoiSearchListener(this)

        poiSearch!!.searchPOIAsyn()
    }

    override fun onPoiSearched(result: PoiResult, rCode: Int) {
        val resultMap = createMap()
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
            resultMap.putArray("pois", poiArray)
            resultMap.putInt("pageNum", result.query.pageNum)
            resultMap.putInt("pageSize", result.query.pageSize)
            resultMap.putInt("pageCount", result.pageCount)

            resultMap.putString("status", "OK")
        } else {
            val error = createMap()
            error.putString("code", rCode.toString())
            resultMap.putMap("error", error)
            resultMap.putString("status", "ERROR")
        }

        eventEmitter!!.emit("AMapPOIPolygonSearch", resultMap)
    }

    override fun onPoiItemSearched(item: PoiItem, rCode: Int) {
        // TODO Auto-generated method stub

    }
}
