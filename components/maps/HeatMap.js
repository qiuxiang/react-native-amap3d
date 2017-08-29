import React, {PropTypes, PureComponent} from 'react'
import {PixelRatio, Platform, requireNativeComponent, ViewPropTypes} from 'react-native'
import {LatLng} from '../PropTypes'

export default class HeatMap extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 节点
     */
    coordinates: PropTypes.arrayOf(LatLng).isRequired,

    /**
     * 半径
     */
    radius: PropTypes.number,

    /**
     * 透明度
     */
    opacity: PropTypes.number,
  }

  render() {
    return <AMapHeatMap {...this.props}/>
  }
}

const AMapHeatMap = requireNativeComponent('AMapHeatMap', HeatMap)
