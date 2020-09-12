import React from "react";
import {View, StyleSheet, Text, FlatList} from "react-native";
import {useSelector} from "react-redux";
import OrderItem from "../../components/OrderItem";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.Orders.orders);

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
});

export default OrderScreen;
