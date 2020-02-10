import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import examples from "./examples";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      {Object.keys(examples).map(name => (
        <Stack.Screen key={name} name={name} component={examples[name]} />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);
