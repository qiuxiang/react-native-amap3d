import * as React from "react";
import { StyleSheet } from "react-native";
import { Circle, MapView } from "react-native-amap3d";

export default () => (
  <MapView style={StyleSheet.absoluteFill}>
    <Circle
      strokeWidth={5}
      strokeColor="rgba(0, 0, 255, 0.5)"
      fillColor="rgba(255, 0, 0, 0.5)"
      radius={10000}
      center={{ latitude: 39.906901, longitude: 116.397972 }}
    />
  </MapView>
);
