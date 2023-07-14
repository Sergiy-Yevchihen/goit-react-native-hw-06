import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";

const Post = ({ img, text, msgs, location, gps }) => {
  const [gpsLocation, setGpsLocation] = useState({});

  useEffect(() => {
    setGpsLocation(gps);
  }, []);

  const clickComment = () => {
    navigation.navigate("Comments");
  };

  const clickMap = () => {
    navigation.navigate("Map", { location });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: `${img}` }}
        style={styles.postImg}
      ></ImageBackground>
      <Text style={styles.posText}>{text}</Text>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate("Map", { location })}
        >
          <Feather name="message-circle" size={18} color="gray" />
          <Text>{msgs}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate("Comments")}
        >
          <Feather name="message-circle" size={18} color="gray" />
          <Text>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.info} onPress={clickMap}>
          <EvilIcons name="location" size={24} color="gray" />
          <Text style={styles.infolink}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    textAlign: "left",
    marginTop: 8,
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

export default Post;
