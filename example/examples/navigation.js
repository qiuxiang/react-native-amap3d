import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Navigation } from 'react-native-amap3d'

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
      },
      [
        {
          latitude: 39.866901,
          longitude: 116.407972,
        },
      ],
    )
  }

  _start = () => this._navigation.start()

  render() {
    return (
      <Navigation.Drive
        ref={ref => this._navigation = ref}
        style={StyleSheet.absoluteFill}
        onCalculateRouteSuccess={this._start}
      />
    )
  }
}
