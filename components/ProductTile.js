import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  Button,
} from "react-native";
import {Ionicons, EvilIcons, AntDesign} from "@expo/vector-icons";

import {Colors} from "../constants/Color";
import DefaultText from "./DefaultText";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductTile = (props) => {
  // console.log(props.title, windowWidth, windowHeight);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.productItem}>
        <TouchableOpacity onPress={props.onSelect}>
          <View style={styles.imageContainer}>
            <ImageBackground source={{uri: props.imageUrl}} style={styles.image} />
          </View>
        </TouchableOpacity>
        <View style={styles.productDetails}>
          <View style={styles.title}>
            <View style={{width: "70%"}}>
              <DefaultText style={styles.titleText} numberOfLines={2}>
                {props.title}
              </DefaultText>
            </View>
            <DefaultText style={styles.titleText}>$ {props.price}</DefaultText>
          </View>
          <DefaultText style={styles.text} numberOfLines={5}>
            {props.description}
          </DefaultText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={props.onEdit}>
              <View>
                <Text>
                  <AntDesign
                    name="edit"
                    size={24}
                    color={Platform.OS === "android" ? "black" : Colors.accent}
                  />
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onCart}>
              <Text>
                <EvilIcons
                  name="cart"
                  size={30}
                  color={Platform.OS === "android" ? "black" : Colors.accent}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    //shadowColor: Colors.accent,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 0.5,
    elevation: 3,
  },
  productItem: {
    flexDirection: "row",
    height: windowWidth * 0.4,
    width: windowWidth * 0.95,
    marginVertical: 10,
    // marginHorizontal: 10,
    overflow: "hidden",
    borderRadius: 10,
    //borderWidth: 1,
    //alignItems: "center",
    //justifyContent: "space-evenly",
    alignItems: "flex-start",
    //justifyContent: "flex-start",
  },
  productDetails: {
    //flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    //backgroundColor: Platform.OS === "ios" ? "rgba(222, 222, 222, 0.7)" : "#ccc",
    //overflow: "hidden",
    height: windowWidth * 0.4,
    width: windowWidth * 0.55,
    //borderRadius: 10,
    //marginVertical: 10,
    //borderWidth: 1,
    padding: 10,
  },
  imageContainer: {
    overflow: "hidden",
    height: windowWidth * 0.4,
    width: windowWidth * 0.4,
    //marginLeft: 10,
    borderRadius: 10,
    //padding: 5,
    //borderWidth: 1,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    height: windowWidth * 0.4,
    width: windowWidth * 0.4,
    //paddingHorizontal: 15,
  },
  mealsColumn: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    //padding: 5,
    //overflow: "hidden",
  },
  imageText: {
    //overlayColor: "black",
    fontSize: windowWidth * 0.055,
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontFamily: "OpenSansBold",
  },
  text: {
    fontSize: windowHeight * 0.016,
    color: Platform.OS === "android" ? Colors.primary : "black",
    //padding: 5,
  },
  titleText: {
    fontFamily: "OpenSansBold",
    fontSize: windowHeight * 0.018,
  },
  textContainer: {
    backgroundColor:
      Platform.OS === "android" ? "rgba(0,0,0, 0.7)" : "rgba(222, 222, 222, 0.7)",
    width: "100%",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    width: "100%",
    // padding: 5,
    //borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    padding: 5,
  },
});

export default ProductTile;
