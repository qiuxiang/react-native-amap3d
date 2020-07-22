import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { MapView } from "react-native-amap3d";

export default class IndoorExample extends Component {
  static navigationOptions = { title: "室内地图" };

  render() {
    return (
      <MapView
        style={StyleSheet.absoluteFill}
        center={{ latitude: 39.9098, longitude: 116.37296 }}
        zoomLevel={18}
        tilt={45}
        showsIndoorMap
      />
    );
  }
}
