import React, {Component} from 'react'
import {StyleSheet, Alert, Text, View} from 'react-native'
import {MapView, Marker, InfoWindow, Overlay} from 'react-native-amap3d'

export default class MarkerComponent extends Component {
  static navigationOptions = {
    title: '添加标记',
  }

  state = {
    time: new Date(),
  }

  componentDidMount() {
    this.mounted = true
    setInterval(() => {
      if (this.mounted) {
        this.setState({time: new Date()})
      }
    }, 1000)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return <MapView style={StyleSheet.absoluteFill}>
      <Marker
        draggable
        showsInfoWindow
        title='一个可拖拽的 Marker'
        onDragEnd={({nativeEvent}) =>
          Alert.alert(`新坐标：${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
        onInfoWindowPress={() => Alert.alert('信息窗口点击事件')}
        coordinate={{
          latitude: 39.806901,
          longitude: 116.397972,
        }}
      />
      <Marker
        selected
        showsInfoWindow
        icon='HUE_RED'
        title='一个红色的 Marker'
        infoWindowWidth={100}
        coordinate={{
          latitude: 39.806901,
          longitude: 116.297972,
        }}>
        <InfoWindow style={styles.customInfoWindow}>
          <Text>一个自定义 View 的信息窗口</Text>
        </InfoWindow>
      </Marker>
      <Marker
        showsInfoWindow
        icon={require('../images/marker.png')}
        title='自定义图片'
        coordinate={{
          latitude: 39.906901,
          longitude: 116.397972,
        }}
      />
      <Marker
        showsInfoWindow
        title='自定义 View Marker'
        icon={() => <Overlay style={styles.customMarker}>
          <Text style={styles.markerText}>{this.state.time.toLocaleTimeString()}</Text>
        </Overlay>}
        coordinate={{
          latitude: 39.706901,
          longitude: 116.397972,
        }}
      />
    </MapView>
  }
}

const styles = StyleSheet.create({
  customInfoWindow: {
    backgroundColor: '#fff',
    width: 128,
    padding: 10,
    elevation: 4,
  },
  customMarker: {
    width: 70,
    backgroundColor: '#009688',
    alignItems: 'center',
    padding: 5,
  },
  markerText: {
    color: '#fff',
  },
})
