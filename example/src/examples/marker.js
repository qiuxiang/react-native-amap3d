import React, {Component} from 'react'
import {
  StyleSheet,
  Alert,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native'
import {MapView, Marker} from 'react-native-amap3d'

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

  _handleDragEvent = ({nativeEvent}) =>
    Alert.alert(`新坐标：${nativeEvent.latitude}, ${nativeEvent.longitude}`)

  _handleInfoWindowPress = () => Alert.alert('信息窗口点击事件')

  _handleCustomInfoWindowPress = () => Alert.alert('Custom View InfoWindow onPress')

  _renderCustomMarker = () =>
    <View style={styles.customMarker}>
      <Text style={styles.markerText}>{this.state.time.toLocaleTimeString()}</Text>
    </View>

  _renderImageMarker = () =>
    <View style={styles.customIcon}>
      <Image style={styles.customIcon} source={require('../../images/flag.png')}/>
    </View>

  render() {
    return <MapView style={StyleSheet.absoluteFill}>
      <Marker
        active
        draggable
        title={'一个可拖拽的 Marker ' + this.state.time.toLocaleTimeString()}
        onDragEnd={this._handleDragEvent}
        onInfoWindowPress={this._handleInfoWindowPress}
        coordinate={{
          latitude: 39.806901,
          longitude: 116.397972,
        }}
      />
      <Marker
        icon='green'
        onInfoWindowPress={this._handleCustomInfoWindowPress}
        coordinate={{
          latitude: 39.806901,
          longitude: 116.297972,
        }}>
        <TouchableOpacity activeOpacity={0.9} onPress={this._handleCustomInfoWindowPress}>
          <View style={styles.customInfoWindow}>
            <Text>Custom View InfoWindow</Text>
          </View>
        </TouchableOpacity>
      </Marker>
      <Marker
        icon={this._renderImageMarker}
        title='自定义图片'
        description="Sometimes you'll have some special properties that you need to expose for the native component, but don't actually want them as part of the API for the associated React component."
        coordinate={{
          latitude: 39.906901,
          longitude: 116.397972,
        }}
      />
      <Marker
        title='Custom View Marker'
        icon={this._renderCustomMarker}
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
    backgroundColor: '#8bc34a',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#689F38',
  },
  customMarker: {
    backgroundColor: '#009688',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  markerText: {
    color: '#fff',
  },
})
