import React, {useReducer, useEffect} from "react";
import {View, Text, TextInput, StyleSheet, Alert, Dimensions} from "react-native";
import {Fumi} from "react-native-textinput-effects";
import {Colors} from "../constants/Color";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const INPUT_HANDLER = "INPUT_HANDLER";
const INPUT_BLUR = "INPUT_BLUR";

const formReducer = (state, action) => {
  switch (action.type) {
    case INPUT_HANDLER:
      return {...state, value: action.value, isValid: action.isValid};
    case INPUT_BLUR:
      return {...state, touched: true};
    default:
      return state;
  }
};

const AuthFormInput = (props) => {
  const {onInputChange} = props;
  const [inputState, dispatch] = useReducer(formReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.isValid,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      console.log(props.id, inputState.isValid);
      onInputChange(props.id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange]);

  const inputHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    // console.log("3", text, "4");
    if (props.required && text.trim().length === 0) {
      //console.log("2");
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({type: INPUT_HANDLER, value: text, isValid: isValid});
  };

  const lostFocus = () => {
    console.log(props.id);
    dispatch({type: INPUT_BLUR});
  };

  return (
    <View style={{...styles.formControl, ...props.rootView}}>
      <Fumi
        {...props}
        label={props.label}
        value={inputState.value}
        onBlur={lostFocus}
        onChangeText={inputHandler}
        autoCorrection
        iconClass={props.iconClass}
        iconName={props.iconName}
        iconColor={props.iconColor}
        iconSize={props.iconSize}
        iconWidth={props.iconWidth}
        inputPadding={props.inputPadding}
        labelStyle={{...styles.formLabel, ...props.labelStyle}}
        style={{...styles.formInput, ...props.style}}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    //width: windowWidth * 0.9,
    margin: 10,
    //padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  labelStyle: {
    fontSize: windowHeight * 0.016,
    fontFamily: "OpenSansBold",
    marginBottom: 25,
  },
  input: {
    borderBottomColor: "#888",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "OpenSans",
    color: "red",
    fontSize: 13,
  },
  formInput: {
    //marginVertical: 10,
    width: windowWidth * 0.68,
  },
  SignInButton: {
    marginVertical: 10,
  },
  formLabel: {
    color: Colors.accent,
  },
});

export default AuthFormInput;
