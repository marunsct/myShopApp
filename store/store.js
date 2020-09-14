import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import ProductReducer from "./reducers/ProductsReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  Products: ProductReducer,
  Cart: cartReducer,
  Orders: orderReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk),
  composeWithDevTools()
);

export default store;
