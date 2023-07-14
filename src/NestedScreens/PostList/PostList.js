import React from "react";
import ProfileElement from "../../Elements/ProfileElement";
import {
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../Redux/posts/postsSelectors";
import { selectComments } from "../../Redux/comments/commentsSelectors";

const PostList = ({ navigation }) => {
  const posts = useSelector(selectAllPosts);
  const allComments = useSelector(selectComments);

  const getCommentsCount = (id) => {
    const comcount = allComments.filter((item) => item.postId === id).length;
    return comcount;
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ProfileElement />
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${item.photo}` }}
                style={{ width: 380, height: 280, borderRadius: 15 }}
              />
              <Text style={styles.posText}>{item.title}</Text>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "85%",
                }}
              >
                <TouchableOpacity
                  style={styles.info}
                  onPress={() =>
                    navigation.navigate("CommentsNav", {
                      postId: item.id,
                      postImg: item.photo,
                    })
                  }
                >
                  <Feather name="message-circle" size={18} color="gray" />
                  <Text>{getCommentsCount(item.id)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.info}
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                >
                  <EvilIcons name="location" size={24} color="gray" />
                  <Text style={styles.infolink}>{item.inputRegion}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
    justifyContent: "flex-start",
    padding: 10,
  },
  postImg: {
    flex: 4,
    width: "100%",
    height: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  posText: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginLeft: 40,
    fontWeight: "500",
    fontSize: 16,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    padding: 10,
  },
  infolink: {
    textDecorationLine: "underline",
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
});

export default PostList;
