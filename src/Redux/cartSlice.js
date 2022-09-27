import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  currencyChange: "$",
  attrSelected: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    attrHandle(state, action) {
      state.attrSelected = action.payload;
    },
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
      // for(i=0;i<state.cartItems.length;i++){
      //   //check for product id
      //   if(action.payload.product.id === state.cartItems[i].product.id){
      //     //check for attr id
      //     for(j=0;j<state.cartItems[i].selectedAttr.length;j++){
      //       for(k=0;k<action.payload.selectedAttr.length;k++){
      //         //check for item id if attr are same
      //         if(action.payload.selectedAttr[k].att===state.cartItems[i].selectedAttr[j]){
      //           //check item id
      //           for(const key in m){

      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // state.cartItems.push(action.payload);
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
    getTotal(state) {
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

export const { addToCart, decreaseCart, getTotal, getCurrency, attrHandle } =
  cartSlice.actions;
export default cartSlice.reducer;
