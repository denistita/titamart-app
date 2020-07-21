import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { saveItem, deleteItem, listItems } from "../actions/itemActions";

function ItemsPage(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [specification, setSpecification] = useState("");
  // const [rating, setRating] = useState("");
  // const [numReviews, setNumReviews] = useState("");
  const [uploading, setUploading] = useState(false);
  const itemList = useSelector((state) => state.itemList);
  const { loading, items, error } = itemList;
  const itemSave = useSelector((state) => state.itemSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = itemSave;

  const itemDelete = useSelector((state) => state.itemDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = itemDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listItems());
    return () => {
      //
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successSave, successDelete]);

  const openModal = (item) => {
    setModalVisible(true);
    setId(item._id);
    setName(item.name);
    setPrice(item.price);
    setImage(item.image);
    setBrand(item.brand);
    setCategory(item.category);
    setCountInStock(item.countInStock);
    setSpecification(item.specification);
    // setRating(item.rating);
    // setNumReviews(item.numReviews);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveItem({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        specification,
        // rating,
        // numReviews,
      })
    );
  };
  const deleteHandler = (item) => {
    dispatch(deleteItem(item._id));
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  return (
    <div className="content  content-margined">
      <div className="item-header">
        <h3>Items</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Item
        </button>
      </div>

      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Item</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="specification">Specifications</label>
                <textarea
                  name="specification"
                  value={specification}
                  id="specification"
                  onChange={(e) => setSpecification(e.target.value)}
                ></textarea>
              </li>

              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="item-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>
                  <button className="button" onClick={() => openModal(item)}>
                    Edit
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => deleteHandler(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ItemsPage;
