import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { MapType, MapView } from "react-native-amap3d";
import { NavigationProps } from "../types";

export default () => {
  const navigation = useNavigation<NavigationProps>();
  const { params = { mapType: MapType.Standard } } = useRoute();
  const mapType = Reflect.get(params, "mapType");
  const headerRight = () => (
    <Picker
      mode="dropdown"
      style={{ width: 120 }}
      selectedValue={mapType}
      onValueChange={(mapType) => navigation.setParams({ mapType })}
    >
      <Picker.Item label="标准" value={MapType.Standard} />
      <Picker.Item label="卫星" value={MapType.Satellite} />
      <Picker.Item label="导航" value={MapType.Navi} />
      <Picker.Item label="夜间" value={MapType.Night} />
      <Picker.Item label="公交" value={MapType.Bus} />
    </Picker>
  );
  useEffect(() => navigation.setOptions({ headerRight }));
  return <MapView mapType={mapType} style={StyleSheet.absoluteFill} />;
};
