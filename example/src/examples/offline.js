import React, {Component} from 'react'
import {Offline} from 'react-native-amap3d'

// TODO: 提供完整的离线地图示例
export default class IndoorExample extends Component {
  static navigationOptions = {
    title: '离线地图',
  }

  async componentDidMount() {
    console.log(await Offline.getProvinces())
    // Offline.remove('铜陵市')
    Offline.download('河源市')
    Offline.addDownloadListener(data => console.log(data))
  }

  render() {
    return null
  }
}
