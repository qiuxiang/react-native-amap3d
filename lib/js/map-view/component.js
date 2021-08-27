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
exports.__esModule = true;
/**
 * Base component, contains some utils
 */
var react_1 = require("react");
var react_native_1 = require("react-native");
/**
 * @ignore
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Generate event handlers
         */
        _this.handlers = function (events) {
            return events.reduce(function (handlers, name) {
                var handler = _this.props[name];
                if (handler) {
                    if (react_native_1.Platform.OS === "android") {
                        name = name.replace(/^on/, "onAMap");
                    }
                    handlers[name] = function (event) { return handler(event.nativeEvent); };
                }
                return handlers;
            }, {});
        };
        return _this;
    }
    /**
     * Call native method
     */
    Component.prototype.call = function (name, params) {
        var handle = react_native_1.findNodeHandle(this);
        if (handle) {
            var command = react_native_1.UIManager.getViewManagerConfig(this.nativeComponent).Commands[name];
            react_native_1.UIManager.dispatchViewManagerCommand(handle, command, params);
        }
    };
    return Component;
}(react_1.PureComponent));
exports["default"] = Component;
