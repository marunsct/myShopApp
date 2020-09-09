import React from "react";
import {View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from "react-native";
//import RoundedButton from "./RoundedButton";
import {Ionicons, EvilIcons, AntDesign} from "@expo/vector-icons";
import {Colors} from "../constants/Color";
import {useDispatch} from "react-redux";
import {actionCreators} from "../store/actions/cartActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

console.log(windowHeight);
const CartItem = (props) => {
  const dispatch = useDispatch();

  const payload = {
    id: props.id,
    price: props.price,
    title: props.title,
    quantity: props.quantity,
    imageUrl: props.imageUrl,
  };
  return (
    <View style={styles.rootView}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props.imageUrl}} />
      </View>
      <View style={styles.middleComponent}>
        <Text style={styles.text}>{props.title}</Text>
        <View style={styles.textContainer}>
          {props.edit && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                payload.quantity = payload.quantity + 1;
                dispatch(actionCreators.addToCart(payload));
              }}
            >
              <Text>
                <AntDesign
                  name={Platform.OS === "android" ? "pluscircleo" : "plus"}
                  size={20}
                  color={Platform.OS === "android" ? "white" : Colors.primary}
                />
              </Text>
            </TouchableOpacity>
          )}

          <Text>
            {props.edit ? "" : "Qty : "}
            {props.quantity}
          </Text>
          {props.edit && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (props.quantity > 1) {
                  payload.quantity = 1;
                  dispatch(actionCreators.removeFromCart(payload));
                } else {
                  dispatch(actionCreators.deleteFromCart(payload));
                }
              }}
            >
              <Text>
                <AntDesign
                  name={Platform.OS === "android" ? "minuscircleo" : "minus"}
                  size={20}
                  color={Platform.OS === "android" ? "white" : Colors.primary}
                />
              </Text>
            </TouchableOpacity>
          )}

          <Text> x ${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price : ${props.totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.delete}>
        {props.edit && (
          <TouchableOpacity
            onPress={() => {
              dispatch(actionCreators.deleteFromCart(payload));
            }}
          >
            <Text>
              <AntDesign name="delete" size={25} color={Colors.primary} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    //height: windowHeight * 0.2,
    width: windowWidth * 0.99,
    //borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 3,
    backgroundColor: "white",
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 0.5,
    elevation: 3,
    overflow: "hidden",
  },
  button: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "transparent",
    borderRadius: windowHeight * 0.012,
  },
  textContainer: {
    flexDirection: "row",
    width: windowWidth * 0.95 * 0.55,
    //height: windowHeight * 0.2,
    alignItems: "center",
    justifyContent: "space-evenly",
    // borderWidth: 1,
    //   marginTop: windowHeight * 0.15 * 0.3,
  },
  imageContainer: {
    width: windowWidth * 0.95 * 0.3,
    // height: windowHeight * 0.15,
    height: windowWidth * 0.95 * 0.2,
    //borderWidth: 1,
  },
  image: {
    width: windowWidth * 0.95 * 0.3,
    //height: windowHeight * 0.15,
    height: windowWidth * 0.95 * 0.2,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  delete: {
    width: windowWidth * 0.95 * 0.15,
    //height: windowHeight * 0.15,
    height: windowWidth * 0.95 * 0.2,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  middleComponent: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    //height: windowHeight * 0.15,
    height: windowWidth * 0.95 * 0.2,
    padding: 5,
    //borderWidth: 1,
  },
  priceContainer: {
    width: windowWidth * 0.95 * 0.55,
    alignItems: "flex-end",
  },
  text: {
    fontFamily: "OpenSansBold",
    fontSize: windowHeight * 0.02,
  },
  price: {
    fontFamily: "OpenSans",
    fontSize: windowHeight * 0.018,
  },
});

export default CartItem;
