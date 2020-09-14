import React, {useLayoutEffect, useEffect, useState, useCallback} from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductTile from "../../components/ProductTile";
import HeaderIcon from "../../components/HeaderIcon";
import {Colors} from "../../constants/Color";
import {actionCreators} from "../../store/actions/cartActions";
import {Ionicons, EvilIcons, AntDesign} from "@expo/vector-icons";
import {setProduct} from "../../store/actions/ProductActions";
import {useFocusEffect} from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ProductOverViewScreen = (props) => {
  const [isLoading, setIsLoading] = useState();
  const [isRefreshing, setIsRefreshing] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const products = useSelector((state) => state.Products.products);
  const {navigation} = props;
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await dispatch(setProduct());
      setIsRefreshing(false);
    } catch (err) {
      setErrorMsg(err.message);
    }
  }, [dispatch]);
  /*
  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);
*/
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadProducts().then(() => {
        setIsLoading(false);
      });
      return () => console.log("lost focus");
    }, [loadProducts])
  );

  useLayoutEffect(() => {
    //console.log("navigation");
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderIcon
            inactiveIconName="pluscircleo"
            activeIconName="wallet"
            color={Platform.OS === "android" ? "white" : Colors.primary}
            favorite={true}
            onPress={() => {
              navigation.navigate("CartScreen", {
                title: "Your Cart",
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
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductsDetail", {
              title: item.title,
              id: item.id,
              otherParam: "anything you want here",
            });
          }}
        >
          <View>
            <Text>
              <AntDesign
                name="infocirlceo"
                size={24}
                color={Platform.OS === "android" ? "black" : Colors.accent}
              />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(actionCreators.addToCart(item));
          }}
        >
          <Text>
            <EvilIcons
              name="cart"
              size={30}
              color={Platform.OS === "android" ? "black" : Colors.accent}
            />
          </Text>
        </TouchableOpacity>
      </ProductTile>
    );
  };
  //console.log(products);

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  console.log(isLoading, products.length);
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products Found. Maybe try adding some!!!</Text>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={products}
        renderItem={renderProducts}
        refreshing={isRefreshing}
        onRefresh={loadProducts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    height: "100%",
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

export default ProductOverViewScreen;
