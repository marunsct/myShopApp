import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import ProductReducer from "./reducers/ProductsReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  Products: ProductReducer,
  Cart: cartReducer,
  Orders: orderReducer,
  Authentication: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk),
  composeWithDevTools()
);

export default store;
