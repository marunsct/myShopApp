import PRODUCTS from "../../data/dummy-data";
import {type} from "../actions/ProductActions";

const initialState = {
  products: PRODUCTS,
  availableProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
  userProducts: [],
  cartItems: [],
};

const ProductReducer = (state = initialState, action) => {
  //console.log(state);
  switch (action.type) {
    case type.ADD2CART:
      console.log("state");
      let newItem = [...[], ...state.products];
      //
      newItem = newItem.filter((product) => product.id === action.payload);
      console.log(newItem);
      return {...state, ...{cartItems: newItem}};
    default:
      return state;
  }
};

export default ProductReducer;
