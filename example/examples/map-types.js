import React, { Component } from "react";
import { StyleSheet, Picker } from "react-native";
import { MapView, MapType } from "react-native-amap3d";

export default class MapTypesExample extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    state.params = state.params || { mapType: MapType.Standard };
    const props = {
      mode: "dropdown",
      style: { width: 100 },
      selectedValue: state.params.mapType,
      onValueChange: mapType => setParams({ mapType })
    };
    return {
      title: "地图模式",
      headerRight: (
        <Picker {...props}>
          <Picker.Item label="标准" value={MapType.Standard} />
          <Picker.Item label="卫星" value={MapType.Satellite} />
          <Picker.Item label="导航" value={MapType.Navi} />
          <Picker.Item label="夜间" value={MapType.Night} />
          <Picker.Item label="公交" value={MapType.Bus} />
        </Picker>
      )
    };
  };

  render() {
    return (
      <MapView
        mapType={this.props.navigation.state.params.mapType}
        style={StyleSheet.absoluteFill}
      />
    );
  }
}
