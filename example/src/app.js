import {StatusBar} from 'react-native'
import {StackNavigator} from 'react-navigation'
import Examples from './examples'
import MapTypes from './map-types'
import Layers from './layers'
import Indoor from './indoor'
import Controls from './controls'
import Gestures from './gestures'
import Marker from './marker'

StatusBar.setBackgroundColor('#e0e0e0')
StatusBar.setBarStyle('dark-content')

export default StackNavigator({
  Examples: {screen: Examples},
  MapTypes: {screen: MapTypes},
  Layers: {screen: Layers},
  Indoor: {screen: Indoor},
  Controls: {screen: Controls},
  Gestures: {screen: Gestures},
  Marker: {screen: Marker},
}, {
  navigationOptions: {
    headerTintColor: '#212121',
    headerStyle: {
      backgroundColor: '#f5f5f5',
    },
  },
})
