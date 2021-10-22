import * as React from "react";
import { StyleSheet } from "react-native";
import { MapView } from "react-native-amap3d";

export default () => (
  <MapView
    style={StyleSheet.absoluteFill}
    center={{ latitude: 39.9098, longitude: 116.37296 }}
    zoomLevel={18}
    tilt={45}
    showsIndoorMap
  />
);
