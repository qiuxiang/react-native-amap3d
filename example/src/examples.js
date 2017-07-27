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
    title: 'Examples',
  }

  _renderItem(title, route) {
    return <Touchable onPress={() => this.props.navigation.navigate(route)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </Touchable>
  }

  render() {
    return <ScrollView style={styles.scrollView}>
      <StatusBar barStyle='dark-content' backgroundColor='#e0e0e0'/>
      <View style={styles.group}>
        {this._renderItem('地图模式', 'MapTypes')}
        <View style={styles.separator}/>
        {this._renderItem('基本图层', 'Layers')}
        <View style={styles.separator}/>
        {this._renderItem('室内地图', 'Indoor')}
        <View style={styles.separator}/>
        {this._renderItem('地图控件', 'Controls')}
        <View style={styles.separator}/>
        {this._renderItem('手势交互', 'Gestures')}
        <View style={styles.separator}/>
        {this._renderItem('动画移动', 'Animated')}
        <View style={styles.separator}/>
        {this._renderItem('地图事件', 'Events')}
      </View>
      <View style={styles.group}>
        {this._renderItem('添加标记', 'Marker')}
        <View style={styles.separator}/>
        {this._renderItem('绘制折线', 'Polyline')}
        <View style={styles.separator}/>
        {this._renderItem('绘制多边形', 'Polygon')}
        <View style={styles.separator}/>
        {this._renderItem('绘制圆形', 'Circle')}
      </View>
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  scrollView: {
    ...Platform.select({
      android: {
        backgroundColor: '#f5f5f5',
      },
    })
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
  },
  itemText: {
    fontSize: 16,
    color: '#424242',
  },
})
