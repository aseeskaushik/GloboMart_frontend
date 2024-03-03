import { toast } from "react-toastify";
import { orderActions } from "./order-slice";
import axios from "axios";

export const createOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch(
        orderActions.newOrderReducer({
          loading: true,
          order: {},
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
        "/api/v1/order/new",
        { orderData, token },
        config
      );
      dispatch(
        orderActions.newOrderReducer({
          loading: false,
          order: data,
        })
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(
        orderActions.fetchOrdersReducer({
          loading: true,
          orders: [],
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
      const { data } = await axios.post("/api/v1/me/orders", { token }, config);
      dispatch(
        orderActions.fetchOrdersReducer({
          loading: false,
          orders: data,
        })
      );
    } catch (error) {
      dispatch(
        orderActions.fetchOrdersReducer({
          loading: false,
          orders: [],
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const fetchOrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(
        orderActions.orderDetailReducer({
          loading: true,
          orderDetail: {},
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
        `/api/v1/order/${orderId}`,
        { token },
        config
      );
      dispatch(
        orderActions.orderDetailReducer({
          loading: false,
          orderDetail: data,
        })
      );
    } catch (error) {
      dispatch(
        orderActions.orderDetailReducer({
          loading: false,
          orderDetail: {},
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const fetchAdminOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(
        orderActions.adminOrdersReducer({
          loading: true,
          orders: [],
          totalAmount: 0,
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
        "/api/v1/admin/orders",
        { token },
        config
      );
      dispatch(
        orderActions.adminOrdersReducer({
          loading: false,
          orders: data.orders,
          totalAmount: data.totalAmount,
        })
      );
    } catch (error) {
      dispatch(
        orderActions.adminOrdersReducer({
          loading: false,
          orders: [],
          totalAmount: 0,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const adminDeleteOrder = (orderId) => {
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
      await axios.post(`/api/v1/admin/order/${orderId}`, { token }, config);
      dispatch(
        orderActions.adminOrderDeleteReducer({
          isDeleted: true,
        })
      );
    } catch (error) {
      dispatch(
        orderActions.adminOrderDeleteReducer({
          isDeleted: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const adminUpdateOrder = (orderId, orderData) => {
  return async (dispatch) => {
    try {
      dispatch(
        orderActions.adminOrderUpdateReducer({
          isUpdated: false,
          loading: true,
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
        `/api/v1/admin/order/${orderId}`,
        { orderData, token },
        config
      );
      dispatch(
        orderActions.adminOrderUpdateReducer({
          isUpdated: true,
          loading: false,
        })
      );
    } catch (error) {
      dispatch(
        orderActions.adminOrderUpdateReducer({
          isUpdated: false,
          loading: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};
