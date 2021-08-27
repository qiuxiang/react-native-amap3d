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
var PropTypes = require("prop-types");
var react_native_1 = require("react-native");
var prop_types_1 = require("../prop-types");
/**
 * @ignore
 */
var Polyline = /** @class */ (function (_super) {
    __extends(Polyline, _super);
    function Polyline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Polyline.prototype.render = function () {
        var props = __assign(__assign({}, this.props), react_native_1.Platform.select({
            android: {
                colors: this.props.colors.map(react_native_1.processColor)
            }
        }));
        return <AMapPolyline {...props}/>;
    };
    Polyline.propTypes = __assign(__assign({}, react_native_1.ViewPropTypes), { coordinates: PropTypes.arrayOf(prop_types_1.LatLngPropType).isRequired, width: PropTypes.number, color: react_native_1.ColorPropType, zIndex: PropTypes.number, colors: PropTypes.arrayOf(react_native_1.ColorPropType), gradient: PropTypes.bool, geodesic: PropTypes.bool, dashed: PropTypes.bool, onAMapPress: PropTypes.func });
    Polyline.defaultProps = {
        colors: []
    };
    return Polyline;
}(React.PureComponent));
exports["default"] = Polyline;
// @ts-ignore
var AMapPolyline = react_native_1.requireNativeComponent("AMapPolyline", Polyline);
