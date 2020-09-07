import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ProductReducer from "./reducers/ProductsReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  Products: ProductReducer,
  Cart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
