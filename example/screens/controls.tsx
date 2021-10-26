import * as React from "react";
import { PermissionsAndroid, StyleSheet, Switch, Text, View } from "react-native";
import { MapView } from "react-native-amap3d";
import styles from "../styles";

export default class extends React.Component {
  state = {
    compassEnabled: false,
    scaleControlsEnabled: true,
    zoomControlsEnabled: true,
    myLocationButtonEnabled: false,
  };

  componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          compassEnabled={this.state.compassEnabled}
          scaleControlsEnabled={this.state.scaleControlsEnabled}
          myLocationEnabled={this.state.myLocationButtonEnabled}
          myLocationButtonEnabled={this.state.myLocationButtonEnabled}
          zoomControlsEnabled={this.state.zoomControlsEnabled}
          style={styles.map}
        />
        <View style={styles.controls}>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(compassEnabled) => this.setState({ compassEnabled })}
              value={this.state.compassEnabled}
            />
            <Text>指南针</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(scaleControlsEnabled) => this.setState({ scaleControlsEnabled })}
              value={this.state.scaleControlsEnabled}
            />
            <Text>比例尺</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(myLocationButtonEnabled) =>
                this.setState({ myLocationButtonEnabled })
              }
              value={this.state.myLocationButtonEnabled}
            />
            <Text>定位按钮</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(zoomControlsEnabled) => this.setState({ zoomControlsEnabled })}
              value={this.state.zoomControlsEnabled}
            />
            <Text>缩放按钮</Text>
          </View>
        </View>
      </View>
    );
  }
}
