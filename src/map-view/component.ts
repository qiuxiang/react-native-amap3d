/**
 * Base component, contains some utils
 */
import { PureComponent } from "react";
import { findNodeHandle, UIManager } from "react-native";

/**
 * @ignore
 */
export default class Component<P> extends PureComponent<P> {
  props: P;

  /**
   * Must be defined in subclass if need to call native component method
   */
  nativeComponent: string;

  /**
   * Call native method
   */
  call(name: string, params?: any[]) {
    const handle = findNodeHandle(this);
    const command = UIManager.getViewManagerConfig(this.nativeComponent).Commands[name];
    if (handle && command) {
      UIManager.dispatchViewManagerCommand(handle, command, params);
    }
  }

  /**
   * Generate event handlers
   */
  handlers = (events: string[]) =>
    events.reduce((handlers, name) => {
      const handler = this.props[name];
      if (handler) {
        handlers[name.replace(/^on/, "onAMap")] = event => handler(event.nativeEvent);
      }
      return handlers;
    }, {});
}
