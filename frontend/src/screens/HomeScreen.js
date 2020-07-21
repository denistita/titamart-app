import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listItems } from "../actions/itemActions";
import Rating from "../components/Rating";
function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setsortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const itemList = useSelector((state) => state.itemList);
  const { items, loading, error } = itemList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listItems(category));

    return () => {};
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listItems(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setsortOrder(e.target.value);
    dispatch(listItems(category, searchKeyword, e.target.value));
  };
  return (
    <>
      {category && <h2>{category}</h2>}
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="items">
          {items.map((item) => (
            <li key={item._id}>
              <div className="item">
                <Link to={"/item/" + item._id}>
                  <img className="item-image" src={item.image} alt="item" />
                </Link>
                <div className="item-name">
                  <Link to={"/item/" + item._id}>{item.name}</Link>
                </div>
                <div className="item-brand">{item.brand}</div>
                <div className="item-price">${item.price}</div>
                <div className="item-rating">
                  <Rating
                    value={item.rating}
                    text={item.numReviews + " Reviews"}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
