import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attSelected: [],
};

const cartSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    addAttributes(state, action) {
      state.attSelected.push(action.payload);
    },
    removeAttributes(state, action) {
      const attSelect = state.attSelected.filter(
        (att) => att !== action.payload
      );
      state.attSelected = attSelect;
    },
  },
});

export const { addAttributes, removeAttributes } = cartSlice.actions;
export default cartSlice.reducer;
