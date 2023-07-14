import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsNav from "../Navigation/PostsNav";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLogOutUser } from "../../Redux/auth/authOperations";
import { fetchGetAllPosts } from "../../Redux/posts/postsOperations";
import { fetchGetAllComments } from "../../Redux/comments/commentsOperations";

const BottomTabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(fetchLogOutUser()).then((result) => {
      result.type === "auth/fetchLogOutUser/fulfilled" &&
        navigation.navigate("Login");
      result.type !== "auth/fetchLogOutUser/fulfilled" &&
        alert("Incorrect logOut!!!");
    });
  };

  useEffect(() => {
    dispatch(fetchGetAllComments());
    dispatch(fetchGetAllPosts());
  }, [dispatch]);

  return (
    <BottomTabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80 },
      }}
    >
      {/* GRID */}
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <SimpleLineIcons
                name="grid"
                size={20}
                color={focused ? "orange" : color}
              />
            );
          },
          headerTitleAlign: "center",
          headerRightContainerStyle: { paddingRight: 20 },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={handleLogOut}
            >
              <Feather name="log-out" size={24} color="gray" />
            </TouchableOpacity>
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />

      {/* ADD BUTTON */}
      <BottomTabs.Screen
        options={{
          tabBarIcon: () => {
            return (
              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("PostsNav")}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            );
          },
          headerShown: false,
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
        }}
        name="PostsNav"
        component={PostsNav}
      />

      {/* PROFILE BUTTON */}
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <AntDesign
                name="user"
                size={20}
                color={focused ? "orange" : color}
              />
            );
          },
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderTopColor: "#999999",
    borderTopWidth: 1,
  },
  addButton: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  gridButton: {
    marginRight: 40,
  },
  userButton: {
    marginLeft: 40,
  },
});

export default Home;
