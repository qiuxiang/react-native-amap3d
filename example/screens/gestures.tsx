import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { MapView } from "react-native-amap3d";
import SwitchWithLabel from "../components/switch-with-label";

export default () => {
  const { colors } = useTheme();
  const [zoomGesturesEnabled, setZoomGesturesEnabled] = React.useState(false);
  const [scrollGesturesEnabled, setScrollGesturesEnabled] = React.useState(false);
  const [rotateGesturesEnabled, setRotateGesturesEnabled] = React.useState(false);
  const [tiltGesturesEnabled, setTiltGesturesEnabled] = React.useState(false);
  const props = {
    zoomGesturesEnabled,
    scrollGesturesEnabled,
    rotateGesturesEnabled,
    tiltGesturesEnabled,
  };
  return (
    <>
      <MapView {...props} />
      <View style={{ flexDirection: "row", backgroundColor: colors.background }}>
        <SwitchWithLabel
          label="缩放"
          value={zoomGesturesEnabled}
          onChange={setZoomGesturesEnabled}
        />
        <SwitchWithLabel
          label="滑动"
          value={scrollGesturesEnabled}
          onChange={setScrollGesturesEnabled}
        />
        <SwitchWithLabel
          label="旋转"
          value={rotateGesturesEnabled}
          onChange={setRotateGesturesEnabled}
        />
        <SwitchWithLabel
          label="倾斜"
          value={tiltGesturesEnabled}
          onChange={setTiltGesturesEnabled}
        />
      </View>
    </>
  );
};
