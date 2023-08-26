import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import DownloadPhoto from "../assets/images/downloadPhoto.svg";

export const CameraScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [regionName, setRegionName] = useState(null);
  const [photo, setPhoto] = useState();

  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Не вдалося визначити місцезнаходження");
        }

        const location = await Location.getCurrentPositionAsync({});
        const regionName = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLocation(location.coords);
        setRegionName(regionName);
      } catch (error) {
        console.log("error-message", error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(
          mediaLibraryPermission.status === "granted"
        );
      } catch (error) {
        console.log("error-message", error.message);
      }
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Запит дозволу...</Text>;
  } else if (!hasCameraPermission) {
    return Alert.alert(
      "Дозвіл для камери не надано. Будь ласка, змініть це в налаштуваннях."
    );
  }

  const takePic = async () => {
    try {
      const newPhoto = await cameraRef.current.takePictureAsync();
      setPhoto(newPhoto.uri);
    } catch (error) {
      console.log("error-message-take-pic", error.message);
    }
  };

  if (photo) {
    const savePic = () => {
      console.log("uriP12", photo);
      // shareAsync(photo).then(() => {
        setPhoto(undefined);
      // });
      navigation.navigate("Створити публікацію", {
        photo,
        location,
        regionName,
      });
    };

    return (
      <View style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo }} />
        <View style={styles.buttonContainer}>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity
              style={{ ...styles.button, marginRight: 30 }}
              onPress={savePic}
            >
              <Text style={styles.textButton}>Зберегти</Text>
            </TouchableOpacity>
          ) : undefined}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(undefined)}
          >
            <Text style={styles.textButton}>Перезняти</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={styles.camera}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
          }}
          onPress={takePic}
        >
          <DownloadPhoto />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  takeButton: {
    marginBottom: 32,
    width: 150,
    height: 45,
    padding: 12,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  button: {
    width: 100,
    height: 45,
    padding: 12,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 83,
    backgroundColor: "000",
  },

  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
