import React, {Component} from 'react'
import {StyleSheet, View, Text, Switch} from 'react-native'
import MapView from 'react-native-amap3d'

export default class Layers extends Component {
  static navigationOptions = {
    title: '图层的显示',
  }

  state = {
    showsLabels: true,
    showsTraffic: false,
    showsBuildings: false,
  }

  render() {
    return <View style={StyleSheet.absoluteFill}>
      <View style={styles.controls}>
        <View style={styles.control}>
          <Text>建筑</Text>
          <Switch
            onValueChange={showsBuildings => this.setState({showsBuildings})}
            value={this.state.showsBuildings}/>
        </View>
        <View style={styles.control}>
          <Text>交通</Text>
          <Switch
            onValueChange={showsTraffic => this.setState({showsTraffic})}
            value={this.state.showsTraffic}/>
        </View>
        <View style={styles.control}>
          <Text>标签</Text>
          <Switch
            onValueChange={showsLabels => this.setState({showsLabels})}
            value={this.state.showsLabels}/>
        </View>
      </View>
      <MapView
        zoomLevel={17}
        showsLabels={this.state.showsLabels}
        showsTraffic={this.state.showsTraffic}
        showsBuildings={this.state.showsBuildings}
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
