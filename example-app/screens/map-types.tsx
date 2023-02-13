import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MapType, MapView } from "react-native-amap3d";

export default () => {
  const [mapType, setMapType] = useState(MapType.Standard);
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView style={{ flex: 1 }} mapType={mapType} />
      <Picker
        style={{ backgroundColor: "#fff" }}
        selectedValue={mapType}
        onValueChange={setMapType}
      >
        <Picker.Item label="标准" value={MapType.Standard} />
        <Picker.Item label="卫星" value={MapType.Satellite} />
        <Picker.Item label="导航" value={MapType.Navi} />
        <Picker.Item label="夜间" value={MapType.Night} />
        <Picker.Item label="公交" value={MapType.Bus} />
      </Picker>
    </View>
  );
};
