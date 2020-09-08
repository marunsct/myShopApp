import PRODUCTS from "../../data/dummy-data";
import {type} from "../actions/cartActions";
import Cart from "../../models/cart";

const initialState = {
  cart: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.ADD2CART: {
      // console.log("payload" + action.payload);
      let oldCart = {...state};
      // console.log("before" + oldCart.totalAmount);
      let oldCartItem = {...state.cart[action.payload.id]};
      let quantity = action.payload.quantity
        ? action.payload.quantity
        : 1 + oldCartItem.quantity;
      if (oldCart.cart[action.payload.id]) {
        let newCart = new Cart(
          quantity,
          action.payload.price,
          action.payload.title,
          quantity * action.payload.price,
          action.payload.imageUrl
        );
        oldCart.cart[action.payload.id] = {...newCart};
        oldCart.totalAmount = oldCart.totalAmount + newCart.price;
        //return {...state, ...oldCart};
        //console.log("block1");
      } else {
        let newCart = new Cart(
          1,
          action.payload.price,
          action.payload.title,
          action.payload.price,
          action.payload.imageUrl
        );
        oldCart.cart[action.payload.id] = {...newCart};
        oldCart.totalAmount = oldCart.totalAmount + action.payload.price;
        //return {...state, ...oldCart};
        // console.log("block2");
      }
      console.log("after" + oldCart.totalAmount);
      return {...state, ...oldCart};
    }
    case type.REMOVEFROMCART: {
      let oldCart = {...state};
      let oldCartItem = {...oldCart.cart[action.payload.id]};
      let quantity = oldCartItem.quantity - action.payload.quantity;
      let newCart = new Cart(
        quantity,
        action.payload.price,
        action.payload.title,
        quantity * action.payload.price,
        action.payload.imageUrl
      );
      oldCart.cart[action.payload.id] = {...newCart};
      oldCart.totalAmount = oldCart.totalAmount - action.payload.price;
      return {...state, ...oldCart};
    }
    case type.DELETECARTITEM: {
      let oldCart = {...state};
      let oldCartItem = {...state.cart[action.payload.id]};
      delete oldCart.cart[action.payload.id];
      oldCart.totalAmount = oldCart.totalAmount - oldCartItem.totalAmount;
      return {...state, ...oldCart};
    }
    default:
      return state;
  }
};
