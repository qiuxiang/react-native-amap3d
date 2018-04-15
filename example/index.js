import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Examples from './examples'
import MapTypes from './examples/map-types'
import Layers from './examples/layers'
import Indoor from './examples/indoor'
import Animated from './examples/animated'
import Controls from './examples/controls'
import Gestures from './examples/gestures'
import Marker from './examples/marker'
import Polyline from './examples/polyline'
import Polygon from './examples/polygon'
import Circle from './examples/circle'
import Events from './examples/events'
import Offline from './examples/offline'
import HeatMap from './examples/heat-map'
import MultiPoint from './examples/multi-point'

export default StackNavigator({
  Examples: { screen: Examples },
  MapTypes: { screen: MapTypes },
  Layers: { screen: Layers },
  Indoor: { screen: Indoor },
  Animated: { screen: Animated },
  Controls: { screen: Controls },
  Gestures: { screen: Gestures },
  Marker: { screen: Marker },
  Polyline: { screen: Polyline },
  Polygon: { screen: Polygon },
  Circle: { screen: Circle },
  Events: { screen: Events },
  Offline: { screen: Offline },
  HeatMap: { screen: HeatMap },
  MultiPoint: { screen: MultiPoint },
}, {
  navigationOptions: {
    headerTintColor: '#212121',
    headerStyle: {
      ...Platform.select({
        ios: {
          backgroundColor: '#fff',
        },
        android: {
          backgroundColor: '#f5f5f5',
        },
      }),
    },
  },
})
