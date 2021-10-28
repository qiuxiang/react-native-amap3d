import * as React from "react";
import { StyleSheet } from "react-native";
import { MapView, Polyline } from "react-native-amap3d";

const line1 = [
  { latitude: 40.006901, longitude: 116.097972 },
  { latitude: 40.006901, longitude: 116.597972 },
];

const line2 = [
  { latitude: 39.906901, longitude: 116.097972 },
  { latitude: 39.906901, longitude: 116.597972 },
];

const line3 = [
  { latitude: 39.806901, longitude: 116.097972 },
  { latitude: 39.806901, longitude: 116.257972 },
  { latitude: 39.806901, longitude: 116.457972 },
  { latitude: 39.806901, longitude: 116.597972 },
];

export default () => (
  <MapView style={StyleSheet.absoluteFill}>
    <Polyline width={5} color="rgba(255, 0, 0, 0.5)" points={line1} />
    <Polyline width={5} points={line2} dotted />
    <Polyline
      width={5}
      colors={["#f44336", "#2196f3", "#4caf50"]}
      onPress={() => alert("onPress")}
      points={line3}
      gradient
    />
  </MapView>
);
