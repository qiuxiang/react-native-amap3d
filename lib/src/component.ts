/**
 * Base component, contains some utils
 */
import { PureComponent } from "react";
import { findNodeHandle, UIManager } from "react-native";

export default class Component<P> extends PureComponent<P> {
  /**
   * Must be defined in subclass if need to call native component method
   */
  name = "";

  /**
   * Call native method
   */
  call(name: string, params?: any[]) {
    const handle = findNodeHandle(this);
    if (handle) {
      const command = UIManager.getViewManagerConfig(this.name).Commands[name];
      UIManager.dispatchViewManagerCommand(handle, command, params);
    }
  }
}
