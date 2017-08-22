// @flow
import React, {PropTypes, PureComponent} from 'react'
import {
  ViewPropTypes,
  UIManager,
  requireNativeComponent,
  findNodeHandle,
} from 'react-native'
import {LatLng} from './PropTypes'

export default class Drive extends PureComponent {
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
   * 路线规划
   */
  calculateRoute(start, end, way = []) {
    this._sendCommand('calculateRoute', [start, end, way])
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
      UIManager.AMapDrive.Commands[command],
      params,
    )
  }

  render() {
    return <AMapDrive {...this.props}/>
  }
}

const AMapDrive = requireNativeComponent('AMapDrive', Drive)
