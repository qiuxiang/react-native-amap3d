import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Drive} from 'react-native-amap3d'

export default class NavigationExample extends Component {
  static navigationOptions = {
    title: '导航',
  }

  componentDidMount() {
    this._navigation.calculateRoute(
      {
        latitude: 39.906901,
        longitude: 116.397972,
      },
      {
        latitude: 39.806901,
        longitude: 116.397972,
      }
    )
  }

  _start = () => {}

  render() {
    return <Drive
      ref={ref => this._navigation = ref}
      style={StyleSheet.absoluteFill}
      onCalculateRouteSuccess={this._start}
    />
  }
}
