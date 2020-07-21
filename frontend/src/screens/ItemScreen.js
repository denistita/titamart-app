import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsItem, saveItemReview } from "../actions/itemActions";
import Rating from "../components/Rating";
import { ITEM_REVIEW_SAVE_RESET } from "../constants/itemConstants";

function ItemScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const itemDetails = useSelector((state) => state.itemDetails);
  const { item, loading, error } = itemDetails;
  const itemReviewSave = useSelector((state) => state.itemReviewSave);
  const { success: itemSaveSuccess } = itemReviewSave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (itemSaveSuccess) {
      alert("Review submitted successfully");
      setRating("0");
      setComment("");
      dispatch({ type: ITEM_REVIEW_SAVE_RESET });
    }
    dispatch(detailsItem(props.match.params.id));
    return () => {
      //
    };
  }, [itemSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveItemReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };
  return (
    <div>
      <div className="back-to-home">
        <Link to="/">Back to home</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="itemDetails">
            <div className="itemDetails-image">
              <img src={item.image} alt="item"></img>
            </div>
            <div className="itemDetails-info">
              <ul>
                <li>
                  <h4>{item.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={item.rating}
                      text={item.numReviews + " Reviews"}
                    />
                  </a>
                </li>
                <li>
                  <b>Price: ${item.price}</b>
                </li>
                <li>
                  Specification:
                  {item.specification}
                </li>
              </ul>
            </div>
            <div className="itemDetails-action">
              <ul>
                <li>Price:${item.price}</li>
                <li>
                  Status:{item.countInStock > 0 ? "In Stock" : "Unavailable."}
                </li>
                <li>
                  Qty:
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {item.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {!item.reviews.length && <div>No Reviews</div>}
            <ul className="review" id="reviews">
              {item.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1-Poor</option>
                          <option value="2">2-Fair</option>
                          <option value="3">3-Good</option>
                          <option value="4">4-Very Good</option>
                          <option value="5">5-Excellent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Signin</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default ItemScreen;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { detailsItem, saveItemReview } from "../actions/itemActions";
// import Rating from "../components/Rating";
// import { ITEM_REVIEW_SAVE_RESET } from "../constants/itemConstants";

// function ItemScreen(props) {
//   const [qty, setQty] = useState(1);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;
//   const itemDetails = useSelector((state) => state.itemDetails);
//   const { item, loading, error } = itemDetails;
//   const itemReviewSave = useSelector((state) => state.itemReviewSave);
//   const { success: itemSaveSuccess } = itemReviewSave;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (itemSaveSuccess) {
//       alert("Review submitted successfully.");
//       setRating(0);
//       setComment("");
//       dispatch({ type: ITEM_REVIEW_SAVE_RESET });
//     }
//     dispatch(detailsItem(props.match.params.id));
//     return () => {
//       //
//     };
//   }, [itemSaveSuccess]);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     // dispatch actions
//     dispatch(
//       saveItemReview(props.match.params.id, {
//         name: userInfo.name,
//         rating: rating,
//         comment: comment,
//       })
//     );
//   };
//   const handleAddToCart = () => {
//     props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
//   };

//   return (
//     <div>
//       <div className="back-to-result">
//         <Link to="/">Back to result</Link>
//       </div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>{error} </div>
//       ) : (
//         <>
//           <div className="itemDetails">
//             <div className="itemDetails-image">
//               <img src={item.image} alt="item"></img>
//             </div>
//             <div className="itemDetails-info">
//               <ul>
//                 <li>
//                   <h4>{item.name}</h4>
//                 </li>
//                 <li>
//                   <a href="#reviews">
//                     <Rating
//                       value={item.rating}
//                       text={item.numReviews + " reviews"}
//                    />
//                   </a>
//                 </li>
//                 <li>
//                   Price: <b>${item.price}</b>
//                 </li>
//                 <li>
//                   Specification:
//                   <div>{item.specification}</div>
//                 </li>
//               </ul>
//             </div>
//             <div className="details-action">
//               <ul>
//                 <li>Price: {item.price}</li>
//                 <li>
//                   Status:{" "}
//                   {item.countInStock > 0 ? "In Stock" : "Unavailable."}
//                 </li>
//                 <li>
//                   Qty:{" "}
//                   <select
//                     value={qty}
//                     onChange={(e) => {
//                       setQty(e.target.value);
//                     }}
//                   >
//                     {[...Array(item.countInStock).keys()].map((x) => (
//                       <option key={x + 1} value={x + 1}>
//                         {x + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </li>
//                 <li>
//                   {item.countInStock > 0 && (
//                     <button
//                       onClick={handleAddToCart}
//                       className="button primary"
//                     >
//                       Add to Cart
//                     </button>
//                   )}
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="content-margined">
//             <h2>Reviews</h2>
//             {!item.reviews.length && <div>There is no review</div>}
//             <ul className="review" id="reviews">
//               {item.reviews.map((review) => (
//                 <li key={review._id}>
//                   <div>{review.name}</div>
//                   <div>
//                     <Rating value={review.rating}></Rating>
//                   </div>
//                   <div>{review.createdAt.substring(0, 10)}</div>
//                   <div>{review.comment}</div>
//                 </li>
//               ))}
//               <li>
//                 <h3>Write a customer review</h3>
//                 {userInfo ? (
//                   <form onSubmit={submitHandler}>
//                     <ul className="form-container">
//                       <li>
//                         <label htmlFor="rating">Rating</label>
//                         <select
//                           name="rating"
//                           id="rating"
//                           value={rating}
//                           onChange={(e) => setRating(e.target.value)}
//                         >
//                           <option value="1">1- Poor</option>
//                           <option value="2">2- Fair</option>
//                           <option value="3">3- Good</option>
//                           <option value="4">4- Very Good</option>
//                           <option value="5">5- Excelent</option>
//                         </select>
//                       </li>
//                       <li>
//                         <label htmlFor="comment">Comment</label>
//                         <textarea
//                           name="comment"
//                           value={comment}
//                           onChange={(e) => setComment(e.target.value)}
//                         ></textarea>
//                       </li>
//                       <li>
//                         <button type="submit" className="button primary">
//                           Submit
//                         </button>
//                       </li>
//                     </ul>
//                   </form>
//                 ) : (
//                   <div>
//                     Please <Link to="/signin">Sign-in</Link> to write a review.
//                   </div>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
// export default ItemScreen;
