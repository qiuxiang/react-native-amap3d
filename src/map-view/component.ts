/**
 * Base component, contains some utils
 */
import { PureComponent } from "react";
import { findNodeHandle, UIManager } from "react-native";

/**
 * @hidden
 */
export default class Component<P> extends PureComponent<P> {
  protected props: P;

  /**
   * Must be defined in subclass if need to call native component method
   */
  protected nativeComponent: string;

  /**
   * Call native method
   */
  protected call(command: string, params?: any[]) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager[this.nativeComponent].Commands[command],
      params
    );
  }

  /**
   * Generate event handlers
   */
  protected handlers = (events: string[]) =>
    events.reduce((handlers, name) => {
      const handler = this.props[name];
      if (handler) {
        handlers[name.replace(/^on/, "onAMap")] = event => handler(event.nativeEvent);
      }
      return handlers;
    }, {});
}
