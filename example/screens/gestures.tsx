import * as React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { MapView } from "react-native-amap3d";
import styles from "../styles";

export default class extends React.Component {
  state = {
    zoomGesturesEnabled: false,
    scrollGesturesEnabled: false,
    rotateGesturesEnabled: false,
    tiltGesturesEnabled: false,
  };

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          zoomGesturesEnabled={this.state.zoomGesturesEnabled}
          scrollGesturesEnabled={this.state.scrollGesturesEnabled}
          rotateGesturesEnabled={this.state.rotateGesturesEnabled}
          tiltGesturesEnabled={this.state.tiltGesturesEnabled}
          style={styles.map}
        />
        <View style={styles.controls}>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(rotateGesturesEnabled) => this.setState({ rotateGesturesEnabled })}
              value={this.state.rotateGesturesEnabled}
            />
            <Text>旋转</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(scrollGesturesEnabled) => this.setState({ scrollGesturesEnabled })}
              value={this.state.scrollGesturesEnabled}
            />
            <Text>滑动</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(zoomGesturesEnabled) => this.setState({ zoomGesturesEnabled })}
              value={this.state.zoomGesturesEnabled}
            />
            <Text>缩放</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(tiltGesturesEnabled) => this.setState({ tiltGesturesEnabled })}
              value={this.state.tiltGesturesEnabled}
            />
            <Text>倾斜</Text>
          </View>
        </View>
      </View>
    );
  }
}
