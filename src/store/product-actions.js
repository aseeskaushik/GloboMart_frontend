import axios from "axios";
import { productActions } from "./product-slice";
import { toast } from "react-toastify";

export const fetchProducts = (
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  rating = 0
) => {
  return async (dispatch) => {
    try {
      dispatch(
        productActions.replaceProducts({
          products: [],
          loading: true,
          productsCount: 0,
          resultPerPage: 0,
          filteredProductCount: 0,
        })
      );
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&minPrice=${price[0]}&maxPrice=${price[1]}&rating=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&minPrice=${
          price[0]
        }&maxPrice=${price[1]}&rating=${rating}&category=${encodeURIComponent(
          category
        )}`;
      }

      const { data } = await axios.get(link);
      if (!data) {
        throw new Error("can not fetch products");
      }
      dispatch(
        productActions.replaceProducts({
          products: data.products,
          loading: false,
          productsCount: data.productCount,
          resultPerPage: data.perPage,
          filteredProductCount: data.filteredProductCount,
        })
      );
    } catch (error) {
      dispatch(
        productActions.replaceProducts({
          products: [],
          loading: false,
          productsCount: 0,
          resultPerPage: 0,
          filteredProductCount: 0,
        })
      );
      // toast.error(error.response.data.message);
    }
  };
};

export const fetchProductDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch(
        productActions.productDetailReducer({
          product: {},
          loading: true,
        })
      );
      const { data } = await axios.get(`/api/v1/product/${id}`);
      if (!data) {
        throw new Error("can not get product details");
      }
      dispatch(
        productActions.productDetailReducer({
          product: data.product,
          loading: false,
        })
      );
    } catch (error) {
      dispatch(
        productActions.productDetailReducer({
          product: {},
          loading: false,
        })
      );
      // toast.error(error.response.data.message);
    }
  };
};

export const createProductReview = (reviewData) => {
  return async (dispatch) => {
    try {
      dispatch(
        productActions.productReviewReducer({
          success: false,
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "/api/v1/review",
        { reviewData, token },
        config
      );
      dispatch(
        productActions.productReviewReducer({
          success: data.success,
        })
      );
    } catch (error) {
      dispatch(
        productActions.productReviewReducer({
          success: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

// Admin actions
export const fetchAdminProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(
        productActions.adminProductsReducer({
          loading: true,
          products: [],
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/v1/admin/products",
        { token },
        config
      );
      dispatch(
        productActions.adminProductsReducer({
          loading: false,
          products: data.products,
        })
      );
    } catch (error) {
      dispatch(
        productActions.adminProductsReducer({
          loading: false,
          products: [],
        })
      );
      // toast.error(error.response.data.message);
    }
  };
};

export const createNewProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch(
        productActions.newProductReducer({
          loading: true,
          product: {},
          success: false,
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/v1/admin/product/new",
        { productData, token },
        config
      );
      dispatch(
        productActions.newProductReducer({
          loading: false,
          product: data,
          success: true,
        })
      );
    } catch (error) {
      dispatch(
        productActions.newProductReducer({
          loading: false,
          product: {},
          success: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      await axios.post(`/api/v1/admin/product/${productId}`, { token }, config);
      dispatch(
        productActions.deleteProductReducer({
          isDeleted: true,
        })
      );
    } catch (error) {
      dispatch(
        productActions.deleteProductReducer({
          isDeleted: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const updateProduct = (productData, productId) => {
  return async (dispatch) => {
    try {
      dispatch(
        productActions.updateProductReducer({
          loading: true,
          isUpdated: false,
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/v1/admin/product/${productId}`,
        { productData, token },
        config
      );
      dispatch(
        productActions.updateProductReducer({
          isUpdated: true,
          loading: false,
        })
      );
    } catch (error) {
      dispatch(
        productActions.updateProductReducer({
          isUpdated: false,
          loading: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const fetchAllReviewsForAdmin = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(
        productActions.allReviewsAdminReducer({
          loading: true,
          reviews: [],
        })
      );
      const { data } = await axios.get(`/api/v1/reviews/?id=${productId}`);
      dispatch(
        productActions.allReviewsAdminReducer({
          loading: false,
          reviews: data,
        })
      );
    } catch (error) {
      dispatch(
        productActions.allReviewsAdminReducer({
          loading: false,
          reviews: [],
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const deleteReviewByAdmin = (productId, reviewId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/v1/reviews/?productId=${productId}&reviewId=${reviewId}`,
        { token },
        config
      );
      dispatch(
        productActions.deleteReviewAdminReducer({
          isDeleted: true,
        })
      );
    } catch (error) {
      dispatch(
        productActions.deleteReviewAdminReducer({
          isDeleted: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};
