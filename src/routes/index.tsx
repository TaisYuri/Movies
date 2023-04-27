import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Home } from "../screens/Home";
import { ActionMenu } from "../screens/PlusMovies";
import { Details } from "../screens/Details";
import { Profile } from "../screens/Profile";
import { Search } from "../screens/Search";
import { theme } from "../theme/styles";
import { CustomTabBar } from "../components/CustomTabBar";

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
  const themeColors = theme;

  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true, // esconde a tab caso abra o teclado por cima
        tabBarShowLabel: false,
        tabBarActiveTintColor: themeColors.colors.black,
        tabBarStyle: {
          backgroundColor: themeColors.colors.background,
          borderTopWidth: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Bottom.Screen
        name="Home"
        component={StackNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />

      <Bottom.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="movie-search-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-heart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}
