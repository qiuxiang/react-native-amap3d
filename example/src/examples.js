import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

export default class Examples extends Component {
  static navigationOptions = {
    title: 'AMap3D Examples',
  }

  _renderItem(title, route) {
    return <TouchableHighlight onPress={() => this.props.navigation.navigate(route)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </TouchableHighlight>
  }

  render() {
    return <ScrollView>
      {this._renderItem('地图模式', 'MapTypes')}
      {this._renderItem('图层功能', 'Layers')}
      {this._renderItem('室内地图', 'Indoor')}
      {this._renderItem('地图控件', 'Controls')}
      {this._renderItem('手势交互', 'Gestures')}
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
})
