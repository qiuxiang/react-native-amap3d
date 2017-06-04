import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  StatusBar,
} from 'react-native'

let Touchable = TouchableHighlight
if (Platform.OS === 'android') {
  Touchable = TouchableNativeFeedback
}

export default class Examples extends Component {
  static navigationOptions = {
    title: 'AMap3D Examples',
  }

  _renderItem(title, route) {
    return <Touchable onPress={() => this.props.navigation.navigate(route)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </Touchable>
  }

  render() {
    return <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar barStyle='dark-content' backgroundColor='#e0e0e0'/>
      <View style={styles.group}>
        {this._renderItem('地图模式', 'MapTypes')}
        <View style={styles.separator}/>
        {this._renderItem('图层功能', 'Layers')}
        <View style={styles.separator}/>
        {this._renderItem('室内地图', 'Indoor')}
        <View style={styles.separator}/>
        {this._renderItem('地图控件', 'Controls')}
        <View style={styles.separator}/>
        {this._renderItem('手势交互', 'Gestures')}
      </View>
      <View style={styles.group}>
        {this._renderItem('添加标记', 'Marker')}
        <View style={styles.separator}/>
        {this._renderItem('绘制折线', 'Polyline')}
      </View>
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  group: {
    marginTop: 15,
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 16,
    color: '#424242',
  },
})
