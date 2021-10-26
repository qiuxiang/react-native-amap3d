import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import screens from "./screens";

export type ScreenName = keyof typeof screens;
type ParamList = { [key in ScreenName]: undefined };
export type ScreenProps = NativeStackScreenProps<ParamList>;
export type NavigationProps = NativeStackNavigationProp<ParamList>;
