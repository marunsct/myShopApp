import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";

import {Colors} from "../constants/Color";
import DefaultText from "./DefaultText";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MenuItem = (props) => {
  //console.log(props.complexity);
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.mealsColumn}>
          <View style={styles.imageContainer}>
            <ImageBackground source={{uri: props.image}} style={styles.image}>
              <View style={styles.textContainer}>
                <DefaultText style={styles.imageText} numberOfLines={2}>
                  {props.title}
                </DefaultText>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.mealsRow}>
            <DefaultText style={styles.text}>{props.duration} mins</DefaultText>
            <DefaultText style={styles.text}>
              {props.complexity.toUpperCase()}
            </DefaultText>
            <DefaultText style={styles.text}>
              {props.affordability.toUpperCase()}
            </DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: windowHeight * 0.28,
    //width: "100%",
    marginVertical: 15,
    // marginHorizontal: 10,
    overflow: "hidden",
    borderRadius: 10,
    //alignItems: "flex-start",
    //justifyContent: "flex-start",
  },
  mealsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Platform.OS === "ios" ? "rgba(222, 222, 222, 0.7)" : "#ccc",
    overflow: "hidden",
    height: windowHeight * 0.04,
    //borderRadius: 10,
    //marginVertical: 10,
    //borderWidth: 1,
  },
  imageContainer: {
    overflow: "hidden",
    //borderRadius: 10,
  },
  image: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: windowHeight * 0.24,
    width: windowWidth * 0.85,
    //paddingHorizontal: 15,
  },
  mealsColumn: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
    //padding: 5,
    overflow: "hidden",
  },
  imageText: {
    //overlayColor: "black",
    fontSize: windowWidth * 0.055,
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontFamily: "OpenSansBold",
  },
  text: {
    fontSize: 16,
    color: Platform.OS === "android" ? "black" : Colors.primary,
    padding: 5,
  },
  textContainer: {
    backgroundColor:
      Platform.OS === "android" ? "rgba(0,0,0, 0.7)" : "rgba(222, 222, 222, 0.7)",
    width: "100%",
    alignItems: "center",
  },
});

export default MenuItem;
