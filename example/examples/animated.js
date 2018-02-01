import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { MapView } from 'react-native-amap3d'

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  buttons: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  text: {
    fontSize: 16,
  },
})

export default class AnimatedExample extends Component {
  static navigationOptions = {
    title: '动画移动',
  }

  _animatedToZGC = () => {
    this.mapView.animateTo({
      tilt: 45,
      rotation: 90,
      zoomLevel: 18,
      coordinate: {
        latitude: 39.97837,
        longitude: 116.31363,
      },
    })
  }

  _animatedToTAM = () => {
    this.mapView.animateTo({
      tilt: 0,
      rotation: 0,
      zoomLevel: 16,
      coordinate: {
        latitude: 39.90864,
        longitude: 116.39745,
      },
    })
  }

  render() {
    return (
      <View style={styles.body}>
        <MapView ref={ref => this.mapView = ref} style={styles.body} />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this._animatedToZGC}>
              <Text style={styles.text}>中关村</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this._animatedToTAM}>
              <Text style={styles.text}>天安门</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
