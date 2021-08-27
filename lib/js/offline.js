"use strict";
exports.__esModule = true;
exports.OfflineState = void 0;
var react_native_1 = require("react-native");
var AMapOffline = react_native_1.NativeModules.AMapOffline;
var eventEmitter = new react_native_1.NativeEventEmitter(AMapOffline);
var OfflineState;
(function (OfflineState) {
    OfflineState["Waiting"] = "waiting";
    OfflineState["Downloading"] = "downloading";
    OfflineState["Downloaded"] = "downloaded";
    OfflineState["Expired"] = "expired";
    OfflineState["Unzip"] = "unzip";
})(OfflineState = exports.OfflineState || (exports.OfflineState = {}));
var Offline = /** @class */ (function () {
    function Offline() {
    }
    /**
     * 获取所有省份
     */
    Offline.getProvinces = function () {
        return AMapOffline.getProvinces();
    };
    /**
     * 获取所有城市
     */
    Offline.getCities = function () {
        return AMapOffline.getCities();
    };
    /**
     * 下载离线地图
     *
     * @param name 城市名或省份名
     */
    Offline.download = function (name) {
        AMapOffline.download(name);
    };
    /**
     * 移除离线地图
     *
     * @param name 城市名或省份名
     */
    Offline.remove = function (name) {
        AMapOffline.remove(name);
    };
    /**
     * 添加下载监听器
     */
    Offline.addDownloadListener = function (callback) {
        return eventEmitter.addListener("download", callback);
    };
    return Offline;
}());
exports["default"] = Offline;
