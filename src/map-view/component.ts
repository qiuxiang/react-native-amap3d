/**
 * Base component, contains some utils
 */
import { PureComponent } from "react";
import { findNodeHandle, UIManager, Platform } from "react-native";

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
    if (handle) {
      const command = UIManager.getViewManagerConfig(this.nativeComponent).Commands[name];
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
        if (Platform.OS === "android") {
          name = name.replace(/^on/, "onAMap");
        }
        handlers[name] = event => handler(event.nativeEvent);
      }
      return handlers;
    }, {});
}
