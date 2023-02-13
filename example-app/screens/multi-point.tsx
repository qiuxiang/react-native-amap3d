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
  <MapView initialCameraPosition={{ zoom: 12 }} style={StyleSheet.absoluteFill}>
    <MultiPoint
      icon={require("../images/point.png")}
      items={points}
      onPress={({ nativeEvent }) => alert(nativeEvent.index)}
    />
  </MapView>
);
