import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, PermissionsAndroid, Platform } from "react-native";
import { MapView } from "react-native-amap3d";

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  logs: {
    elevation: 8,
    flex: 1,
    backgroundColor: "#fff"
  },
  logText: {
    fontFamily: Platform.OS === "ios" ? "menlo" : "monospace",
    fontSize: 12,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default class EventsExample extends Component {
  static navigationOptions = {
    title: "地图事件"
  };

  state = {
    logs: []
  };

  async componentDidMount() {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
  }

  _log(event, data) {
    console.log(data);
    this.setState({
      logs: [
        {
          key: Date.now().toString(),
          time: new Date().toLocaleString(),
          event,
          data: JSON.stringify(data, null, 2)
        },
        ...this.state.logs
      ]
    });
  }

  _logClickEvent = data => this._log("onClick", data);
  _logLongClickEvent = data => this._log("onLongClick", data);
  _logLocationEvent = data => this._log("onLocation", data);
  _logStatusChangeCompleteEvent = data => this._log("onStatusChangeComplete", data);

  _renderItem = ({ item }) => (
    <Text style={styles.logText}>
      {item.time} {item.event}: {item.data}
    </Text>
  );

  render() {
    return (
      <View style={styles.body}>
        <MapView
          locationEnabled
          locationInterval={10000}
          distanceFilter={10}
          onClick={this._logClickEvent}
          onLongClick={this._logLongClickEvent}
          onLocation={this._logLocationEvent}
          onStatusChangeComplete={this._logStatusChangeCompleteEvent}
          style={styles.body}
        />
        <FlatList style={styles.logs} data={this.state.logs} renderItem={this._renderItem} />
      </View>
    );
  }
}
