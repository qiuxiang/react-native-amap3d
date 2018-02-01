import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-amap3d'

export default class HeatMapExample extends Component {
  static navigationOptions = {
    title: '热力图',
  }

  _coordinates = (new Array(200)).fill(0).map(() => ({
    latitude: 39.5 + Math.random(),
    longitude: 116 + Math.random(),
  }))

  render() {
    return (
      <MapView zoomLevel={9} style={StyleSheet.absoluteFill}>
        <MapView.HeatMap
          opacity={0.8}
          radius={20}
          coordinates={this._coordinates}
        />
      </MapView>
    )
  }
}
