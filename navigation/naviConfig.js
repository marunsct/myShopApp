import React from "react";
import {Platform} from "react-native";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
//import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HeaderIcon from "../components/HeaderIcon";
import {Ionicons} from "@expo/vector-icons";

import {Colors} from "../constants/Color";

//const NaviConfig = {};

const ProductStackNavigator = createStackNavigator();

function productsStackNavigator() {
  return (
    <ProductStackNavigator.Navigator
      initialRouteName="ProductsOverView"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
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
        options={(navData) => {
          return {
            title: "Products",
            headerLeft: () => (
              <HeaderIcon
                activeIconName="bars"
                inactiveIconName="bars"
                color={Platform.OS === "android" ? "white" : Colors.primary}
                size={25}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                  //console.log(navData);
                }}
              />
            ),
          };
        }}
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
      <ProductStackNavigator.Screen
        name="CartScreen"
        component={CartScreen}
        options={(navData) => {
          return {
            title: navData.route.params.title,
          };
        }}
      />
    </ProductStackNavigator.Navigator>
  );
}

const OrderStackNavigator = createStackNavigator();

function ordersStackNavigator() {
  return (
    <OrderStackNavigator.Navigator
      initialRouteName="OrdersOverview"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
        },
        headerTitleStyle: {
          fontFamily: "OpenSansBold",
        },
        headerBackTitleStyle: {fontFamily: "OpenSans"},
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <OrderStackNavigator.Screen
        name="OrdersOverview"
        component={OrderScreen}
        options={(navData) => {
          return {
            title: "Your Orders",
            headerLeft: () => (
              <HeaderIcon
                activeIconName="bars"
                inactiveIconName="bars"
                color={Platform.OS === "android" ? "white" : Colors.primary}
                size={25}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                  //console.log(navData);
                }}
              />
            ),
          };
        }}
      />
    </OrderStackNavigator.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export function drawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      backBehavior="history"
      //hideStatusBar={false}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "grey",
        itemStyle: {marginVertical: 10},
        labelStyle: {fontFamily: "OpenSansBold"},
      }}
    >
      <Drawer.Screen
        name="Products"
        component={productsStackNavigator}
        options={(navData) => {
          return {
            drawerIcon: ({focused, size}) => (
              <Ionicons
                name="ios-list"
                size={25}
                color={focused ? Colors.primary : "grey"}
              />
            ),
          };
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={ordersStackNavigator}
        options={(navData) => {
          return {
            drawerIcon: ({focused, size}) => (
              <Ionicons
                name="ios-cart"
                size={25}
                color={focused ? Colors.primary : "grey"}
              />
            ),
          };
        }}
      />
    </Drawer.Navigator>
  );
}
