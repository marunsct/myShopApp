import {createStore, combineReducers} from "redux";

import ProductReducer from "./reducers/ProductsReducer";

const rootReducer = combineReducers({
  Products: ProductReducer,
});

const store = createStore(rootReducer);

export default store;
