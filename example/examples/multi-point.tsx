import * as React from "react";
import { Alert, StyleSheet } from "react-native";
import { MapView } from "react-native-amap3d";

const points = Array(1000)
  .fill(0)
  .map(() => ({
    latitude: 39.5 + Math.random(),
    longitude: 116 + Math.random(),
  }));

export default () => (
  <MapView zoomLevel={12} style={StyleSheet.absoluteFill}>
    <MapView.MultiPoint
      image="point"
      points={points}
      onItemPress={(point) => Alert.alert(points.indexOf(point).toString())}
    />
  </MapView>
);
