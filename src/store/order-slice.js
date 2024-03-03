import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: {},
    orderDetail: {},
    orders: [],
    // Admin states
    AdminOrders: [],
    AdminLoading: false,
    AdminOrderTotalAmount: 0,
    isDeleted: false,
    isUpdated: false,
    updateLoading: false,
  },
  reducers: {
    newOrderReducer(state, action) {
      state.loading = action.payload.loading;
      state.order = action.payload.order;
    },
    fetchOrdersReducer(state, action) {
      state.loading = action.payload.loading;
      state.orders = action.payload.orders;
    },
    orderDetailReducer(state, action) {
      state.loading = action.payload.loading;
      state.orderDetail = action.payload.orderDetail;
    },
    // Admin reducers
    adminOrdersReducer(state, action) {
      state.AdminOrders = action.payload.orders;
      state.AdminLoading = action.payload.loading;
      state.AdminOrderTotalAmount = action.payload.totalAmount;
    },
    adminOrderDeleteReducer(state, action) {
      state.isDeleted = action.payload.isDeleted;
    },
    adminOrderUpdateReducer(state, action) {
      state.isUpdated = action.payload.isUpdated;
      state.updateLoading = action.payload.loading;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
