import React, {Component} from 'react'
import {StyleSheet, View, Text, Switch} from 'react-native'
import AMapView from 'react-native-amap3d'

export default class Indoor extends Component {
  static navigationOptions = {
    title: '室内地图',
  }

  render() {
    return <AMapView
      showsIndoorMap={true}
      showsIndoorSwitch={true}
      style={StyleSheet.absoluteFill}/>
  }
}
