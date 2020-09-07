import PRODUCTS from "../../data/dummy-data";
import {type} from "../actions/cartActions";
import Cart from "../../models/cart";

const initialState = {
  cart: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.ADD2CART:
      // console.log("payload" + action.payload);
      let oldCart = {...state};
      // console.log("before" + oldCart.totalAmount);
      let oldCartItem = {...state.cart[action.payload.id]};
      if (oldCart.cart[action.payload.id]) {
        let newCart = new Cart(
          action.payload.quantity + oldCartItem.quantity,
          action.payload.price,
          action.payload.title,
          action.payload.price * action.payload.quantity
        );
        oldCart.cart[action.payload.id] = {...newCart};
        oldCart.totalAmount = oldCart.totalAmount + newCart.price;
        //return {...state, ...oldCart};
        //console.log("block1");
      } else {
        let newCart = new Cart(
          action.payload.quantity,
          action.payload.price,
          action.payload.title,
          action.payload.price
        );
        oldCart.cart[action.payload.id] = {...newCart};
        oldCart.totalAmount = oldCart.totalAmount + action.payload.price;
        //return {...state, ...oldCart};
        // console.log("block2");
      }
      console.log("after" + oldCart.totalAmount);
      return {...state, ...oldCart};

    default:
      return state;
  }
};
