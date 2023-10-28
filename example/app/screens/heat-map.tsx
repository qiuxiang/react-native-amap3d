import * as React from "react";
import { StyleSheet } from "react-native";
import { HeatMap, MapView } from "react-native-amap3d";

const coordinates = new Array(200).fill(0).map(() => ({
  latitude: 39.5 + Math.random(),
  longitude: 116 + Math.random(),
}));

export default () => (
  <MapView initialCameraPosition={{ zoom: 9 }} style={StyleSheet.absoluteFill}>
    <HeatMap opacity={0.8} radius={20} data={coordinates} />
  </MapView>
);
