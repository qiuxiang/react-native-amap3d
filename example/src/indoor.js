import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import MapView from 'react-native-amap3d'

export default class Indoor extends Component {
  static navigationOptions = {
    title: '室内地图',
  }

  render() {
    return <MapView
      showsIndoorMap={true}
      showsIndoorSwitch={true}
      style={StyleSheet.absoluteFill}/>
  }
}
