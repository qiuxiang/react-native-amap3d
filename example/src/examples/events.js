import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import MapView from 'react-native-amap3d'

export default class Events extends Component {
  static navigationOptions = {
    title: '地图事件',
  }

  state = {
    logs: [],
  }

  _log(event, data) {
    this.setState({
      logs: [
        {
          key: Math.random(),
          time: new Date().toLocaleString(),
          event: event,
          data: JSON.stringify(data, null, 2),
        },
        ...this.state.logs,
      ],
    })
  }

  render() {
    return <View style={styles.body}>
      <MapView
        locationEnabled
        onPress={({nativeEvent}) => this._log('onPress', nativeEvent)}
        onLongPress={({nativeEvent}) => this._log('onLongPress', nativeEvent)}
        onLocation={({nativeEvent}) => this._log('onLocation', nativeEvent)}
        style={styles.body}/>
      <ScrollView contentContainerStyle={styles.log}>
        {this.state.logs.map(item =>
          <Text key={item.key} style={styles.logText}>
            {item.time} {item.event}: {item.data}
          </Text>
        )}
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  log: {
    padding: 10,
  },
  logText: {
    marginBottom: 5,
  },
})
