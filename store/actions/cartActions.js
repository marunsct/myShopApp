// The types of actions that you can dispatch to modify the state of the store

export const type = {
  ADD2CART: "ADD2CART",
  REMOVEFROMCART: "REMOVEFROMCART",
  DELETECARTITEM: "DELETECARTITEM",
};

// Helper functions to dispatch actions, optionally with payload

export const actionCreators = {
  addToCart: (item) => {
    return {type: type.ADD2CART, payload: item};
  },
  removeFromCart: (item) => {
    return {type: type.REMOVEFROMCART, payload: item};
  },
  deleteFromCart: (item) => {
    return {type: type.DELETECARTITEM, payload: item};
  },
};
