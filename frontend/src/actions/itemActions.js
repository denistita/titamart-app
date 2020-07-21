import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_SAVE_REQUEST,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_REVIEW_SAVE_REQUEST,
  ITEM_REVIEW_SAVE_SUCCESS,
  ITEM_REVIEW_SAVE_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from "../constants/itemConstants";
import axios from "axios";
import Axios from "axios";

const listItems = (category = "", searchKeyword = "", sortOrder = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });
    const { data } = await axios.get(
      "/api/items?category=" +
        category +
        "&searchKeyword=" +
        searchKeyword +
        "&sortOrder=" +
        sortOrder
    );
    dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_LIST_FAIL, payload: error.message });
  }
};

const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get("/api/items/categories");
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const saveItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_SAVE_REQUEST, payload: item });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!item._id) {
      const { data } = await Axios.post("/api/items", item, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: ITEM_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put("/api/items/" + item._id, item, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: ITEM_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ITEM_SAVE_FAIL, payload: error.message });
  }
};

const detailsItem = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST, payload: itemId });
    const { data } = await axios.get("/api/items/" + itemId);
    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_DETAILS_FAIL, payload: error.message });
  }
};

const deleteItem = (itemId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: ITEM_DELETE_REQUEST, payload: itemId });
    const { data } = await axios.delete("/api/items/" + itemId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: ITEM_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: ITEM_DELETE_FAIL, payload: error.message });
  }
};

const saveItemReview = (itemId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: ITEM_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(`/api/items/${itemId}/reviews`, review, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: ITEM_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: ITEM_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listItems,
  detailsItem,
  saveItem,
  deleteItem,
  saveItemReview,
  listCategories,
};
