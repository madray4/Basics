import { createSlize, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  loading: false
}

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async () => {

  }
);

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  extraReducers: builder => {
    // add to cart cases
      builder.addCase(addItemToCart.pending, (state) => {
        return { ...state, loading: true};
      });

      builder.addCase(addItemToCart.fulfilled, (state, action) => {
        let newCartItems = [...state.cartItems];
        newCartItems.push(action.payload);
        return { ...state, 
          cartItems: newCartItems, 
          loading: false};
      });
    // remove from cart cases
  }
});

export default cartSlice.reducer;