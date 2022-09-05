import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  currencyChange: "$",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
      }
    },
    getCurrency(state, action) {
      state.currencyChange = action.payload;
    },
    getTotal(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          if (state.currencyChange === "$") {
            const { prices, cartQuantity } = cartItem;
            const itemTotal = prices[0].amount * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
          } else if (state.currencyChange === "£") {
            const { prices, cartQuantity } = cartItem;
            const itemTotal = prices[1].amount * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
          } else if (state.currencyChange === "A$") {
            const { prices, cartQuantity } = cartItem;
            const itemTotal = prices[2].amount * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
          } else if (state.currencyChange === "¥") {
            const { prices, cartQuantity } = cartItem;
            const itemTotal = prices[3].amount * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
          } else if (state.currencyChange === "₽") {
            const { prices, cartQuantity } = cartItem;
            const itemTotal = prices[4].amount * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
          }
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, decreaseCart, getTotal, getCurrency } =
  cartSlice.actions;
export default cartSlice.reducer;
