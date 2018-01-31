import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-amap3d'

export default class CircleExample extends Component {
  static navigationOptions = {
    title: '绘制圆形',
  }

  coordinate = {
    latitude: 39.906901,
    longitude: 116.397972,
  }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill}>
        <MapView.Circle
          strokeWidth={5}
          strokeColor="rgba(0, 0, 255, 0.5)"
          fillColor="rgba(255, 0, 0, 0.5)"
          radius={10000}
          coordinate={this.coordinate}
        />
      </MapView>
    )
  }
}
