import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../Screens/Home/Home";
import { RegistrationScreen } from "../Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen/LoginScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen/CreatePostsScreen";
import { CommentsScreen } from "../Screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../Screens/MapScreen/MapScreen";
import { CameraScreen } from "../Screens/CameraScreen/CameraScreen";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoute = (isLogin) => {
  return isLogin ? (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{
          headerShown: true,
          headerTitleStyle: { color: "#212121", fontSize: 17 },
          headerTitleAlign: "center",
        }}
        name="Коментарі"
        component={CommentsScreen}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: true, headerTitleAlign: "center" }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: true }}
        name="Камера"
        component={CameraScreen}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: true, headerTitleAlign: "center" }}
        name="Мапа"
        component={MapScreen}
      ></MainStack.Screen>
    </MainStack.Navigator>
  ) : (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
