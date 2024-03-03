import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const isItemExist = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (!isItemExist) {
        state.cartItems.push(newItem);
      } else {
        isItemExist.quantity = newItem.quantity;
      }
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload._id;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === itemId
      );
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
