import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {Platform} from "react-native";
import {Colors} from "../constants/Color";

const HeaderIcon = (props) => {
  // console.log(props);
  return (
    <AntDesign.Button
      name={props.favorite ? props.activeIconName : props.inactiveIconName}
      backgroundColor={Platform.OS === "android" ? Colors.primary : "white"}
      color={props.color}
      onPress={props.onPress}
      size={props.size}
    />
  );
};

export default HeaderIcon;

// {Platform.OS === "android" ? "white" : "#ff1100"} "#f2f2f2"
//"heart" : "hearto"
