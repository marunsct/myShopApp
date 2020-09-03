import React from "react";
import {Platform} from "react-native";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
//import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {Colors} from "../constants/Color";

//const NaviConfig = {};

const ProductStackNavigator = createStackNavigator();

export function productStackNavigator() {
  return (
    <ProductStackNavigator.Navigator
      initialRouteName="ProductsOverView"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTitleStyle: {
          fontFamily: "OpenSansBold",
        },
        headerBackTitleStyle: {fontFamily: "OpenSans"},
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <ProductStackNavigator.Screen
        name="ProductsOverView"
        component={ProductOverViewScreen}
        options={{title: "Products"}}
      />
      <ProductStackNavigator.Screen
        name="ProductsDetail"
        component={ProductDetailScreen}
        options={(navData) => {
          console.log(navData.route);
          return {
            title: navData.route.params.title,
          };
        }}
      />
      <ProductStackNavigator.Screen
        name="NewProduct"
        component={UserProductScreen}
        options={(navData) => {
          return {
            title: navData.route.params.title,
          };
        }}
      />
      <ProductStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={(navData) => {
          return {
            title: navData.route.params.title,
          };
        }}
      />
    </ProductStackNavigator.Navigator>
  );
}
