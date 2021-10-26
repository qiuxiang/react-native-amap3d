import * as React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MapView } from "react-native-amap3d";

let mapView: MapView;

export default () => (
  <View style={style.body}>
    <MapView ref={(ref: MapView) => (mapView = ref)} style={style.body} />
    <View style={style.buttons}>
      <View style={style.button}>
        <TouchableOpacity
          onPress={() => {
            mapView?.moveCamera(
              {
                tilt: 45,
                bearing: 90,
                zoom: 18,
                target: { latitude: 39.97837, longitude: 116.31363 },
              },
              1000
            );
          }}
        >
          <Text style={style.text}>中关村</Text>
        </TouchableOpacity>
      </View>
      <View style={style.button}>
        <TouchableOpacity
          onPress={() => {
            mapView?.moveCamera(
              {
                tilt: 0,
                bearing: 0,
                zoom: 16,
                target: { latitude: 39.90864, longitude: 116.39745 },
              },
              1000
            );
          }}
        >
          <Text style={style.text}>天安门</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const style = StyleSheet.create({
  body: { flex: 1 },
  buttons: {
    width: Dimensions.get("window").width,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 16,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  text: { fontSize: 16, color: "#000" },
});
