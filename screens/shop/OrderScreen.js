import React, {useCallback, useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {useSelector, useDispatch} from "react-redux";
import OrderItem from "../../components/OrderItem";
import {orderAction} from "../../store/actions/orderAction";
import {Colors} from "../../constants/Color";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState();
  const orders = useSelector((state) => state.Orders.orders);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      try {
        setIsLoading(true);
        dispatch(orderAction.loadOrders())
          .then((data) => {
            console.log(data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setErrorText(err.message);
          });
      } catch (err) {
        setIsLoading(false);
        setErrorText(err.message);
      }
      return () => console.log("lost order screen focus");
    }, [dispatch])
  );

  if (errorText) {
    console.log("error pane");
    Alert.alert("Error Occurred!!", errorText, [
      {
        title: "Ok",
        type: "error",
        onPress: () => {
          setErrorText(null);
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.rootView}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.key}
        renderItem={(item, index) => {
          // console.log("Hi", item.item.readableDate, "bye");
          return (
            <OrderItem
              key={index}
              totalAmount={item.item.orderValue}
              date={item.item.readableDate}
              items={item.item.orderItems}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    overflow: "hidden",
    //borderWidth: 1,
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

export default OrderScreen;
