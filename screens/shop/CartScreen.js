import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import CartItem from "../../components/CartItem";
import {Colors} from "../../constants/Color";
import {orderAction} from "../../store/actions/orderAction";
import {actionCreators} from "../../store/actions/cartActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const dispatch = useDispatch();
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
  const orders = useSelector((state) => state.Cart);

  if (errorText) {
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
    <View style={[styles.rootView]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Edit Cart</Text>
        <View>
          <Button
            title="Check Out"
            color={Colors.accent}
            disabled={totalAmount > 0 ? false : true}
            onPress={() => {
              // dispatch(actionCreators.addOrdersAction(orders));
              let payload = {
                cart: cart,
                totalAmount: totalAmount,
              };
              setIsLoading(true);
              dispatch(orderAction.addOrders(payload))
                .then(() => setIsLoading(false))
                .catch((err) => {
                  setIsLoading(false);
                  setErrorText(err.message);
                });
            }}
          />
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
              edit={true}
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

export default CartScreen;
