// @flow
import React from 'react'
import { requireNativeComponent } from 'react-native'
import Base from './Base'

export default class Ride extends Base {
  render() {
    return <AMapRide {...this.props} />
  }

  name = 'AMapRide'
}

const AMapRide = requireNativeComponent('AMapRide', Ride)
