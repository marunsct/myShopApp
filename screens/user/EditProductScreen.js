import React, {useLayoutEffect, useReducer, useCallback} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import HeaderIcon from "../../components/HeaderIcon";
import {Colors} from "../../constants/Color";
import {actionCreators} from "../../store/actions/ProductActions";
import FormInput from "../../components/FormInput";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValue = {...state.inputValues, [action.input]: action.value};
    const updateValidation = {...state.inputValidation, [action.input]: action.isValid};
    let updatedFormValid = true;
    for (const key in updateValidation) {
      //console.log(updatedFormValid, updateValidation[key]);
      updatedFormValid = updatedFormValid && updateValidation[key];
    }
    //console.log(updateValidation, updatedValue);
    return {
      ...state,
      inputValues: updatedValue,
      inputValidation: updateValidation,
      isFormValid: updatedFormValid,
    };
  }
};

const EditProductScreen = (props) => {
  //console.log("navigation");

  const dispatch = useDispatch();
  const {navigation, route} = props;
  //console.log(props);
  const sId = route.params.id;
  const editProduct = useSelector((state) =>
    state.Products.products.find((product) => product.id === sId)
  );
  //console.log(sId, editProduct);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : "",
      description: editProduct ? editProduct.description : "",
      imageUrl: editProduct ? editProduct.imageUrl : "",
      price: "",
    },
    inputValidation: {
      title: editProduct ? true : false,
      description: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      price: editProduct ? true : false,
    },
    isFormValid: editProduct ? true : false,
  });

  const inputHandler = useCallback(
    (inputField, inputValue, isValid) => {
      // console.log("1", inputField, inputValue, isValid);
      formDispatch({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: isValid,
        input: inputField,
      });
    },
    [formDispatch]
  );

  const onSave = useCallback(() => {
    //console.log(formState);
    if (!formState.isFormValid) {
      Alert.alert("Wrong Input!!", "Please check the errors in the form", [
        {
          title: "Ok",
          style: "default",
        },
      ]);
      return;
    }
    if (!editProduct) {
      dispatch(
        actionCreators.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          +formState.inputValues.price,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        actionCreators.updateProduct(
          sId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    }
    navigation.goBack();
  }, [formState]);

  useLayoutEffect(() => {
    //console.log("navigation");
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderIcon
            inactiveIconName="enter"
            activeIconName="enter"
            color={Platform.OS === "android" ? "white" : Colors.primary}
            favorite={true}
            onPress={onSave}
          />
        );
      },
    });
  }, [formState]);
  //console.log(formState.inputValidation);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={styles.form}>
          <FormInput
            id="title"
            label="Title"
            value={formState.inputValues.title}
            isValid={formState.inputValidation.title}
            onInputChange={inputHandler}
            errorText="Please enter a valid title!"
            returnKeyType="next"
            required={true}
            initialValue={editProduct ? editProduct.title : ""}
            isValid={!!editProduct}
          />
          <FormInput
            id="description"
            label="Description"
            value={formState.inputValues.description}
            isValid={formState.inputValidation.description}
            onInputChange={inputHandler}
            errorText="Please enter a valid description!"
            returnKeyType="next"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            required={true}
            initialValue={editProduct ? editProduct.description : ""}
            isValid={!!editProduct}
          />
          {editProduct ? null : (
            <FormInput
              id="price"
              label="Price"
              value={formState.inputValues.price}
              isValid={formState.inputValidation.price}
              onInputChange={inputHandler}
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              min={0.1}
              max={10000}
              required={true}
            />
          )}
          <FormInput
            id="imageUrl"
            label="Image Url"
            value={formState.inputValues.imageUrl}
            isValid={formState.inputValidation.imageUrl}
            onInputChange={inputHandler}
            errorText="Please enter a valid image url!"
            required={true}
            initialValue={editProduct ? editProduct.imageUrl : ""}
            isValid={!!editProduct}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "flex-start",
    marginVertical: 15,
    // padding: 10,
  },
  formControl: {
    width: windowWidth * 0.9,
    margin: 5,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {width: 0, height: 1},
    // borderWidth: 1,
  },
  labelStyle: {
    fontSize: windowHeight * 0.016,
    fontFamily: "OpenSansBold",
    marginBottom: 25,
  },
  input: {
    borderBottomColor: "#888",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
