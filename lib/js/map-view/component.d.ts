/**
 * Base component, contains some utils
 */
import { PureComponent } from "react";
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
    call(name: string, params?: any[]): void;
    /**
     * Generate event handlers
     */
    handlers: (events: string[]) => {};
}
