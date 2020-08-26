import React from "react";
import {
  View,
  Flatlist,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Text,
} from "react-native";

import {useSelector} from "react-redux";

const ProductOverViewScreen = (props) => {
  const renderProducts = (item) => {
    console.log("hi");
    return (
      <View>
        <TouchableOpacity>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const products = [];
  //useSelector((state) => state.Products.products);
  return (
    <View>
      <Flatlist
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProducts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
  image: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProductOverViewScreen;

/*
    <TouchableOpacity>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View>
        <Text>{item.title}</Text>
        <Text>{item.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Details" onPress={() => {}} />
        <Button title="Price" onPress={() => {}} />
        <Button title="Add to Cart" onPress={() => {}} />
      </View>
    </TouchableOpacity>
    <Flatlist data={products} renderItem={renderProducts} />
    */
