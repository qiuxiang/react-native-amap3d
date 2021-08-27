"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var prop_types_1 = require("prop-types");
var react_native_1 = require("react-native");
var prop_types_2 = require("../prop-types");
var component_1 = require("./component");
var marker_1 = require("./marker");
var polyline_1 = require("./polyline");
var polygon_1 = require("./polygon");
var circle_1 = require("./circle");
var heat_map_1 = require("./heat-map");
var multi_point_1 = require("./multi-point");
var events = [
    "onClick",
    "onLongClick",
    "onStatusChange",
    "onStatusChangeComplete",
    "onLocation",
    "onAnimateCancel",
    "onAnimateFinish"
];
/**
 * @ignore
 */
var MapView = /** @class */ (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nativeComponent = "AMapView";
        return _this;
    }
    /**
     * 设置地图状态（坐标、缩放级别、倾斜度、旋转角度），支持动画过度
     *
     * @param status
     * @param duration
     */
    MapView.prototype.setStatus = function (status, duration) {
        if (duration === void 0) { duration = 0; }
        this.call("setStatus", [status, duration]);
    };
    MapView.prototype.render = function () {
        var props = __assign(__assign({}, this.props), this.handlers(events));
        return <AMapView {...props}/>;
    };
    MapView.propTypes = __assign(__assign(__assign({}, react_native_1.ViewPropTypes), prop_types_2.mapEventsPropType(events)), { mapType: prop_types_1.number, locationEnabled: prop_types_1.bool, locationInterval: prop_types_1.number, locationStyle: prop_types_2.LocationStylePropType, distanceFilter: prop_types_1.number, showsIndoorMap: prop_types_1.bool, showsIndoorSwitch: prop_types_1.bool, showsBuildings: prop_types_1.bool, showsLabels: prop_types_1.bool, showsCompass: prop_types_1.bool, showsZoomControls: prop_types_1.bool, showsScale: prop_types_1.bool, showsLocationButton: prop_types_1.bool, showsTraffic: prop_types_1.bool, maxZoomLevel: prop_types_1.number, minZoomLevel: prop_types_1.number, zoomLevel: prop_types_1.number, center: prop_types_2.LatLngPropType, region: prop_types_2.RegionPropType, limitRegion: prop_types_2.RegionPropType, tilt: prop_types_1.number, rotation: prop_types_1.number, zoomEnabled: prop_types_1.bool, scrollEnabled: prop_types_1.bool, rotateEnabled: prop_types_1.bool, tiltEnabled: prop_types_1.bool });
    MapView.Marker = marker_1["default"];
    MapView.Polyline = polyline_1["default"];
    MapView.Polygon = polygon_1["default"];
    MapView.Circle = circle_1["default"];
    MapView.HeatMap = heat_map_1["default"];
    MapView.MultiPoint = multi_point_1["default"];
    return MapView;
}(component_1["default"]));
exports["default"] = MapView;
// @ts-ignore
var AMapView = react_native_1.requireNativeComponent("AMapView", MapView);
