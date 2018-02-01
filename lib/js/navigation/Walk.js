// @flow
import React from 'react'
import { requireNativeComponent } from 'react-native'
import Base from './Base'

export default class Walk extends Base {
  render() {
    return <AMapWalk {...this.props} />
  }

  name = 'AMapWalk'
}

const AMapWalk = requireNativeComponent('AMapWalk', Walk)
