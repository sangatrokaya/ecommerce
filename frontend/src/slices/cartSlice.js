import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let exists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (exists) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === exists._id ? action.payload : item
        );
      } else
        state.cartItems = [
          ...state.cartItems,
          action.payload,
        ]; /* Recommended way */
      // OR
      //   state.cartItems.push(action.payload);
    },
    removeItem: (state, action) => {
      let itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id != itemId);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
