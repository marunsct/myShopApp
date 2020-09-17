import React from "react";
import {Text, View, Button} from "react-native";
import {Platform} from "react-native";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
//import EditProductScreen from "../screens/user/EditProductScreen";
//import UserProductScreen from "../screens/user/UserProductScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Authentication from "../screens/user/Authentication";
//import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HeaderIcon from "../components/HeaderIcon";
import {Ionicons} from "@expo/vector-icons";
import {useSelector, useDispatch} from "react-redux";
import {Colors} from "../constants/Color";
import {NavigationContainer} from "@react-navigation/native";
import {authActions} from "../store/actions/authActions";
//const NaviConfig = {};

const ProductStackNavigator = createStackNavigator();

export function productsStackNavigator() {
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

const UserProductsNavigator = createStackNavigator();

function UserProducts() {
  return (
    <UserProductsNavigator.Navigator
      initialRouteName="UserProducts"
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
      <UserProductsNavigator.Screen
        name="UserProducts"
        component={UserProductScreen}
        options={(navData) => {
          return {
            title: "Your Products",
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
      <UserProductsNavigator.Screen
        name="EditProducts"
        component={EditProductScreen}
        options={(navData) => {
          return {
            title: navData.route.params.title,
          };
        }}
      />
    </UserProductsNavigator.Navigator>
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Products"
        component={productsStackNavigator}
        options={() => {
          return {
            drawerIcon: ({focused}) => (
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
        options={() => {
          return {
            drawerIcon: ({focused}) => (
              <Ionicons
                name="ios-cart"
                size={25}
                color={focused ? Colors.primary : "grey"}
              />
            ),
          };
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={UserProducts}
        options={() => {
          return {
            drawerIcon: ({focused}) => (
              <Ionicons
                name="ios-create"
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

const LoginStackNavigator = createStackNavigator();

export function loginScreenConfig() {
  return (
    <LoginStackNavigator.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "transparent",
        },
        headerTitleStyle: {
          fontFamily: "OpenSansBold",
        },
        headerBackTitleStyle: {fontFamily: "OpenSans"},
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <LoginStackNavigator.Screen
        name="AuthScreen"
        component={Authentication}
        options={{title: "Login"}}
      />
    </LoginStackNavigator.Navigator>
  );
}

export function ManiNavigator(isLoggedIn) {
  // return loginScreenConfig();

  if (isLoggedIn) {
    return drawerNavigator();
  } else {
    return loginScreenConfig();
  }
}

const AppNavigator = (props) => {
  const isLoggedIn = useSelector((state) => state.Authentication.isUserLoggedIn);

  return <NavigationContainer>{ManiNavigator(isLoggedIn)}</NavigationContainer>;
};

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        icon={({focused}) => (
          <Ionicons
            name="ios-log-out"
            size={25}
            color={focused ? Colors.primary : "grey"}
          />
        )}
        activeTintColor={Colors.primary}
        inactiveTintColor="grey"
        Style={{marginVertical: 10}}
        labelStyle={{fontFamily: "OpenSansBold"}}
        onPress={() => dispatch(authActions.logOut())}
      />
    </DrawerContentScrollView>
  );
};

export default AppNavigator;
