import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useColorScheme } from "react-native";
import screens from "./screens";
import Home from "./home";

const Stack = createNativeStackNavigator();

export default () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="示例" component={Home} />
        {Object.keys(screens).map((name) => (
          // @ts-ignore
          <Stack.Screen key={name} name={name} component={screens[name]} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
