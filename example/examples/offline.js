import { Component } from 'react'
import { Offline } from 'react-native-amap3d'

// TODO: 提供完整的离线地图示例
export default class IndoorExample extends Component {
  static navigationOptions = {
    title: '离线地图',
  }

  async componentDidMount() {
    console.log(await Offline.getProvinces())
    Offline.addDownloadListener(data => console.log(data))
    Offline.remove('香港特别行政区')
    Offline.download('香港特别行政区')
  }

  render() {
    return null
  }
}
