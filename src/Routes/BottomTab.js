import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import { authSignOutUser } from "../redux/auth/authOperations";

import { PostsScreen } from "../Screens/PostsScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";

import ArrowLeft from "../assets/images/arrowLeft.svg";
import Grid from "../assets/images/grid.svg";
import User from "../assets/images/user.svg";
import Plus from "../assets/images/plus.svg";
import Logout from "../assets/images/logout.svg";

const BottomTab = createBottomTabNavigator();

export const BottomTabMenu = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80, justifyContent: "center" },
        headerTitleAlign: "center",

        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
      }}
    >
      <BottomTab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Grid
                size={size}
                color={color}
                strokeOpacity={0.8}
                stroke={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => dispatch(authSignOutUser())}>
              <Logout size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          headerShown: true,

          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Plus
                size={size}
                color={color}
                fillOpacity={0.8}
                fill={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <User
                size={size}
                color={color}
                stroke={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
