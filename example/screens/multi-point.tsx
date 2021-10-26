import * as React from "react";
import { StyleSheet } from "react-native";
import { MapView, MultiPoint } from "react-native-amap3d";

const points = Array(1000)
  .fill(0)
  .map(() => ({
    latitude: 39.5 + Math.random(),
    longitude: 116 + Math.random(),
  }));

export default () => (
  <MapView style={StyleSheet.absoluteFill}>
    <MultiPoint
      image="point"
      points={points}
      onPress={({ nativeEvent }) => alert(nativeEvent.index)}
    />
  </MapView>
);
