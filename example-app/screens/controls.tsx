import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { MapView } from "react-native-amap3d";
import SwitchWithLabel from "../components/switch-with-label";

export default () => {
  const { colors } = useTheme();
  const [compassEnabled, setCompassEnabled] = React.useState(false);
  const [scaleControlsEnabled, setScaleControlsEnabled] = React.useState(true);
  const [zoomControlsEnabled, setZoomControlsEnabled] = React.useState(true);
  const [myLocationButtonEnabled, setMyLocationButtonEnabled] = React.useState(false);
  const props = {
    compassEnabled,
    scaleControlsEnabled,
    zoomControlsEnabled,
    myLocationButtonEnabled,
  };
  return (
    <>
      <MapView {...props} />
      <View style={{ flexDirection: "row", backgroundColor: colors.background }}>
        <SwitchWithLabel label="指南针" value={compassEnabled} onChange={setCompassEnabled} />
        <SwitchWithLabel
          label="比例尺"
          value={scaleControlsEnabled}
          onChange={setScaleControlsEnabled}
        />
        <SwitchWithLabel
          label="缩放控件"
          value={zoomControlsEnabled}
          onChange={setZoomControlsEnabled}
        />
        <SwitchWithLabel
          label="定位按钮"
          value={myLocationButtonEnabled}
          onChange={setMyLocationButtonEnabled}
        />
      </View>
    </>
  );
};
