import React, { Component } from "react";
import { PermissionsAndroid, StyleSheet, Switch, Text, View } from "react-native";
import { MapView } from "react-native-amap3d";
import styles from "../styles";

export default class ControlsExample extends Component {
  static navigationOptions = {
    title: "地图控件"
  };

  state = {
    showsCompass: false,
    showsScale: true,
    showsZoomControls: true,
    showsLocationButton: false
  };

  componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          locationEnabled={this.state.showsLocationButton}
          showsCompass={this.state.showsCompass}
          showsScale={this.state.showsScale}
          showsLocationButton={this.state.showsLocationButton}
          showsZoomControls={this.state.showsZoomControls}
          style={styles.map}
        />
        <View style={styles.controls}>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={showsCompass => this.setState({ showsCompass })}
              value={this.state.showsCompass}
            />
            <Text>指南针</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={showsScale => this.setState({ showsScale })}
              value={this.state.showsScale}
            />
            <Text>比例尺</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={showsLocationButton => this.setState({ showsLocationButton })}
              value={this.state.showsLocationButton}
            />
            <Text>定位</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={showsZoomControls => this.setState({ showsZoomControls })}
              value={this.state.showsZoomControls}
            />
            <Text>缩放</Text>
          </View>
        </View>
      </View>
    );
  }
}
