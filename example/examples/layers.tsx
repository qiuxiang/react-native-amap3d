import * as React from "react";
import { Platform, StyleProp, StyleSheet, Switch, Text, View, ViewStyle } from "react-native";
import { MapView } from "react-native-amap3d";
import commonStyles from "../styles";

export default class Layers extends React.Component {
  state = {
    showsLabels: true,
    showsTraffic: false,
    showsBuildings: false,
  };

  render() {
    const controlStyle: StyleProp<ViewStyle> = [commonStyles.control, { flexDirection: "row" }];
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          zoomLevel={17}
          tilt={60}
          showsLabels={this.state.showsLabels}
          showsTraffic={this.state.showsTraffic}
          showsBuildings={this.state.showsBuildings}
          style={style.map}
        />
        <View style={style.controls}>
          <View style={controlStyle}>
            <Text style={style.label}>建筑</Text>
            <Switch
              onValueChange={(showsBuildings) => this.setState({ showsBuildings })}
              value={this.state.showsBuildings}
            />
          </View>
          <View style={controlStyle}>
            <Text style={style.label}>路况</Text>
            <Switch
              onValueChange={(showsTraffic) => this.setState({ showsTraffic })}
              value={this.state.showsTraffic}
            />
          </View>
          <View style={controlStyle}>
            <Text style={style.label}>标签</Text>
            <Switch
              onValueChange={(showsLabels) => this.setState({ showsLabels })}
              value={this.state.showsLabels}
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
