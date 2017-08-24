import React, {Component} from 'react'
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
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

  _coordinates = [
    {
      latitude: 39.806901,
      longitude: 116.397972,
    },
    {
      latitude: 39.806901,
      longitude: 116.297972,
    },
    {
      latitude: 39.906901,
      longitude: 116.397972,
    },
    {
      latitude: 39.706901,
      longitude: 116.397972,
    },
  ]

  componentWillUnmount() {
    this.mounted = false
  }

  _onInfoWindowPress = () => Alert.alert('信息窗口点击事件')
  _onCustomInfoWindowPress = () => Alert.alert('自定义信息窗口点击事件')
  _onDragEvent = ({nativeEvent}) => Alert.alert(`新坐标：${nativeEvent.latitude}, ${nativeEvent.longitude}`)

  render() {
    return <MapView style={StyleSheet.absoluteFill}>
      <Marker
        active
        draggable
        title={'一个可拖拽的标记 ' + this.state.time.toLocaleTimeString()}
        onDragEnd={this._onDragEvent}
        onInfoWindowPress={this._onInfoWindowPress}
        coordinate={this._coordinates[0]}
      />
      <Marker
        icon='green'
        onInfoWindowPress={this._onCustomInfoWindowPress}
        coordinate={this._coordinates[1]}>
        <TouchableOpacity activeOpacity={0.9} onPress={this._onCustomInfoWindowPress}>
          <View style={styles.customInfoWindow}>
            <Text>Custom View InfoWindow</Text>
          </View>
        </TouchableOpacity>
      </Marker>
      <Marker
        icon={() =>
          <View style={styles.customIcon}>
            <Image style={styles.customIcon} source={require('../../images/flag.png')}/>
          </View>
        }
        title='自定义图片'
        description="Sometimes you'll have some special properties that you need to expose for the native component, but don't actually want them as part of the API for the associated React component."
        coordinate={this._coordinates[2]}
      />
      <Marker
        title='自定义标记'
        icon={() =>
          <View style={styles.customMarker}>
            <Text style={styles.markerText}>{this.state.time.toLocaleTimeString()}</Text>
          </View>
        }
        coordinate={this._coordinates[3]}
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
