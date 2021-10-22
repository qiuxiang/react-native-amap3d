import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import examples from "./examples";

export type ScreenName = keyof typeof examples;
type ParamList = { [key in ScreenName]: undefined };
export type ScreenProps = NativeStackScreenProps<ParamList>;
export type NavigationProps = NativeStackNavigationProp<ParamList>;
