/**
 * 基础组件，包含一些公共方法
 *
 * @flow
 */
import { PureComponent } from 'react'
import { findNodeHandle, UIManager } from 'react-native'

export default class Component<T> extends PureComponent<T> {
  /**
   * 原生组件名称
   */
  name: string

  /**
   * 调用原生方法
   *
   * @private
   */
  sendCommand(command: string, params?: any[]) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager[this.name].Commands[command],
      params,
    )
  }
}
