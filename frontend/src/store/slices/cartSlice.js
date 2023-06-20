import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'

const initialUser = JSON.parse(localStorage.getItem('user'));
let initialQuantity = 0;
if(initialUser){
  initialUser.cartItems.map(cartItem => initialQuantity += cartItem.quantity);
}

const initialState = {
  cartItems: initialUser ? initialUser.cartItems : [],
  totalQuantity: initialQuantity,
  loading: false
}

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ product, size, quantity, currentCart, email}, { rejectWithValue }) => {
    let newCartItems = await updateCartItems({ product, size, quantity, currentCart });

    // updates the users cart in database if logged in
    if(email){
      const response = await fetch('/api/cart/update-cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ newCartItems, email })
      });
      if(response.ok){
        return({ newCartItems, quantity })
      }
      else{
        return rejectWithValue({ currentCart, quantity: 0 });
      }
    }
    return({ newCartItems, quantity });
  }
);

// imports users cart from database upon login and merges carts if there's already items in the cart prior to log in
export const updateCartAuth = createAsyncThunk(
  'cart/updateCartAuth',
  async ({ cartItems, currentCart, email }, { rejectWithValue }) => {
    let newCartItems = [...currentCart];
    let quantity = 0;
    if(newCartItems){
      newCartItems.map(cartItem => (
        quantity += cartItem.quantity));
    };

    for(let i = 0; i < cartItems.length; i++){
      newCartItems = await updateCartItems({...cartItems[i], currentCart: newCartItems});
      quantity += cartItems[i].quantity;
    };

    if(currentCart.length > 0){
      const response = await fetch('/api/cart/update-cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ newCartItems, email })
      });
      if(response.ok){
        return{ newCartItems, quantity };
      }
    }
    return {newCartItems, quantity};
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ product, size, quantity, currentCart, email }, { rejectWithValue }) => {
    // console.log(currentCart);
    let newCartItems = currentCart.filter(cartItem => (cartItem.size !== size && cartItem.product._id !== product._id));
    // console.log(newCartItems);
    if(email){
      const response = await fetch('/api/cart/update-cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ newCartItems, email })
      });
      if(response.ok){
        let user = JSON.parse(localStorage.getItem('user'));
        user.cartItems = newCartItems;
        localStorage.setItem('user', JSON.stringify(user));
        return({ newCartItems, quantity });

      }
      else{
        return rejectWithValue({ currentCart, quantity: 0 });
      }
    }

    return({ newCartItems, quantity });
  }
);

const updateCartItems = async ({ product, size, quantity, currentCart }) => {
  let newCartItems = [...currentCart];
  let exists = false;
  newCartItems = newCartItems.map(cartItem => {
    if(cartItem.size === size && cartItem.product._id === product._id){
      const newCartItem = {
        ...cartItem,
        quantity: cartItem.quantity + quantity
      }
      cartItem = newCartItem;
      exists = true;
    }
    return cartItem;
  });
  if(!exists){
    const newCartItem = {
      product,
      size,
      quantity: quantity
    }
    newCartItems.push(newCartItem);
  }
  return newCartItems;
};


const cartSlice = createSlice({
  name: "Cart",
  initialState,
  extraReducers: builder => {
    // add to cart cases
    builder.addCase(addItemToCart.pending, (state) => {
      return { ...state, loading: true};
    });

    builder.addCase(addItemToCart.rejected, (state) => {
      return { ...state, loading: false};
    })

    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      return { ...state, 
        cartItems: action.payload.newCartItems,
        totalQuantity: state.totalQuantity + action.payload.quantity,
        loading: false};
    });

    // updating cart after logging in
    builder.addCase(updateCartAuth.pending, (state) => {
      return { ...state, loading: false };
    })

    builder.addCase(updateCartAuth.fulfilled, (state, action) => {
      return { ...state, 
        cartItems: action.payload.newCartItems,
        totalQuantity: action.payload.quantity,
        loading: false};
    });

    // remove from cart cases
    builder.addCase(deleteCartItem.pending, (state) => {
      return { ...state, loading: true};
    })
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      return { ...state, 
        cartItems: action.payload.newCartItems,
        totalQuantity: state.totalQuantity - action.payload.quantity,
        loading: false};
    });
  }
});

export default cartSlice.reducer;