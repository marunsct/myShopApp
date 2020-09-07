// The types of actions that you can dispatch to modify the state of the store

export const type = {
  ADD2CART: "ADD2CART",
};

// Helper functions to dispatch actions, optionally with payload

export const actionCreators = {
  addToCart: (item) => {
    return {type: type.ADD2CART, payload: item};
  },
};
