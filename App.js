import React, {useState} from "react";
import {Provider} from "react-redux";
import {AppLoading} from "expo";
import * as Font from "expo-font";
import store from "./store/store";
import AppNavigator from "./navigation/AppNavigator";

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
      <AppNavigator />
    </Provider>
  );
}
