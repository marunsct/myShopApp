import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";

import {Colors} from "../constants/Color";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RoundedButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
      <View>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "android" ? Colors.primary : "transparent",
    width: windowWidth * 0.25,
    height: windowHeight * 0.06,
    borderRadius: 10,
    elevation: 1,
    overflow: "hidden",
  },
  text: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontSize: windowHeight * 0.02,
    fontFamily: "OpenSans",
  },
});

export default RoundedButton;
