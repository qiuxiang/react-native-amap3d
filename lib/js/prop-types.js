"use strict";
exports.__esModule = true;
exports.mapEventsPropType = exports.LocationStylePropType = exports.PointPropType = exports.RegionPropType = exports.LatLngPropType = void 0;
var prop_types_1 = require("prop-types");
exports.LatLngPropType = prop_types_1.shape({
    latitude: prop_types_1.number.isRequired,
    longitude: prop_types_1.number.isRequired
});
exports.RegionPropType = prop_types_1.shape({
    latitude: prop_types_1.number.isRequired,
    longitude: prop_types_1.number.isRequired,
    latitudeDelta: prop_types_1.number.isRequired,
    longitudeDelta: prop_types_1.number.isRequired
});
exports.PointPropType = prop_types_1.shape({
    x: prop_types_1.number.isRequired,
    y: prop_types_1.number.isRequired
});
exports.LocationStylePropType = prop_types_1.shape({
    image: prop_types_1.string,
    fillColor: prop_types_1.string,
    strokeColor: prop_types_1.string,
    strokeWidth: prop_types_1.number,
    showLocation: prop_types_1.bool,
    anchor: prop_types_1.arrayOf(prop_types_1.number),
    locationDotBgColor: prop_types_1.string,
    locationDotFillColor: prop_types_1.string,
    enablePulseAnnimation: prop_types_1.bool,
    showsHeadingIndicator: prop_types_1.bool,
    showsAccuracyRing: prop_types_1.bool
});
exports.mapEventsPropType = function (events) {
    return events.reduce(function (props, event) {
        props[event.replace(/^on/, "onAMap")] = prop_types_1.func;
        return props;
    }, {});
};
