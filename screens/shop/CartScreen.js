import React from "react";
import {View, StyleSheet, Text, Button, FlatList, Dimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import CartItem from "../../components/CartItem";
import {Colors} from "../../constants/Color";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CartScreen = (props) => {
  const cart = useSelector((state) => {
    const tempCart = [];
    for (const key in state.Cart.cart) {
      tempCart.push({
        id: key,
        title: state.Cart.cart[key].title,
        price: state.Cart.cart[key].price,
        quantity: state.Cart.cart[key].quantity,
        imageUrl: state.Cart.cart[key].url,
        totalAmount: state.Cart.cart[key].totalAmount,
      });
    }
    return tempCart;
  });

  const totalAmount = useSelector((state) => state.Cart.totalAmount);

  return (
    <View style={[styles.rootView]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Edit Cart</Text>
        <View>
          <Button title="Check Out" color={Colors.accent} />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <CartItem
              title={item.item.title}
              quantity={item.item.quantity}
              imageUrl={item.item.imageUrl}
              totalAmount={item.item.totalAmount}
              id={item.item.id}
              price={item.item.price}
            />
          )}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.amountText}>Total Amount : </Text>
        <Text style={styles.amountText}> ${totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    //alignItems: "flex-start",
    //justifyContent: "center",
  },
  textContainer: {
    flexDirection: "row",
    width: "95%",
    height: windowHeight * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 0.5,
    elevation: 3,
    backgroundColor: "white",
    //borderWidth: 1,
    marginHorizontal: windowWidth * 0.025,
    marginVertical: windowWidth * 0.05,
  },
  titleContainer: {
    // shadowOpacity: 0.5,
    // shadowOffset: {width: 0, height: 1},
    // shadowRadius: 0.5,
    //  elevation: 3,
    //width: "100%",
    //borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    padding: 5,
    fontSize: windowHeight * 0.023,
    fontFamily: "OpenSansBold",
  },
  amountText: {
    fontSize: windowHeight * 0.023,
    fontFamily: "OpenSansBold",
  },
});

export default CartScreen;
