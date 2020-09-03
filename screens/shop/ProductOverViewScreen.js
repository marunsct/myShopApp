import React, {useLayoutEffect} from "react";
import {View, StyleSheet, FlatList, Platform} from "react-native";
import {useSelector} from "react-redux";
import ProductTile from "../../components/ProductTile";
import HeaderIcon from "../../components/HeaderIcon";
import {Colors} from "../../constants/Color";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.Products.products);
  const {navigation} = props;
  useLayoutEffect(() => {
    console.log("navigation");
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderIcon
            inactiveIconName="pluscircleo"
            activeIconName="pluscircleo"
            color={Platform.OS === "android" ? "white" : Colors.primary}
            favorite={true}
            onPress={() => {
              navigation.navigate("NewProduct", {
                title: "Add New Product",
                otherParam: "anything you want here",
              });
            }}
          />
        );
      },
    });
  });

  const renderProducts = (data) => {
    let item = data.item;
    // console.log("hi");
    return (
      <ProductTile
        title={item.title}
        imageUrl={item.imageUrl}
        price={item.price}
        ownerId={item.ownerId}
        description={item.description}
        onSelect={() => {
          navigation.navigate("ProductsDetail", {
            title: item.title,
            id: item.id,
            otherParam: "anything you want here",
          });
        }}
        onEdit={() => {
          navigation.navigate("EditProduct", {
            title: item.title,
            id: item.id,
            otherParam: "anything you want here",
          });
        }}
      />
    );
  };
  //console.log(products);
  return (
    <View style={styles.listContainer}>
      <FlatList data={products} renderItem={renderProducts} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 2,
  },
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
