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
var PointPropType = PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string
});
/**
 * @ignore
 */
var MultiPoint = /** @class */ (function (_super) {
    __extends(MultiPoint, _super);
    function MultiPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onItemPress = function (_a) {
            var nativeEvent = _a.nativeEvent;
            if (_this.props.onItemPress) {
                _this.props.onItemPress(_this.props.points[nativeEvent.index]);
            }
        };
        return _this;
    }
    MultiPoint.prototype.render = function () {
        // @ts-ignore
        return <AMapMultiPoint {...this.props} onItemPress={this.onItemPress}/>;
    };
    MultiPoint.propTypes = __assign(__assign({}, react_native_1.ViewPropTypes), { points: PropTypes.arrayOf(PointPropType).isRequired, image: PropTypes.string, onItemPress: PropTypes.func });
    return MultiPoint;
}(React.PureComponent));
exports["default"] = MultiPoint;
// @ts-ignore
var AMapMultiPoint = react_native_1.requireNativeComponent("AMapMultiPoint", MultiPoint);
