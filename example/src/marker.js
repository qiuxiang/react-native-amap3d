import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {MapView, Marker} from 'react-native-amap3d'

export default class MarkerComponent extends Component {
  static navigationOptions = {
    title: '添加标记',
  }

  render() {
    return <MapView style={StyleSheet.absoluteFill}>
      <Marker draggable title='这是一个可拖拽的 Marker' coordinate={{
        latitude: 39.806901,
        longitude: 116.397972,
      }}/>
      <Marker image='HUE_RED' title='其他颜色' coordinate={{
        latitude: 39.806901,
        longitude: 116.297972,
      }}/>
      <Marker image={require('../images/marker.png')} title='自定义图标' coordinate={{
        latitude: 39.906901,
        longitude: 116.397972,
      }}/>
    </MapView>
  }
}
