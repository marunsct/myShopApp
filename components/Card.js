import React from "react";
import {View, StyleSheet} from "react-native";
import {Colors} from "../constants/Color";

const Card = (props) => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
});

export default Card;
