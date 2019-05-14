import { number, func, shape, string } from "prop-types";

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
  strokeWidth: number
});

export const mapEventsPropType = events =>
  events.reduce((props, event) => {
    props[event.replace(/^on/, "onBaiduMap")] = func;
    return props;
  }, {});
