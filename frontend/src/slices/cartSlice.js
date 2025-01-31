import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems = [
        ...state.cartItems,
        action.payload,
      ]; /* Recommended way */
      // OR
      //   state.cartItems.push(action.payload);
    },
    removeItem: (state, action) => {},
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
