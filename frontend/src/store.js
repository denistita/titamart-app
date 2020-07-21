import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  itemListReducer,
  itemDetailsReducer,
  itemSaveReducer,
  itemDeleteReducer,
  itemReviewSaveReducer,
  categoryListReducer,
} from "./reducers/itemReducers";
import cartReducer from "./reducers/cartReducers";
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from "./reducers/orderReducers";

const cartArticles = Cookie.getJSON("cartArticles") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const intialState = {
  cart: { cartArticles, shipping: {}, payment: {} },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  itemSave: itemSaveReducer,
  itemDelete: itemDeleteReducer,
  itemReviewSave: itemReviewSaveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  categoryList: categoryListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  intialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
