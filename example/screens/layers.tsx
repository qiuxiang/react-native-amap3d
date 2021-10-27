import * as React from "react";
import { Platform, StyleProp, StyleSheet, Switch, Text, View, ViewStyle } from "react-native";
import { MapView } from "react-native-amap3d";
import commonStyles from "../styles";

export default class extends React.Component {
  state = {
    buildingsEnabled: true,
    trafficEnabled: false,
    indoorViewEnabled: false,
  };

  render() {
    const controlStyle: StyleProp<ViewStyle> = [commonStyles.control, { flexDirection: "row" }];
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          {...this.state}
          initialCameraPosition={{
            target: { latitude: 39.9098, longitude: 116.37296 },
            zoom: 18,
            tilt: 45,
          }}
          style={style.map}
        />
        <View style={style.controls}>
          <View style={controlStyle}>
            <Text style={style.label}>建筑</Text>
            <Switch
              onValueChange={(buildingsEnabled) => this.setState({ buildingsEnabled })}
              value={this.state.buildingsEnabled}
            />
          </View>
          <View style={controlStyle}>
            <Text style={style.label}>路况</Text>
            <Switch
              onValueChange={(trafficEnabled) => this.setState({ trafficEnabled })}
              value={this.state.trafficEnabled}
            />
          </View>
          <View style={controlStyle}>
            <Text style={style.label}>室内地图</Text>
            <Switch
              onValueChange={(indoorViewEnabled) => this.setState({ indoorViewEnabled })}
              value={this.state.indoorViewEnabled}
            />
          </View>
        </View>
      </View>
    );
  }
}

const style = {
  ...commonStyles,
  map: [commonStyles.map, Platform.select({ ios: { marginBottom: 54 } })],
  controls: [commonStyles.controls, { height: 54 }],
  label: { marginRight: 5 },
};
