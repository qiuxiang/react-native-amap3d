import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { MapView, Marker } from "react-native-amap3d";

export default () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MapView initialCameraPosition={{ zoom: 11.2 }}>
      <Marker
        position={{ latitude: 39.806901, longitude: 116.397972 }}
        onPress={() => alert("onPress")}
        icon={require("../images/flag.png")}
      />
      <Marker
        onPress={() => alert("onPress")}
        position={{ latitude: 39.806901, longitude: 116.297972 }}
        icon={{
          uri: "https://reactnative.dev/img/pwa/manifest-icon-512.png",
          width: 64,
          height: 64,
        }}
      />
      <Marker
        position={{ latitude: 39.906901, longitude: 116.397972 }}
        onPress={() => alert("onPress")}
      >
        <Text style={style.customView}>{time.toLocaleString()}</Text>
      </Marker>
    </MapView>
  );
};

const style = StyleSheet.create({
  customView: {
    color: "#fff",
    backgroundColor: "#009688",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
});
