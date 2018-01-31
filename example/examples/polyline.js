import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { MapView } from 'react-native-amap3d'

export default class PolylineExample extends Component {
  static navigationOptions = {
    title: '绘制折线',
  }

  _line1 = [
    {
      latitude: 40.006901,
      longitude: 116.097972,
    },
    {
      latitude: 40.006901,
      longitude: 116.597972,
    },
  ]

  _line2 = [
    {
      latitude: 39.906901,
      longitude: 116.097972,
    },
    {
      latitude: 39.906901,
      longitude: 116.597972,
    },
  ]

  _line3 = [
    {
      latitude: 39.806901,
      longitude: 116.097972,
    },
    {
      latitude: 39.806901,
      longitude: 116.257972,
    },
    {
      latitude: 39.806901,
      longitude: 116.457972,
    },
    {
      latitude: 39.806901,
      longitude: 116.597972,
    },
  ]

  _onPress = () => Alert.alert('onPress')

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill}>
        <MapView.Polyline
          width={5}
          color="rgba(255, 0, 0, 0.5)"
          coordinates={this._line1}
        />
        <MapView.Polyline
          dashed
          width={5}
          coordinates={this._line2}
        />
        <MapView.Polyline
          gradient
          width={5}
          colors={['#f44336', '#2196f3', '#4caf50']}
          onPress={this._onPress}
          coordinates={this._line3}
        />
      </MapView>
    )
  }
}
