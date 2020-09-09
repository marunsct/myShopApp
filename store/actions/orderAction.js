// The types of actions that you can dispatch to modify the state of the store
export const orderType = {
  ADDORDER: "ADDORDER",
};

// Helper functions to dispatch actions, optionally with payload

export const orderAction = {
  addOrders: (item) => {
    return {type: orderType.ADDORDER, payload: item};
  },
};
