import { PureComponent } from "react";
import { findNodeHandle, UIManager } from "react-native";

export default class Component<P, S = {}> extends PureComponent<P, S> {
  /**
   * 原生 View 名称，继承时必须指定
   */
  name = "";

  /**
   * 调用原生方法
   */
  invoke(name: string, params?: any[]) {
    const handle = findNodeHandle(this);
    if (handle) {
      const command = UIManager.getViewManagerConfig(this.name).Commands[name];
      UIManager.dispatchViewManagerCommand(handle, command, params);
    }
  }
}
