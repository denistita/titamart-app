import Axios from "axios";
import Cookie from "js-cookie";
import {
  CART_ADD_ARTICLE,
  CART_REMOVE_ARTICLE,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

const addToCart = (itemId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/items/" + itemId);
    dispatch({
      type: CART_ADD_ARTICLE,
      payload: {
        item: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartArticles },
    } = getState();
    Cookie.set("cartArticles", JSON.stringify(cartArticles));
  } catch (error) {}
};
const removeFromCart = (itemId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ARTICLE, payload: itemId });

  const {
    cart: { cartArticles },
  } = getState();
  Cookie.set("cartArticles", JSON.stringify(cartArticles));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT , payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
