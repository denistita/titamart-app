// import React, { useEffect } from "react";

// import { addToCart, removeFromCart } from "../actions/cartActions";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function CartScreen(props) {
//   const cart = useSelector((state) => state.cart);
//   const { cartArticles } = cart;
//   const articleId = props.match.params.id;
//   const qty = props.location.search
//     ? Number(props.location.search.split("=")[1])
//     : 1;
//   const dispatch = useDispatch();
//   const removeFromCartHandler = (articleId) => {
//     dispatch(removeFromCart(articleId));
//   };

//   useEffect(() => {
//     if (articleId) {
//       dispatch(addToCart(articleId, qty));
//     }
//   }, []);

//   const checkoutHandler = () => {
//     props.history.push("/signin?redirect=shipping");
//   };

//   return (
//     <div className="cart">
//       <div className="cart-list">
//         <ul className="cart-list-container">
//           <li>
//             <h3>Shopping Cart</h3>
//             <div>Price</div>
//           </li>
//           {cartArticles.length === 0 ? (
//             <div>Cart is empty</div>
//           ) : (
//             cartArticles.map((article) => (
//               <li>
//                 <div className="cart-image">
//                   <img src={article.image} alt="article" />
//                 </div>
//                 <div className="cart-name">
//                   <div>
//                     <Link to={"/article/" + article.article}> {article.name}</Link>
//                   </div>
//                   <div>
//                     Qty:
//                     <select
//                       value={article.qty}
//                       onChange={(e) =>
//                         dispatch(addToCart(article.article, e.target.value))
//                       }
//                     >
//                       {[...Array(article.countInStock).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </select>
//                     <button
//                       type="button"
//                       className="button"
//                       onClick={() => removeFromCartHandler(article.article)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//                 <div className="cart-price">${article.price}</div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//       <div className="cart-action">
//         <h3>
//           Subtotal ({cartArticles.reduce((a, c) => a + c.qty, 0)} articles) : ${" "}
//           {cartArticles.reduce((a, c) => a + c.price * c.qty, 0)}
//         </h3>
//         <button
//           onClick={checkoutHandler}
//           className="button primary full-width"
//           disabled={cartArticles.length === 0}
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CartScreen;

import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartArticles } = cart;

  const articleId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (articleId) => {
    dispatch(removeFromCart(articleId));
  };
  useEffect(() => {
    if (articleId) {
      dispatch(addToCart(articleId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartArticles.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartArticles.map((article) => (
              <li>
                <div className="cart-image">
                  <img src={article.image} alt="item" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/item/" + article.item}>{article.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={article.qty}
                      onChange={(e) =>
                        dispatch(addToCart(article.item, e.target.value))
                      }
                    >
                      {[...Array(article.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(article.item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${article.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartArticles.reduce((a, c) => a + c.qty, 0)} articles) : ${" "}
          {cartArticles.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartArticles.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
