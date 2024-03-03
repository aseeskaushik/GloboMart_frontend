import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    productsCount: 0,
    product: {},
    productDetailLoading: false,
    resultPerPage: 0,
    filteredProductCount: 0,
    reviewSuccess: false,
    //admin states
    AdminProducts: [],
    AdminLoading: false,
    newProduct: {},
    newProductLoading: false,
    newProductSuccess: false,
    isDeleted: false,
    isUpdated: false,
    updateLoading: false,
    reviews: [],
    reviewsLoading: false,
    reviewDeleted: false,
  },
  reducers: {
    replaceProducts(state, action) {
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.loading = action.payload.loading;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductCount = action.payload.filteredProductCount;
    },
    productDetailReducer(state, action) {
      state.product = action.payload.product;
      state.productDetailLoading = action.payload.loading;
    },
    productReviewReducer(state, action) {
      state.reviewSuccess = action.payload.success;
    },
    //admin reducers
    adminProductsReducer(state, action) {
      state.AdminLoading = action.payload.loading;
      state.AdminProducts = action.payload.products;
    },
    newProductReducer(state, action) {
      if (action.payload.product) {
        state.newProduct = action.payload.product;
      }
      state.newProductLoading = action.payload.loading;
      state.newProductSuccess = action.payload.success;
    },
    deleteProductReducer(state, action) {
      state.isDeleted = action.payload.isDeleted;
    },
    updateProductReducer(state, action) {
      // if (action.payload.product) {
      //   state.product = action.payload.product;
      // }
      state.isUpdated = action.payload.isUpdated;
      state.updateLoading = action.payload.loading;
    },
    allReviewsAdminReducer(state, action) {
      state.reviews = action.payload.reviews;
      state.reviewsLoading = action.payload.loading;
    },
    deleteReviewAdminReducer(state, action) {
      state.reviewDeleted = action.payload.isDeleted;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
