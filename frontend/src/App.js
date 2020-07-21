import React from "react";
import data from "./data";
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import ItemScreen from "./screens/ItemScreen";
import CartScreen from "./screens/CartScreen";
import SigninPage from "./screens/SigninPage";
import RegisterScreen from "./screens/RegisterScreen";
import ItemsPage from "./screens/ItemsPage";
import ShippingPage from "./screens/ShippingPage";
import PaymentPage from "./screens/PaymentPage";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderPage from "./screens/OrderPage";
import OrdersPage from "./screens/OrdersPage";
import ProfilePage from "./screens/ProfilePage";
import { useEffect } from "react";
import { listCategories } from "./actions/itemActions";

function App() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    dispatch(listCategories());

    return () => {};
  }, []);
  const openList = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeList = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openList}>&#9776;</button>
            <Link to="/"> titamart </Link>
          </div>
          <div className="header-links">
            <a href="/">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/items">Items</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <aside className="sidebar">
          <h3>SHOP BY CATEGORY</h3>
          <button className="sidebar-close-button" onClick={closeList}>
            x
          </button>
          <ul className="categories">
            {loading ? (
              <li>
                <div>Loading...</div>
              </li>
            ) : error ? (
              <li>
                <div>{error} </div>
              </li>
            ) : categories.length === 0 ? (
              <li className="empty-list">There is no categories.</li>
            ) : (
              categories.map((x) => (
                <li key={x}>
                  <Link onClick={closeList} to={`/category/${x}`}>
                    {x}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/profile" component={ProfilePage} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/items" component={ItemsPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/item/:id" component={ItemScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          {" "}
          <p>&copy; 2020 denistita.com. All Rights Reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
