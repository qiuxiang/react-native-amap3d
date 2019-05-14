import React, { Component } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { MapView } from "react-native-amap3d";
import styles from "../styles";

export default class GesturesExample extends Component {
  static navigationOptions = { title: "手势交互" };

  state = {
    zoomEnabled: true,
    scrollEnabled: true,
    rotateEnabled: true,
    tiltEnabled: true
  };

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          zoomEnabled={this.state.zoomEnabled}
          scrollEnabled={this.state.scrollEnabled}
          rotateEnabled={this.state.rotateEnabled}
          tiltEnabled={this.state.tiltEnabled}
          style={styles.map}
        />
        <View style={styles.controls}>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={rotateEnabled => this.setState({ rotateEnabled })}
              value={this.state.rotateEnabled}
            />
            <Text>旋转</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={scrollEnabled => this.setState({ scrollEnabled })}
              value={this.state.scrollEnabled}
            />
            <Text>滑动</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={zoomEnabled => this.setState({ zoomEnabled })}
              value={this.state.zoomEnabled}
            />
            <Text>缩放</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={tiltEnabled => this.setState({ tiltEnabled })}
              value={this.state.tiltEnabled}
            />
            <Text>倾斜</Text>
          </View>
        </View>
      </View>
    );
  }
}
