import * as React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MapView } from "react-native-amap3d";

export default class extends React.Component {
  state = { logs: [] };

  async componentDidMount() {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
  }

  _log(event: string, data: any) {
    console.log(data);
    this.setState({
      logs: [
        {
          key: Date.now().toString(),
          time: new Date().toLocaleString(),
          event,
          data: JSON.stringify(data, null, 2),
        },
        ...this.state.logs,
      ],
    });
  }

  _logClickEvent = (data: any) => this._log("onClick", data);
  _logLongClickEvent = (data: any) => this._log("onLongClick", data);
  _logLocationEvent = (data: any) => this._log("onLocation", data);
  _logStatusChangeCompleteEvent = (data: any) => this._log("onStatusChangeComplete", data);

  _renderItem = ({ item }: ListRenderItemInfo<any>) => (
    <Text style={style.logText}>
      {item.time} {item.event}: {item.data}
    </Text>
  );

  render() {
    return (
      <View style={style.body}>
        <MapView
          locationEnabled
          locationInterval={10000}
          distanceFilter={10}
          onClick={this._logClickEvent}
          onLongClick={this._logLongClickEvent}
          onLocation={this._logLocationEvent}
          onStatusChangeComplete={this._logStatusChangeCompleteEvent}
          style={style.body}
        />
        <FlatList style={style.logs} data={this.state.logs} renderItem={this._renderItem} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 1,
  },
  logs: {
    elevation: 8,
    flex: 1,
    backgroundColor: "#fff",
  },
  logText: {
    fontFamily: Platform.OS === "ios" ? "menlo" : "monospace",
    fontSize: 12,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
