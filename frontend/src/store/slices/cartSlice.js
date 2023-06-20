import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  loading: false
}

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ product, size, quantity}, { rejectWithValue }) => {
    // TODO fetch statement to add cart to users cartItems
    return({ product, size, quantity });
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ product, size }, { rejectWithValue }) => {
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
        // finds it the specific product & size already exists in cart and adds 1 to quanity
        newCartItems = newCartItems.map(cartItem => {
          if(cartItem.size === action.payload.size && cartItem.product._id === action.payload.product._id){
            // const newQuantity = cartItem.quantity + 1;
            const newCartItem = {
              ...cartItem,
              quantity: cartItem.quantity + action.payload.quantity
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
          totalQuantity: state.totalQuantity + 1, 
          loading: false};
      });

      // remove from cart cases
      builder.addCase(deleteCartItem.pending, (state) => {
        return { ...state, loading: true};
      })
      builder.addCase(deleteCartItem.fulfilled, (state, action) => {
        let newCartItems = state.cartItems.filter(cartItem => 
           (cartItem.size !== action.payload.size && cartItem.product._id !== action.payload.product._id)
        )
        return {...state, 
          cartItems: newCartItems,
          loading: false
        };
      });
  }
});

export default cartSlice.reducer;