import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import attReducer from "./attSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    attributes: attReducer,
  },
});

export default store;
