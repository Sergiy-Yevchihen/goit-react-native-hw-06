import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostList from "../../NestedScreens/PostList/PostList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Map from "../../NestedScreens/Map/Map";
import Post from "../../Elements/Post";
import { fetchGetAllPosts } from "../../Redux/posts/postsOperations";

const PostNavigation = createStackNavigator();

const NavigationPosts = () => {
  return (
    <PostNavigation.Navigator
      initialRouteName="PostList"
      screenOptions={{ headerShown: false }}
    >
      <PostNavigation.Screen name="Post" component={Post} />
      <PostNavigation.Screen name="PostList" component={PostList} />
      <PostNavigation.Screen name="Map" component={Map}></PostNavigation.Screen>
    </PostNavigation.Navigator>
  );
};

export default NavigationPosts;
