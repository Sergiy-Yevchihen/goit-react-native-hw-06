import Spinner from "react-native-loading-spinner-overlay";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../Redux/auth/authSelectors";

const LoadingScreen = () => {
  const isLoading = useSelector(selectIsLoading);

  return isLoading ? (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default LoadingScreen;
