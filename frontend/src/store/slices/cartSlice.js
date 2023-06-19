import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  loading: false
}

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ product, size}, { rejectWithValue }) => {
    // TODO fetch statement to add cart to users cartItems
    return({ product, size });
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
        let exists = false;
        newCartItems = newCartItems.map(cartItem => {
          if(cartItem.size === action.payload.size && cartItem.product._id === action.payload.product._id){
            const newQuantity = cartItem.quantity + 1;
            const newCartItem = {
              ...cartItem,
              quantity: newQuantity
            }
            cartItem = newCartItem;
            exists = true;
          }
          return cartItem;
        });
        if(!exists){
          const newCartItem = {
            ...action.payload,
            quantity: 1
          }
          newCartItems.push(newCartItem);
        }
        return { ...state, 
          cartItems: newCartItems, 
          loading: false};
      });
    // remove from cart cases
  }
});

export default cartSlice.reducer;