import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  category: "All"
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: (builder) => {

  }
})

export default productSlice.reducer;