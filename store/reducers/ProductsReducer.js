import PRODUCTS from "../../data/dummy-data";
import {type} from "../actions/ProductActions";
import Product from "../../models/product";

const initialState = {
  userId: null,
  products: PRODUCTS,
  availableProducts: PRODUCTS,
  userProducts: [],
  cartItems: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN: {
      return {...state, userId: action.payload.localId};
    }
    case type.LOAD_AUTH: {
      return {...state, userId: action.payload.localId};
    }
    case type.SETPRODUCTS: {
      // console.log(action.payload, state);
      return {
        ...state,
        products: action.payload,
        userProducts: action.payload.filter(
          (product) => product.ownerId === state.userId
        ),
      };
    }
    case type.CREATEPRODUCT: {
      const newProduct = new Product(
        action.payload.id,
        action.payload.ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );
      return {
        ...state,
        products: state.products.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    }
    case type.UPDATEPRODUCT: {
      let sPid = action.payload.id;
      const prodIndex = state.userProducts.findIndex((product) => product.id === sPid);
      // console.log(1, state.userProducts, prodIndex, sPid);
      const updatedProduct = new Product(
        sPid,
        state.userProducts[prodIndex].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[prodIndex].price
      );
      //console.log(updatedProduct);
      const updatedProducts = [...state.products];
      updatedProducts[prodIndex] = updatedProduct;
      let userProdIndex = state.userProducts.findIndex((product) => product.id === sPid);
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProdIndex] = updatedProduct;
      return {...state, products: updatedProducts, userProducts: updatedUserProducts};
    }
    case type.DELETEPRODUCT: {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
        userProducts: state.userProducts.filter((item) => item.id !== action.payload),
      };
    }

    default:
      return state;
  }
};

export default ProductReducer;
