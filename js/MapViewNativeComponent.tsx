import type { ViewProps } from "react-native";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export interface Props extends ViewProps {}

export default codegenNativeComponent<Props>("MapView");
