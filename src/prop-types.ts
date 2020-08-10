import { number, func, shape, string, bool, arrayOf } from "prop-types";

export const LatLngPropType = shape({
  latitude: number.isRequired,
  longitude: number.isRequired
});

export const RegionPropType = shape({
  latitude: number.isRequired,
  longitude: number.isRequired,
  latitudeDelta: number.isRequired,
  longitudeDelta: number.isRequired
});

export const PointPropType = shape({
  x: number.isRequired,
  y: number.isRequired
});

export const LocationStylePropType = shape({
  image: string,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
  showLocation: bool, // Android only
  anchor: arrayOf(number), // Android only
  locationDotBgColor: string, // iOS only
  locationDotFillColor: string, // iOS only
  enablePulseAnnimation: bool, // iOS only
  showsHeadingIndicator: bool, // iOS only
  showsAccuracyRing: bool, // iOS only
});

export const mapEventsPropType = events =>
  events.reduce((props, event) => {
    props[event.replace(/^on/, "onAMap")] = func;
    return props;
  }, {});
