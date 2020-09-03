import React from "react";
import {View, StyleSheet, Text, Button, Image, Dimensions} from "react-native";
import {useSelector} from "react-redux";
import RoundedButton from "../../components/RoundedButton";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductDetailScreen = (props) => {
  const {route} = props;
  const products = useSelector((state) => state.Products.products);

  let selectedProduct = products.find((product) => product.id === route.params.id);
  console.log(windowWidth);
  return (
    <View style={styles.rootView}>
      <View style={styles.imageContainer}>
        <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.description}>
          <Text style={styles.text}>{selectedProduct.description}</Text>
        </View>
        <Text style={{...styles.text, ...{color: "#888", fontFamily: "OpenSansBold"}}}>
          $ {selectedProduct.price.toFixed(2)}
        </Text>
        <View style={styles.buttonContainer}>
          <RoundedButton title="Edit" />
          <RoundedButton title="Add to Cart" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    //borderWidth: 1,
  },
  imageContainer: {
    //borderWidth: 5,
    //marginVertical: 5,
    width: windowWidth,
    height: windowHeight * 0.45,
  },
  image: {width: windowWidth, height: windowHeight * 0.45},
  titleText: {},
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //marginHorizontal: 20,
    width: windowWidth * 0.7,
    marginVertical: 20,
    //borderWidth: 1,
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: windowHeight * 0.4,
    width: windowWidth,
    // borderWidth: 1,
    marginVertical: 10,
    // alignItems:
  },
  description: {
    width: windowWidth,
    //height: windowHeight * 0.1,
    //borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    padding: 10,
  },
  text: {
    fontFamily: "OpenSans",
    fontSize: windowHeight * 0.02,
    marginVertical: 10,
  },
});

export default ProductDetailScreen;
