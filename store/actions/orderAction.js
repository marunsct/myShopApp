import orders from "../../models/orders";
// The types of actions that you can dispatch to modify the state of the store
export const orderType = {
  ADDORDER: "ADDORDER",
  LOADORDER: "LOADORDER",
};

// Helper functions to dispatch actions, optionally with payload

export const orderAction = {
  addOrders: (item) => {
    try {
      return async (dispatch) => {
        const date = new Date();
        const response = await fetch(
          "https://reactnativeapp-dd8cf.firebaseio.com/orders/u1.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderValue: item.totalAmount,
              date: date.toISOString(),
              orderItems: item.cart,
            }),
          }
        );
        if (!response.ok) {
          console.log(response.ok);
          throw new Error(
            "Something went wrong while processing your Order!! Try again."
          );
        }
        const resData = await response.json();
        item.id = resData.name;
        item.date = date;
        dispatch({type: orderType.ADDORDER, payload: item});
      };
    } catch (err) {
      throw err;
    }
  },

  loadOrders: () => {
    try {
      return async (dispatch) => {
        const response = await fetch(
          "https://reactnativeapp-dd8cf.firebaseio.com/orders/u1.json"
        );

        if (!response.ok) {
          //console.log(2);
          throw new Error("Something went wrong while loading your orders!! Try again.");
        }
        const data = await response.json();

        let pastOrders = [];
        for (const key in data) {
          let orderItem = new orders(
            key,
            data[key].orderValue,
            data[key].date,
            data[key].orderItems
          );
          pastOrders.push(orderItem);
        }
        dispatch({type: orderType.LOADORDER, payload: pastOrders});
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};
