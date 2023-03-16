import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { Home } from "../screens/Home";
import { ActionMenu } from "../screens/PlusMovies";
import { Details } from "../screens/Details";
import { Profile } from "../screens/Profile";
import { View, TouchableOpacity } from "react-native";
import { Search } from "../screens/Search";
import { theme } from "../theme/styles";

const Bottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="actionMenu"
        component={ActionMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="details"
        component={Details}
        options={{ headerShown: false }}
      />      
    </Stack.Navigator>
  );
}

export function Routes() {
  const themeColors = theme

  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: themeColors.colors.background,
          height: 60
        }, headerShown: false
      }} 
    >
      <Bottom.Screen
        name="Home"
        component={StackNav}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: "absolute" }}>
              <Icon name="home" color={focused ? themeColors.colors.primary : themeColors.colors.black} size={26} />
            </View>
          ),
        }}
      />

      <Bottom.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
            style={{
              position: "absolute",
              top: -20,
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: themeColors.colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           
              <Icon
                name="movie-search-outline"
                color={focused ? themeColors.colors.white : themeColors.colors.black}
                size={26}
              />
            </View>

          ),
        }}
      />

      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="account" color={focused ? themeColors.colors.primary : themeColors.colors.black} size={26} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}
