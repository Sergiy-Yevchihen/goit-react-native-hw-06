import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route, navigation }) => {
  const { location } = route.params;
  const { latitude, longitude } = route.params.location;
  // console.log("Location object:", location);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={3}
        onMapReady={() => {}}
        onRegionChange={() => {}}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title="travel photo"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: "#FF6C00",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
  },
});
