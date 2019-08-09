/**
 * 基础组件，包含一些公共方法
 */
import { PureComponent } from "react";
import { findNodeHandle, UIManager } from "react-native";

export default class Component extends PureComponent {
  /**
   * 原生组件名称
   */
  name;

  /**
   * 调用原生方法
   *
   * @private
   */
  sendCommand(command, params = []) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig(this.name).Commands[command],
      params
    );
  }
}
