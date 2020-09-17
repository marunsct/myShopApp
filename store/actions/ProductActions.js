import Product from "../../models/product";
// The types of actions that you can dispatch to modify the state of the store

export const type = {
  ADD2CART: "ADD2CART",
  DELETEPRODUCT: "DELETEPRODUCT",
  CREATEPRODUCT: "CREATEPRODUCT",
  UPDATEPRODUCT: "UPDATEPRODUCT",
  SETPRODUCTS: "SETPRODUCTS",
  LOGIN: "LOGIN",
  LOAD_AUTH: "LOAD_AUTH",
};

// Helper functions to dispatch actions, optionally with payload

export const setProduct = () => {
  try {
    return async (dispatch) => {
      const response = await fetch(
        "https://reactnativeapp-dd8cf.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      const resData = await response.json();
      //console.log(resData);
      let loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      // console.log(resData);

      dispatch({type: type.SETPRODUCTS, payload: loadedProducts});
    };
  } catch (err) {
    throw err;
  }
};

export const actionCreators = {
  addToCart: (item) => {
    return {type: type.ADD2CART, payload: item};
  },

  deleteUserProduct: (item) => {
    try {
      return async (dispatch, getState) => {
        let user = getState().Authentication.user;
        let token = user.token;
        let userId = user.userId;
        const response = await fetch(
          `https://reactnativeapp-dd8cf.firebaseio.com/products/${item}.json?auth=${token}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Sorry Could not delete the selectedProduct. Try again.");
        }

        dispatch({type: type.DELETEPRODUCT, payload: item});
      };
    } catch (err) {
      throw err;
    }
  },

  createProduct: (title, description, price, imageUrl) => {
    try {
      return async (dispatch, getState) => {
        let user = getState().Authentication.user;
        let token = user.token;
        let userId = user.userId;
        const response = await fetch(
          `https://reactnativeapp-dd8cf.firebaseio.com/products.json?auth=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              price,
              imageUrl,
              ownerId: user.userId,
            }),
          }
        );
        if (!response.ok) {
          console.log(response.ok);
          throw new Error(
            "Something went wrong while creating your product!! Try again."
          );
        }
        const resData = await response.json();

        console.log(resData);
        dispatch({
          type: type.CREATEPRODUCT,
          payload: {
            id: resData.name,
            ownerId: user.userId,
            title,
            description,
            price,
            imageUrl,
          },
        });
      };
    } catch (err) {
      throw err;
    }
  },
  updateProduct: (id, title, description, imageUrl) => {
    console.log("did i start?");
    try {
      return async (dispatch, getState) => {
        let user = getState().Authentication.user;
        let token = user.token;
        let userId = user.userId;
        const response = await fetch(
          `https://reactnativeapp-dd8cf.firebaseio.com/products/${id}.json?auth=${token}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              imageUrl,
              ownerId: userId,
            }),
          }
        );
        const resData = await response.json();
        if (!response.ok) {
          console.log(response.ok, userId, resData);
          throw new Error("Something went wrong while updating!! Try again.");
        }
        console.log("after request");

        console.log(resData);

        dispatch({
          type: type.UPDATEPRODUCT,
          payload: {
            id,
            title,
            description,
            imageUrl,
          },
        });
      };
    } catch (err) {
      throw err;
    }
  },
};
