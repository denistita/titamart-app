import {
  CART_ADD_ARTICLE,
  CART_REMOVE_ARTICLE,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

function cartReducer(
  state = { cartArticles: [], shipping: {}, payment: {} },
  action
) {
  switch (action.type) {
    case CART_ADD_ARTICLE:
      const article = action.payload;
      const item = state.cartArticles.find((x) => x.item === article.item);
      if (item) {
        return {
          cartArticles: state.cartArticles.map((x) =>
            x.item === item.item ? article : x
          ),
        };
      }
      return { cartArticles: [...state.cartArticles, article] };
    case CART_REMOVE_ARTICLE:
      return {
        cartArticles: state.cartArticles.filter(
          (x) => x.item !== action.payload
        ),
      };

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };

    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };

    default:
      return state;
  }
}
export default cartReducer;
