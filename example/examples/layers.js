import React, { Component } from 'react'
import { StyleSheet, View, Text, Switch, Platform } from 'react-native'
import { MapView } from 'react-native-amap3d'
import commonStyles from '../styles'

const styles = {
  ...commonStyles,
  map: [commonStyles.map, {
    ...Platform.select({
      ios: {
        marginBottom: 54,
      },
    }),
  }],
  controls: [commonStyles.controls, {
    height: 54,
  }],
  control: [commonStyles.control, {
    flexDirection: 'row',
  }],
  label: {
    marginRight: 5,
  },
}

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
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.controls}>
          <View style={styles.control}>
            <Text style={styles.label}>建筑</Text>
            <Switch
              onValueChange={showsBuildings => this.setState({ showsBuildings })}
              value={this.state.showsBuildings}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>路况</Text>
            <Switch
              onValueChange={showsTraffic => this.setState({ showsTraffic })}
              value={this.state.showsTraffic}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>标签</Text>
            <Switch
              onValueChange={showsLabels => this.setState({ showsLabels })}
              value={this.state.showsLabels}
            />
          </View>
        </View>
        <MapView
          zoomLevel={17}
          tilt={60}
          showsLabels={this.state.showsLabels}
          showsTraffic={this.state.showsTraffic}
          showsBuildings={this.state.showsBuildings}
          style={styles.map}
        />
      </View>
    )
  }
}
