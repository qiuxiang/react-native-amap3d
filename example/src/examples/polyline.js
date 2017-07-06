import React, {Component} from 'react'
import {StyleSheet, Alert} from 'react-native'
import {MapView, Polyline} from 'react-native-amap3d'

export default class PolylineExample extends Component {
  static navigationOptions = {
    title: '绘制折线',
  }

  render() {
    return <MapView style={StyleSheet.absoluteFill}>
      <Polyline
        width={5}
        color='rgba(255, 0, 0, 0.5)'
        coordinates={[
          {
            latitude: 40.006901,
            longitude: 116.097972,
          },
          {
            latitude: 40.006901,
            longitude: 116.597972,
          },
        ]}/>
      <Polyline
        dashed
        width={5}
        coordinates={[
          {
            latitude: 39.906901,
            longitude: 116.097972,
          },
          {
            latitude: 39.906901,
            longitude: 116.597972,
          },
        ]}/>
      <Polyline
        gradient
        width={5}
        colors={['#f44336', '#2196f3', '#4caf50']}
        onPress={() => Alert.alert('onPress')}
        coordinates={[
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
        ]}/>
    </MapView>
  }
}
