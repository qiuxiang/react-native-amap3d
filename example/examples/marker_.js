import React, { Component,useState } from "react";
import { MapView } from "react-native-amap3d";
import { Alert, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";

const Coordinates = {
  latitude: 39.806901,
  longitude: 116.397972 
}

const _coordinates = [
{
  latitude: 39.806901,
  longitude: 116.29797
},
{
  latitude: 39.906901,
  longitude: 116.397972
},
{
  latitude: 39.706901,
  longitude: 116.397972
}
];
export const MyMarker = ()=> {

   const [list, setList] = useState(_coordinates)


      return (
        <MapView style={StyleSheet.absoluteFill}>
           {
            list.map( k => <MapView.Marker 
                coordinate = {k}
            />)
           }
           <MapView.Marker color="green" coordinate={Coordinates} >
          <Pressable 
          activeOpacity={0.5}
          hitSlop = {500}
          onPress={()=> {
           setList([_coordinates[0]])
            Alert.alert("tesssst", "tsc")
          }}>
            <View style={styles.customInfoWindow} >
              <Text>自定义信息窗口</Text>
              <Text>奥</Text>
            </View>
          </Pressable>
        </MapView.Marker> 
        </MapView>
        )

}

const styles = StyleSheet.create({
  customIcon: {
    width: 40,
    height: 40
  },
  customInfoWindow: {
    backgroundColor: "#8bc34a",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#689F38",
    marginBottom: 5
  },
  customMarker: {
    backgroundColor: "#009688",
    alignItems: "center",
    borderRadius: 5,
    padding: 5
  },
  markerText: {
    color: "#fff"
  }
});
