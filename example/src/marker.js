import React, {Component} from 'react'
import {StyleSheet, Alert, Text, Image} from 'react-native'
import {MapView, Marker, InfoWindow, Overlay} from 'react-native-amap3d'

export default class MarkerExample extends Component {
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
        active
        icon='red'
        infoWindowWidth={100}
        coordinate={{
          latitude: 39.806901,
          longitude: 116.297972,
        }}>
        <InfoWindow style={styles.customInfoWindow}>
          <Text>Custom View InfoWindow</Text>
        </InfoWindow>
      </Marker>
      <Marker
        icon={() =>
          <Overlay style={styles.customIcon}>
            <Image style={styles.customIcon} source={require('../images/marker.png')}/>
          </Overlay>
        }
        title='自定义图片'
        description="Note the use of nativeOnly above. Sometimes you'll have some special properties that you need to expose for the native component, but don't actually want them as part of the API for the associated React component."
        coordinate={{
          latitude: 39.906901,
          longitude: 116.397972,
        }}
      />
      <Marker
        title='Custom View Marker'
        icon={() =>
          <Overlay style={styles.customMarker}>
            <Text style={styles.markerText}>{this.state.time.toLocaleTimeString()}</Text>
          </Overlay>
        }
        coordinate={{
          latitude: 39.706901,
          longitude: 116.397972,
        }}
      />
    </MapView>
  }
}

const styles = StyleSheet.create({
  customIcon: {
    width: 40,
    height: 40,
  },
  customInfoWindow: {
    backgroundColor: '#fff',
    position: 'absolute',
    padding: 10,
    elevation: 4,
  },
  customMarker: {
    position: 'absolute',
    backgroundColor: '#009688',
    alignItems: 'center',
    padding: 5,
  },
  markerText: {
    color: '#fff',
  },
})
