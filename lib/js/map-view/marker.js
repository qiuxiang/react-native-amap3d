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
var component_1 = require("./component");
var style = react_native_1.StyleSheet.create({
    overlay: {
        position: "absolute"
    }
});
var events = ["onInfoWindowPress", "onPress", "onDrag", "onDragEnd", "onDragStart"];
/**
 * @ignore
 */
var Marker = /** @class */ (function (_super) {
    __extends(Marker, _super);
    function Marker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nativeComponent = "AMapMarker";
        _this.icon = null;
        _this._ismounted = false;
        return _this;
    }
    Marker.prototype.componentDidMount = function () {
        this._ismounted = true;
    };
    Marker.prototype.componentWillUnmount = function () {
        this._ismounted = false;
    };
    Marker.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.icon && react_native_1.Platform.OS === "android") {
            setTimeout(function () { return _this._ismounted && _this.call("update"); }, 0);
        }
    };
    Marker.prototype.active = function () {
        this.call("active");
    };
    Marker.prototype.update = function () {
        this.call("update");
    };
    Marker.prototype.lockToScreen = function (x, y) {
        this.call("lockToScreen", [x, y]);
    };
    Marker.prototype.renderCustomMarker = function (icon) {
        if (icon) {
            this.icon = <react_native_1.View style={style.overlay}>{icon()}</react_native_1.View>;
            return this.icon;
        }
        return null;
    };
    /* eslint-disable class-methods-use-this */
    Marker.prototype.renderInfoWindow = function (view) {
        if (view) {
            // @ts-ignore
            return <InfoWindow style={style.overlay}>{view}</InfoWindow>;
        }
        return null;
    };
    Marker.prototype.render = function () {
        var props = __assign(__assign({}, this.props), this.handlers(events));
        return (<AMapMarker {...props}>
        {this.renderCustomMarker(this.props.icon)}
        {this.renderInfoWindow(this.props.children)}
      </AMapMarker>);
    };
    Marker.propTypes = __assign(__assign(__assign({}, react_native_1.ViewPropTypes), prop_types_1.mapEventsPropType(events)), { coordinate: prop_types_1.LatLngPropType.isRequired, title: PropTypes.string, description: PropTypes.string, color: react_native_1.Platform.select({
            android: PropTypes.oneOf([
                "azure",
                "blue",
                "cyan",
                "green",
                "magenta",
                "orange",
                "red",
                "rose",
                "violet",
                "yellow",
            ]),
            ios: PropTypes.oneOf(["red", "green", "purple"])
        }), icon: PropTypes.func, image: PropTypes.string, opacity: PropTypes.number, draggable: PropTypes.bool, flat: PropTypes.bool, zIndex: PropTypes.number, anchor: prop_types_1.PointPropType, centerOffset: prop_types_1.PointPropType, active: PropTypes.bool, clickDisabled: PropTypes.bool, infoWindowDisabled: PropTypes.bool });
    return Marker;
}(component_1["default"]));
exports["default"] = Marker;
// @ts-ignore
var AMapMarker = react_native_1.requireNativeComponent("AMapMarker", Marker);
// @ts-ignore
var InfoWindow = react_native_1.requireNativeComponent("AMapInfoWindow", { propTypes: __assign({}, react_native_1.ViewPropTypes) });
