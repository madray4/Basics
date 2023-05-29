import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null,
  emptyFields: []
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email, password);
    return email;
  }
);

const authSlice = createSlice({
  name: "Auth",
  initialState,
  extraReducers: (builder) => {
    // login cases
    builder.addCase(login.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(login.rejected, (state, action) => {
      return { ...state, 
          loading: false, 
          error: action.payload.error, 
          emptyFields: action.payload.emptyFields }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state,
          loading: false,
          error: null,
          emptyFields: [],
          user: action.payload
      }
    });
  }
});

export default authSlice.reducer;