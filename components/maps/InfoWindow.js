import {requireNativeComponent, ViewPropTypes} from 'react-native'

export default requireNativeComponent('AMapInfoWindow', {
  propTypes: {
    ...ViewPropTypes,
  }
})
