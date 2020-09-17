import React, {useState, useReducer, useCallback} from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {Colors} from "../../constants/Color";
import Card from "../../components/Card";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AuthFormInput from "../../components/AuthFormInput";
import {authActions} from "../../store/actions/authActions.js";
import {useDispatch} from "react-redux";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SIGNIN = "SIGNIN";
const SIGNUP = "SIGNUP";
const SIGNIN_UPDATE = "SIGNIN_UPDATE";
const SIGNUP_UPDATE = "SIGNUP_UPDATE";
const CLEAR = "CLEAR";
const initialState = {
  signIn: {
    inputValues: {
      userName: "",
      password: "",
    },
    inputValidation: {
      userName: false,
      password: false,
    },
    isFormValid: false,
  },
  signUp: {
    inputValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      fName: "",
      lName: "",
      phone: "",
    },
    inputValidation: {
      userName: false,
      password: false,
      confirmPassword: false,
      firstName: false,
      lastName: false,
      phone: false,
    },
    isFormValid: false,
  },
};

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNIN: {
      return state;
    }
    case SIGNUP: {
      return state;
    }
    case SIGNIN_UPDATE: {
      let inputValues = {...state.signIn.inputValues};
      let inputValidation = {...state.signIn.inputValidation};
      let formValid = true;

      inputValues[action.input] = action.value;
      inputValidation[action.input] = action.isValid;

      for (const key in inputValidation) {
        formValid = formValid && inputValidation[key];
      }

      return {...state, signIn: {inputValues, inputValidation, isFormValid: formValid}};
    }
    case SIGNUP_UPDATE: {
      let inputValues = {...state.signUp.inputValues};
      let inputValidation = {...state.signUp.inputValidation};
      let formValid = true;

      inputValues[action.input] = action.value;
      inputValidation[action.input] = action.isValid;

      for (const key in inputValidation) {
        formValid = formValid && inputValidation[key];
      }

      return {
        ...state,
        signUp: {inputValues, inputValidation, isFormValid: formValid},
      };
    }
    case CLEAR: {
      // console.log("trigger", state);
      return initialState;
    }
    default:
      return state;
  }
};

