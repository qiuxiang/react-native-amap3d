import React from "react";
import { StyleSheet, Picker } from "react-native";
import { MapView, MapType } from "react-native-amap3d";

export default ({ navigation, route }) => {
  const { params = { mapType: MapType.Standard } } = route;
  const { mapType } = params;
  const props = {
    mode: "dropdown",
    style: { width: 100 },
    selectedValue: mapType,
    onValueChange: mapType => navigation.setParams({ mapType })
  };
  const headerRight = () => (
    <Picker {...props}>
      <Picker.Item label="标准" value={MapType.Standard} />
      <Picker.Item label="卫星" value={MapType.Satellite} />
      <Picker.Item label="导航" value={MapType.Navi} />
      <Picker.Item label="夜间" value={MapType.Night} />
      <Picker.Item label="公交" value={MapType.Bus} />
    </Picker>
  );
  navigation.setOptions({ headerRight });
  return <MapView mapType={mapType} style={StyleSheet.absoluteFill} />;
};
