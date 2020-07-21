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
  ITEM_REVIEW_SAVE_SUCCESS,
  ITEM_REVIEW_SAVE_REQUEST,
  ITEM_REVIEW_SAVE_FAIL,
  ITEM_REVIEW_SAVE_RESET,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/itemConstants";

function itemListReducer(state = { items: [] }, action) {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, items: [] };
    case ITEM_LIST_SUCCESS:
      return { loading: false, items: action.payload };
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function categoryListReducer(state = { categories: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function itemDetailsReducer(state = { item: { reviews: [] } }, action) {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { loading: true };
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, item: action.payload };
    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function itemDeleteReducer(state = { item: {} }, action) {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function itemSaveReducer(state = { item: {} }, action) {
  switch (action.type) {
    case ITEM_SAVE_REQUEST:
      return { loading: true };
    case ITEM_SAVE_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case ITEM_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function itemReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case ITEM_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case ITEM_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case ITEM_REVIEW_SAVE_FAIL:
      return { loading: false, errror: action.payload };
    case ITEM_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
}

export {
  itemListReducer,
  itemDetailsReducer,
  itemSaveReducer,
  itemDeleteReducer,
  itemReviewSaveReducer,
  categoryListReducer,
};
