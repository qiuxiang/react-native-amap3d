"use strict";
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
var PropTypes = require("prop-types");
var react_native_1 = require("react-native");
var prop_types_1 = require("../prop-types");
// @ts-ignore
exports["default"] = react_native_1.requireNativeComponent("AMapHeatMap", {
    propTypes: __assign(__assign({}, react_native_1.ViewPropTypes), { 
        /**
         * 节点坐标
         */
        coordinates: PropTypes.arrayOf(prop_types_1.LatLngPropType).isRequired, 
        /**
         * 半径（米）
         */
        radius: PropTypes.number, 
        /**
         * 透明度
         */
        opacity: PropTypes.number })
});
