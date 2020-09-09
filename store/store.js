import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ProductReducer from "./reducers/ProductsReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  Products: ProductReducer,
  Cart: cartReducer,
  Orders: orderReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
