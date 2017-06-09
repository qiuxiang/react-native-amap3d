import React, {Component} from 'react'
import {StyleSheet, Picker} from 'react-native'
import MapView from 'react-native-amap3d'

export default class MapTypes extends Component {
  static navigationOptions = ({navigation}) => {
    const {state, setParams} = navigation
    state.params = state.params || {mapType: 'standard'}
    return {
      title: '地图模式',
      headerRight: <Picker
        mode='dropdown'
        style={{width: 100}}
        selectedValue={state.params.mapType}
        onValueChange={mapType => setParams({mapType})}>
        <Picker.Item label='标准' value='standard'/>
        <Picker.Item label='卫星' value='satellite'/>
        <Picker.Item label='导航' value='navigation'/>
        <Picker.Item label='夜间' value='night'/>
        <Picker.Item label='公交' value='bus'/>
      </Picker>,
    }
  }

  render() {
    return <MapView
      mapType={this.props.navigation.state.params.mapType}
      style={StyleSheet.absoluteFill}/>
  }
}
