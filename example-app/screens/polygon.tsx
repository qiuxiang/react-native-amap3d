import * as React from "react";
import { MapView, Polygon } from "react-native-amap3d";

const points = [
  {
    latitude: 39.806901,
    longitude: 116.397972,
  },
  {
    latitude: 39.806901,
    longitude: 116.297972,
  },
  {
    latitude: 39.906901,
    longitude: 116.397972,
  },
];

export default () => (
  <MapView initialCameraPosition={{ zoom: 11 }}>
    <Polygon
      strokeWidth={5}
      strokeColor="rgba(0, 0, 255, 0.5)"
      fillColor="rgba(255, 0, 0, 0.5)"
      points={points}
    />
  </MapView>
);
