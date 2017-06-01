import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {MapView, Marker} from 'react-native-amap3d'

export default class MarkerComponent extends Component {
  static navigationOptions = {
    title: '添加标记',
  }

  render() {
    return <MapView style={StyleSheet.absoluteFill}>
      <Marker
        title='一个可拖拽的 Marker'
        draggable
        selected
        onDragEnd={({nativeEvent}) => console.log(nativeEvent)}
        coordinate={{
          latitude: 39.806901,
          longitude: 116.397972,
        }}
      />
      <Marker
        image='HUE_RED'
        title='一个红色的 Marker'
        coordinate={{
          latitude: 39.806901,
          longitude: 116.297972,
        }}
      />
      <Marker
        image={require('../images/marker.png')}
        title='自定义图片'
        coordinate={{
          latitude: 39.906901,
          longitude: 116.397972,
        }}
      />
    </MapView>
  }
}
