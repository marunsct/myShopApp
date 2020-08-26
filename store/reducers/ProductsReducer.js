import PRODUCTS from "../../data/dummy-data";

const initialState = {
  products: PRODUCTS,
  availableProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
  userProducts: [],
};

const ProductReducer = (state = initialState, action) => {
  //console.log(state);
  return state;
};

export default ProductReducer;
