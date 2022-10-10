import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import { Action } from "../screens/Action";
import { List } from "../screens/List";
import { Home } from "../screens/Home";
import { ActionMenu } from "../screens/ActionMenu";
import { Details } from "../screens/Details";
import { Teste } from "..";
import { Teste2 } from "../screens/Teste";

const Bottom = createBottomTabNavigator();

export function Routes() {
  return (
      <Bottom.Navigator screenOptions={{headerShadowVisible: false}} >
        <Bottom.Screen name="home" component={Home} options={{headerShown: false}} />
        <Bottom.Screen name="actionMenu" component={ActionMenu} options={{headerShown: false}} />
        <Bottom.Screen name="details" component={Details} options={{headerShown: false}} />
        <Bottom.Screen name="action" component={Action} />
        <Bottom.Screen name="list" component={List} options={{headerShown: false}} />
        <Bottom.Screen name="teste" component={Teste2} options={{headerShown: false}} />
      </Bottom.Navigator>
  );
}
