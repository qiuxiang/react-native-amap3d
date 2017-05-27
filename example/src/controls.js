import React, {Component} from 'react'
import {StyleSheet, View, Text, Switch} from 'react-native'
import MapView from 'react-native-amap3d'

export default class Controls extends Component {
  static navigationOptions = {
    title: '地图控件',
  }

  state = {
    showsCompass: false,
    showsScale: false,
    showsZoomControls: true,
    showsLocationButton: false,
  }

  render() {
    return <View style={StyleSheet.absoluteFill}>
      <View style={styles.controls}>
        <View style={styles.control}>
          <Text>指南针</Text>
          <Switch
            onValueChange={showsCompass => this.setState({showsCompass})}
            value={this.state.showsCompass}/>
        </View>
        <View style={styles.control}>
          <Text>比例尺</Text>
          <Switch
            onValueChange={showsScale => this.setState({showsScale})}
            value={this.state.showsScale}/>
        </View>
        <View style={styles.control}>
          <Text>定位</Text>
          <Switch
            onValueChange={showsLocationButton => this.setState({showsLocationButton})}
            value={this.state.showsLocationButton}/>
        </View>
        <View style={styles.control}>
          <Text>缩放</Text>
          <Switch
            onValueChange={showsZoomControls => this.setState({showsZoomControls})}
            value={this.state.showsZoomControls}/>
        </View>
      </View>
      <MapView
        locationEnabled={true}
        showsCompass={this.state.showsCompass}
        showsScale={this.state.showsScale}
        showsLocationButton={this.state.showsLocationButton}
        showsZoomControls={this.state.showsZoomControls}
        style={styles.map}/>
    </View>
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  controls: {
    height: 54,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 4,
    paddingLeft: 20,
    paddingRight: 20,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
