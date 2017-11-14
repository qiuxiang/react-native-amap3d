import React, {Component} from 'react'
import {Offline} from 'react-native-amap3d'

export default class IndoorExample extends Component {
  static navigationOptions = {
    title: '离线地图',
  }

  componentDidMount() {
    // Offline.download('铜陵市')
    setTimeout(async () => {
      console.log(await Offline.getProvinces())
    }, 2000)
  }

  render() {
    return null
  }
}
