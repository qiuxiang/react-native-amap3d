"use strict";
exports.__esModule = true;
exports.MapType = void 0;
/**
 * 地图类型
 */
var MapType;
(function (MapType) {
    /**
     * 标准地图
     */
    MapType[MapType["Standard"] = 0] = "Standard";
    /**
     * 卫星地图
     */
    MapType[MapType["Satellite"] = 1] = "Satellite";
    /**
     * 夜间地图
     */
    MapType[MapType["Night"] = 2] = "Night";
    /**
     * 导航地图
     */
    MapType[MapType["Navi"] = 3] = "Navi";
    /**
     * 公交地图
     */
    MapType[MapType["Bus"] = 4] = "Bus";
})(MapType = exports.MapType || (exports.MapType = {}));
