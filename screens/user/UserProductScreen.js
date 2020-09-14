import React, {useLayoutEffect, useState} from "react";
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Alert} from "react-native";
import ProductTile from "../../components/ProductTile";
import {useSelector, useDispatch} from "react-redux";
import {Ionicons, EvilIcons, AntDesign} from "@expo/vector-icons";
import {Colors} from "../../constants/Color";
import {actionCreators} from "../../store/actions/ProductActions";
import HeaderIcon from "../../components/HeaderIcon";

const UserProductScreen = (props) => {
  const [errorText, setErrorText] = useState(null);
  const userProducts = useSelector((state) => state.Products.userProducts);
  const dispatch = useDispatch();
  const {navigation} = props;

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this product?", [
      {text: "No", style: "default"},
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          setErrorText(null);
          dispatch(actionCreators.deleteUserProduct(id)).catch((err) =>
            setErrorText(err.message)
          );
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    //console.log("navigation");
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderIcon
            inactiveIconName="pluscircleo"
            activeIconName="pluscircleo"
            color={Platform.OS === "android" ? "white" : Colors.primary}
            favorite={true}
            onPress={() => {
              navigation.navigate("EditProducts", {
                title: "Add New Product",
                id: null,
                otherParam: "anything you want here",
              });
            }}
          />
        );
      },
    });
  });

  // console.log(userProducts);
  if (errorText) {
    Alert.alert("Error Occurred!!", errorText, [
      {
        title: "Ok",
        type: "error",
      },
    ]);
  }

  return (
    <View style={styles.rootView}>
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          //console.log(itemData.item);
          return (
            <ProductTile
              imageUrl={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              description={itemData.item.description}
              onEdit={() => {}}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditProducts", {
                    title: "Edit Product",
                    id: itemData.item.id,
                    otherParam: "anything you want here",
                  });
                }}
              >
                <View>
                  <Text>
                    <AntDesign
                      name="edit"
                      size={24}
                      color={Platform.OS === "android" ? "black" : Colors.accent}
                    />
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteHandler.bind(this, itemData.item.id)}>
                <Text>
                  <EvilIcons
                    name="trash"
                    size={30}
                    color={Platform.OS === "android" ? "black" : Colors.accent}
                  />
                </Text>
              </TouchableOpacity>
            </ProductTile>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    //flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProductScreen;
