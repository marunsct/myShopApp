import React, {useState} from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import CartItem from "./CartItem";
import {Colors} from "../constants/Color";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  // console.log(props.items);
  // props.items.map((item) => console.log("Hi", item));
  return (
    <View style={styles.rootView}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>Value: ${props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>

      <Button
        color={Colors.primary}
        title={showDetails ? "Hide details" : "Show details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={{margin: 5}}>
          {props.items.map((item) => (
            <CartItem
              key={item.id}
              edit={false}
              title={item.title}
              quantity={item.quantity}
              imageUrl={item.imageUrl}
              totalAmount={item.totalAmount}
              id={item.id}
              price={item.price}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    overflow: "hidden",
  },
  summary: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    marginBottom: 10,
  },
  totalAmount: {
    fontFamily: "OpenSansBold",
    fontSize: 16,
  },
  date: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginTop: 10,
  },
});

export default OrderItem;