const Authentication = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(true);

  const [authState, authDispatch] = useReducer(authReducer, {...initialState});

  const dispatch = useDispatch();

  const inputHandler = useCallback(
    (inputField, inputValue, isValid) => {
      // console.log("1", inputField, inputValue, isValid);
      authDispatch({
        type: isExisting ? SIGNIN_UPDATE : SIGNUP_UPDATE,
        value: inputValue,
        isValid: isValid,
        input: inputField,
      });
    },
    [authDispatch]
  );

  useState(async () => {
    try {
      setIsLoading(true);
      let jsonData = await AsyncStorage.getItem("AuthData");
      if (!jsonData) {
        setIsLoading(false);
        return;
      }
      jsonData = await JSON.parse(jsonData);
      const expiresIn = new Date(jsonData.expiryTime);
      if (expiresIn <= new Date() || !jsonData.idToken || !jsonData.localId) {
        setIsLoading(false);
        return;
      }
      console.log(jsonData);
      await dispatch(authActions.loadAuthData(jsonData));
      //setIsLoading(false);
    } catch (err) {
      console.log("error in reading auth data", err);
      setIsLoading(false);
    }
  }, [dispatch]);

  const signInForm = useCallback(() => {
    if (isExisting) {
      return (
        <View>
          <AuthFormInput
            key="userName"
            id="userName"
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
            onInputChange={inputHandler}
            value={authState.signIn.inputValues.userName}
            initialValue={""}
            isValid={authState.signIn.inputValidation.userName}
            errorText="Email is not valid. Kindly check!!"
          />
          <AuthFormInput
            key="password"
            id="password"
            label={"Password"}
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
            onInputChange={inputHandler}
            value={authState.signIn.inputValues.password}
            isValid={authState.signIn.inputValidation.password}
            errorText="Please enter your password"
          />
        </View>
      );
    } else {
      //
      //console.log();
      return (
        <View style={{marginTop: 30}}>
          <AuthFormInput
            id="firstName"
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
            onInputChange={inputHandler}
            value={authState.signUp.inputValues.firstName}
            isValid={authState.signUp.inputValidation.firstName}
            errorText="First Name is not valid. Kindly check!!"
          />
          <AuthFormInput
            id="lastName"
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
            onInputChange={inputHandler}
            value={authState.signUp.inputValues.lastName}
            isValid={authState.signUp.inputValidation.lastName}
            errorText="Last Name is not valid. Kindly check!!"
          />
          <AuthFormInput
            id="userName"
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
            onInputChange={inputHandler}
            value={authState.signUp.inputValues.userName}
            isValid={authState.signUp.inputValidation.userName}
            errorText="Email is not valid. Kindly check!!"
          />
          <AuthFormInput
            id="password"
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
            onInputChange={inputHandler}
            value={authState.signUp.inputValues.password}
            isValid={authState.signUp.inputValidation.userName}
            errorText="Password is not valid. Enter password of minimum length of 5!!!"
          />
          <AuthFormInput
            id="confirmPassword"
            label={"Confirm Password"}
            iconClass={FontAwesomeIcon}
            iconName={"check-square-o"}
            iconColor={Colors.primary}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            labelStyle={styles.formLabel}
            style={styles.formInput}
            required={true}
            onInputChange={inputHandler}
            value={authState.signUp.inputValues.confirmPassword}
            isValid={authState.signUp.inputValidation.confirmPassword}
            errorText="Password does not match!!!"
            secureTextEntry={true}
          />
          <AuthFormInput
            id="phone"
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
            onInputChange={inputHandler}
            value={authState.signUp.inputValues.phone}
            isValid={authState.signUp.inputValidation.phone}
            errorText="Phone Number is not valid. Kindly check!!"
          />
        </View>
      );
    }
  }, [isExisting]);

  const executeAuth = useCallback(
    async (Action, payload) => {
      try {
        setIsLoading(true);
        // console.log("1", Action, payload);
        await dispatch(authActions[Action](payload));
        if (Action === "signUp") {
          setIsLoading(false);
          Alert.alert(
            "Account Created!!",
            "Your account has been created. Sing in using your account",
            [{title: "Ok", type: "default"}]
          );
          setIsExisting(true);
        }
      } catch (err) {
        setIsLoading(false);
        Alert.alert("Error", err.message, [{title: "Ok", type: "destructive"}]);
      }
    },
    [dispatch]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "android" ? "primary" : "padding"}
      keyboardVerticalOffset={90}
    >
      <ScrollView>
        <View style={styles.rootView}>
          <Card style={styles.formContainer}>
            {false && <Text style={styles.text}>Sign In</Text>}
            {signInForm()}
            <View style={styles.SignInButton}>
              <Button
                title={isExisting ? "Sign In" : "Sign Up"}
                color={Platform.OS === "android" ? Colors.accent : Colors.primary}
                onPress={() => {
                  // console.log(isExisting, authState);
                  if (isExisting && authState.signIn.isFormValid) {
                    let payload = authState.signIn.inputValues;
                    executeAuth("login", payload);
                  } else if (!isExisting && authState.signUp.isFormValid) {
                    let payload = authState.signUp.inputValues;
                    executeAuth("signUp", payload);
                  }
                }}
              />
            </View>
          </Card>

          <View style={styles.signUpContainer}>
            <Text>{isExisting ? "Don't have an account??" : "Have an account??"}</Text>
            <TouchableOpacity
              onPress={() => {
                authDispatch({type: CLEAR});
                //console.log(authState);
                setIsExisting(!isExisting);
              }}
            >
              <Text style={styles.signUpText}>
                {isExisting ? "Create New!" : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "android" ? "#ffe6f5" : "transparent",
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
    // backgroundColor: Platform.OS === "android" ? Colors.primary : "transparent",
    // borderWidth: 1,
  },
  formInput: {
    //marginVertical: 10,
    width: windowWidth * 0.68,
  },
  SignInButton: {
    marginBottom: 15,
    marginTop: 5,
  },
  formLabel: {
    color: Colors.accent,
  },
  signUpText: {
    color: "green",
  },
  signUpContainer: {
    width: windowWidth * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 15,
  },
  centered: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    height: windowHeight * 0.7,
    width: windowWidth * 0.97,
  },
});

export default Authentication;
