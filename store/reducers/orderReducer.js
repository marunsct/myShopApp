import {orderType} from "../actions/orderAction";
import orders from "../../models/orders";

const initialState = {
  orders: [],
};

export default orderRepository = (state = initialState, action) => {
  switch (action.type) {
    case orderType.ADDORDER: {
      //console.log(".111.", orderType.ADDORDER);
      let date = new Date().toString();
      const newOrder = new orders(
        date,
        action.payload.totalAmount,
        new Date(),
        action.payload.cart
      );
      //console.log(newOrder);
      return {...state, orders: state.orders.concat(newOrder)};
    }
    case orderType.LOADORDER: {
      return {...state, orders: action.payload};
    }
    default:
      return state;
  }
};
