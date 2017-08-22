/**
 * 基础组件，包含一些公共方法
 *
 * @flow
 */
import React, {PureComponent} from 'react'
import {findNodeHandle, UIManager} from 'react-native'

export default class BaseComponent extends PureComponent {
  /**
   * 调用原生方法
   *
   * @private
   */
  _sendCommand(command: string, params?: []) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager[this.name].Commands[command],
      params,
    )
  }
}
