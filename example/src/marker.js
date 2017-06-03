import React, {Component} from 'react'
import {StyleSheet, Alert, Text, View} from 'react-native'
import {MapView, Marker} from 'react-native-amap3d'

export default class MarkerComponent extends Component {
  static navigationOptions = {
    title: '添加标记',
  }

  render() {
    return <MapView style={StyleSheet.absoluteFill}>
      <Marker
        title='一个可拖拽的 Marker'
        draggable
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
        icon='HUE_RED'
        title='一个红色的 Marker'
        infoWindowWidth={100}
        coordinate={{
          latitude: 39.806901,
          longitude: 116.297972,
        }}>
        <View style={styles.customInfoWindow}>
          <Text>一个自定义的信息窗口</Text>
        </View>
      </Marker>
      <Marker
        icon={require('../images/marker.png')}
        title='自定义图片'
        coordinate={{
          latitude: 39.906901,
          longitude: 116.397972,
        }}
      />
    </MapView>
  }
}

const styles = StyleSheet.create({
  customInfoWindow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 100,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
})
