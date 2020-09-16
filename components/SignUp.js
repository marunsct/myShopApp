import React, {useState, useReducer} from "react";
import {View, StyleSheet, Dimensions, Platform} from "react-native";
import {Colors} from "../../constants/Color";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AuthFormInput from "../../components/AuthFormInput";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignUp = (props) => {
  return (
    <View>
      <AuthFormInput
        label={"First Name"}
        iconClass={FontAwesomeIcon}
        iconName={"user-circle-o"}
        iconColor={Colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        labelStyle={styles.formLabel}
        style={styles.formInput}
        required={true}
      />
      <AuthFormInput
        label={"Last Name"}
        iconClass={FontAwesomeIcon}
        iconName={"user-circle-o"}
        iconColor={Colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        labelStyle={styles.formLabel}
        style={styles.formInput}
        required={true}
      />
      <AuthFormInput
        label={"Email"}
        email={true}
        iconClass={Fontisto}
        iconName={"email"}
        iconColor={Colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        labelStyle={styles.formLabel}
        keyboardType="email-address"
        style={styles.formInput}
        required={true}
      />
      <AuthFormInput
        label={"Password"}
        iconClass={FontAwesomeIcon}
        secureTextEntry={true}
        iconName={"braille"}
        iconColor={Colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        labelStyle={styles.formLabel}
        style={styles.formInput}
        required={true}
      />
      <AuthFormInput
        label={"Confirm Password"}
        secureTextEntry={true}
        iconClass={FontAwesomeIcon}
        iconName={"braille"}
        iconColor={Colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        labelStyle={styles.formLabel}
        style={styles.formInput}
        required={true}
      />
      <AuthFormInput
        label={"Phone"}
        iconClass={FontAwesomeIcon}
        iconName={"tablet"}
        iconColor={Colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        keyboardType="phone-pad"
        labelStyle={styles.formLabel}
        style={styles.formInput}
        required={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "android" ? Colors.primary : "transparent",
    height: windowHeight * 0.9,
  },
  text: {
    color: Colors.accent,
    fontFamily: "OpenSansBold",
    marginBottom: 10,
    fontSize: windowHeight * 0.03,
  },
  formContainer: {
    //borderWidth: 1,
    width: windowWidth * 0.9,
    minHeight: windowHeight * 0.35,
    margin: 5,
    // marginTop: windowHeight * 0.2,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Platform.OS === "android" ? Colors.primary : "transparent",
    // borderWidth: 1,
  },
  formInput: {
    marginVertical: 10,
    width: windowWidth * 0.68,
  },
  SignInButton: {
    marginVertical: 10,
  },
  formLabel: {
    color: Colors.accent,
  },
  signUpText: {
    color: Platform.OS === "android" ? Colors.accent : "green",
  },
  signUpContainer: {
    width: windowWidth * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 15,
  },
});

export default SignUp;
