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
      let found = 0;
      let addNew = true;
      for (let i = 0; i < state.cartItems.length; i++) {
        //check for product id
        if (state.cartItems[i].product.id === action.payload.product.id) {
          //check for attr id
          for (let x = 0; x < state.cartItems[i].selectedAttr.length; x++) {
            for (let y = 0; y < action.payload.selectedAttr.length; y++) {
              //check for item id if attr are same
              if (
                action.payload.selectedAttr[y].attrId ===
                state.cartItems[i].selectedAttr[x].attrId
              ) {
                //check item id
                if (
                  action.payload.selectedAttr[y].itemId ===
                  state.cartItems[i].selectedAttr[x].itemId
                ) {
                  found += 1;
                }
              }
            }
          }
        }

        if (found !== action.payload.selectedAttr.length) {
          found = 0;
        } else if (
          found === action.payload.selectedAttr.length &&
          state.cartItems[i].product.id === action.payload.product.id
        ) {
          addNew = false;
          state.cartItems[i].cartQuantity += 1;
          break;
        }
      }

      if (found !== action.payload.selectedAttr.length || addNew) {
        state.cartItems.push(action.payload);
      }
    },
    decreaseCart(state, action) {
      let found = 0;
      let decrease = false;
      let newCartArray = [];
      for (let i = 0; i < state.cartItems.length; i++) {
        //check for product id
        if (state.cartItems[i].product.id === action.payload.product.id) {
          //check for attr id
          for (let x = 0; x < state.cartItems[i].selectedAttr.length; x++) {
            for (let y = 0; y < action.payload.selectedAttr.length; y++) {
              //check for item id if attr are same
              if (
                action.payload.selectedAttr[y].attrId ===
                state.cartItems[i].selectedAttr[x].attrId
              ) {
                //check item id
                if (
                  action.payload.selectedAttr[y].itemId ===
                  state.cartItems[i].selectedAttr[x].itemId
                ) {
                  found += 1;
                }
              }
            }
          }
        }
        if (found === action.payload.selectedAttr.length) {
          decrease = true;
          state.cartItems[i].cartQuantity -= 1;
          if (state.cartItems[i].cartQuantity > 0) {
            newCartArray.push(state.cartItems[i]);
          }
        }
        if (!decrease) {
          newCartArray.push(state.cartItems[i]);
        }
        decrease = false;
        found = 0;
      }
      state.cartItems = newCartArray;
    },

    getCurrency(state, action) {
      state.currencyChange = action.payload;
    },
    getTotalCartQuantity(state) {
      let TotalQuantity = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        TotalQuantity += state.cartItems[i].cartQuantity;
      }
      state.cartTotalQuantity = TotalQuantity;
    },
    getTotalAmount(state) {
      let amount = 0;
      let totalAmount = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.currencyChange === "$") {
          amount =
            state.cartItems[i].product.prices[0].amount *
            state.cartItems[i].cartQuantity;
        } else if (state.currencyChange === "£") {
          amount =
            state.cartItems[i].product.prices[1].amount *
            state.cartItems[i].cartQuantity;
        } else if (state.currencyChange === "A$") {
          amount =
            state.cartItems[i].product.prices[2].amount *
            state.cartItems[i].cartQuantity;
        } else if (state.currencyChange === "¥") {
          amount =
            state.cartItems[i].product.prices[3].amount *
            state.cartItems[i].cartQuantity;
        } else if (state.currencyChange === "₽") {
          amount =
            state.cartItems[i].product.prices[4].amount *
            state.cartItems[i].cartQuantity;
        }
        totalAmount += amount;
      }

      state.cartTotalAmount = totalAmount;
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  getTotalCartQuantity,
  getCurrency,
  getTotalAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
