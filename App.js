import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {StyleSheet, Text, View, Platform} from "react-native";
import {Provider} from "react-redux";
import {AppLoading} from "expo";
import * as Font from "expo-font";
import store from "./store/store";
//import ProductOverViewScreen from "./screens/shop/ProductOverViewScreen";
import {NavigationContainer} from "@react-navigation/native";
import {productStackNavigator, drawerNavigator} from "./navigation/naviConfig";
import {composeWithDevTools} from "redux-devtools-extension";

const fetchFont = () => {
  return Font.loadAsync({
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{drawerNavigator()}</NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
//<ProductOverViewScreen />
