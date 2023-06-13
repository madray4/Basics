import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  category: "All"
};

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async () => {
    const response = await fetch('/api/products/all', {});
    const json = await response.json();
    for(let i = 0; i < json.length; i++){
      for(let j = 0; j < json[i].sizes.length; j++){
        json[i].sizes[j] = convertToString(json[i].sizes[j]);
      }
    }
    return json;
  }
);

const convertToString = (obj) => {
  let str = obj[0];
  for(let i = 1; i < Object.keys(obj).length - 1; i++){
    str += obj[i];
  }
  return str;
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      return { ...state, products: action.payload}
    })
  }
})

export default productSlice.reducer;