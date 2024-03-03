import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice";
import userSlice from "./user-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
import orderSlice from "./order-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    order: orderSlice.reducer,
  },
});
export default store;
