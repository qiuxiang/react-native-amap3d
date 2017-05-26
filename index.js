import {requireNativeComponent} from 'react-native'
import {View} from 'react-native'

export default requireNativeComponent('AMapView', {
  name: 'AMapView',
  propTypes: {
    ...View.propTypes,
  },
})
