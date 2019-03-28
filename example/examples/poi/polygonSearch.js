import React, { Component } from 'react'
import { StyleSheet, View, Text, Switch, Platform } from 'react-native'
import { MapView, AMapPOIPolygonSearch } from 'react-native-amap3d'

const styles = {
  body: {
    padding: 16
  },
  item: {
    flexDirection: 'row',
    marginBottom: 4
  },
  label: {
    color: '#f5533d',
    width: 100,
    paddingRight: 10,
    textAlign: 'right',
  },
  value: {
    flex: 1,
    flexWrap: 'wrap'
  }
}

export default class PolygonSearch extends Component {
  static navigationOptions = {
    title: 'POI 多边形搜索',
  }

  state = {
    poiSearchListenerHandle: null,
    poiSearchResult: {}
  }

  async componentDidMount() {
    try {
      await AMapPOIPolygonSearch.init();

      /**
       * [searchOptions description]
       * @type {Object}
       * @property {Array} coordinates  required
       * @property {String} keywords  required
       * @property {String} types  option
       * @property {Number} pageSize option default: 20
       * @property {Number} pageNum option default: 1
       * @property {Boolean} requireExtension  option only IOS
       */
      const searchOptions = {
        coordinates: [
          { latitude: 39.990459, longitude: 116.481476 },
          { latitude: 39.890459, longitude: 116.581476 },
        ],
        keywords: 'apple',
        requireExtension: true
      }

      AMapPOIPolygonSearch.onPOISearch(searchOptions)
      const poiSearchListenerHandle = AMapPOIPolygonSearch.addPOISearchListener((response) => {
        this.setState({
          poiSearchResult: response
        })
      })

      this.setState({
        poiSearchListenerHandle
      })
    } catch (e) {
      console.log('e = ', e)
    }
  }

  componentWillUnmount() {
    this.state.poiSearchListenerHandle.remove()
  }

  render() {
    const { poiSearchResult } = this.state
    return (
      <View style={styles.body}>
        {Object.keys(poiSearchResult).map(key => (
          <View style={styles.item} key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{JSON.stringify(poiSearchResult[key])}</Text>
          </View>
        ))}
      </View>
    )
  }
}
