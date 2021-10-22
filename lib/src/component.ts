/**
 * Base component, contains some utils
 */
import { PureComponent } from "react";
import { findNodeHandle, NativeSyntheticEvent, Platform, UIManager, View } from "react-native";

/**
 * @ignore
 */
export default class Component<P> extends PureComponent<P> {
  /**
   * Must be defined in subclass if need to call native component method
   */
  nativeComponent = "";

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
      View;
      const handler = Reflect.get(this.props, name);
      if (handler) {
        if (Platform.OS === "android") {
          name = name.replace(/^on/, "onAMap");
        }
        Reflect.set(handlers, name, (event: NativeSyntheticEvent<any>) =>
          handler(event.nativeEvent)
        );
      }
      return handlers;
    }, {});
}
