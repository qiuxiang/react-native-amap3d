// @flow
import React, {PropTypes, PureComponent} from 'react'
import {
  ViewPropTypes,
  UIManager,
  requireNativeComponent,
  findNodeHandle,
} from 'react-native'
import {LatLng} from './PropTypes'

export default class Navigation extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 路径规划成功事件
     */
    onCalculateRouteSuccess: React.PropTypes.func,

    /**
     * 路径规划失败事件
     */
    onCalculateRouteFailure: React.PropTypes.func,
  }

  /**
   * 步行路线规划
   */
  calculateWalkRoute(start, end) {
    this._sendCommand('calculateWalkRoute', [start, end])
  }

  /**
   * 骑行路线规划
   */
  calculateRideRoute(start, end) {
    this._sendCommand('calculateRideRoute', [start, end])
  }

  /**
   * 驾车路线规划
   */
  calculateDriveRoute(start, end) {
    this._sendCommand('calculateDriveRoute', [start, end])
  }

  /**
   * 开始导航
   */
  start() {
    this._sendCommand('start')
  }

  /**
   * call native method
   *
   * @private
   */
  _sendCommand(command: string, params?: []) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.AMapNavigation.Commands[command],
      params,
    )
  }

  render() {
    return <AMapNavigation {...this.props}/>
  }
}

const AMapNavigation = requireNativeComponent('AMapNavigation', Navigation)
