// The types of actions that you can dispatch to modify the state of the store

export const type = {
  ADD2CART: "ADD2CART",
  DELETEPRODUCT: "DELETEPRODUCT",
  CREATEPRODUCT: "CREATEPRODUCT",
  UPDATEPRODUCT: "UPDATEPRODUCT",
};

// Helper functions to dispatch actions, optionally with payload

export const actionCreators = {
  addToCart: (item) => {
    return {type: type.ADD2CART, payload: item};
  },
  deleteUserProduct: (item) => {
    return {type: type.DELETEPRODUCT, payload: item};
  },
  createProduct: (title, description, price, imageUrl) => {
    return {
      type: type.CREATEPRODUCT,
      payload: {
        title,
        description,
        price,
        imageUrl,
      },
    };
  },
  updateProduct: (id, title, description, imageUrl) => {
    return {
      type: type.UPDATEPRODUCT,
      payload: {
        id,
        title,
        description,
        imageUrl,
      },
    };
  },
};
