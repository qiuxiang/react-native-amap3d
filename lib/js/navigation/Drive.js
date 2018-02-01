// @flow
import React from 'react'
import { requireNativeComponent } from 'react-native'
import Base from './Base'

export default class Drive extends Base {
  render() {
    return <AMapDrive {...this.props} />
  }

  name = 'AMapDrive'
}

const AMapDrive = requireNativeComponent('AMapDrive', Drive)
