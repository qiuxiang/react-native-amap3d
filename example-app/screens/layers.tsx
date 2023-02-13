import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { MapView } from "react-native-amap3d";
import SwitchWithLabel from "../components/switch-with-label";

export default () => {
  const { colors } = useTheme();
  const [buildingsEnabled, setBuildingsEnabled] = React.useState(true);
  const [trafficEnabled, setTrafficEnabled] = React.useState(false);
  const [indoorViewEnabled, setIndoorViewEnabled] = React.useState(false);
  const target = { latitude: 39.9098, longitude: 116.37296 };
  const initialCameraPosition = { target, zoom: 18, tilt: 45 };
  const props = { buildingsEnabled, trafficEnabled, indoorViewEnabled, initialCameraPosition };
  return (
    <>
      <MapView {...props} />
      <View style={{ flexDirection: "row", backgroundColor: colors.background }}>
        <SwitchWithLabel label="建筑" value={buildingsEnabled} onChange={setBuildingsEnabled} />
        <SwitchWithLabel label="路况" value={trafficEnabled} onChange={setTrafficEnabled} />
        <SwitchWithLabel label="室内图" value={indoorViewEnabled} onChange={setIndoorViewEnabled} />
      </View>
    </>
  );
};
