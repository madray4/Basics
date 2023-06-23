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
    const response = await fetch('/api/user/login',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    if(response.ok){
      localStorage.setItem('user', JSON.stringify(json));
      return json;
    }
    return rejectWithValue(json);
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('user');
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    if(response.ok){
      localStorage.setItem('user', JSON.stringify(json));
      return json;
    }
    return rejectWithValue(json);
  }
);

// TO DO - create function to update user's profile information

export const updateProfileInformation = createAsyncThunk(
  'auth/updateProfileInformation',
  async({newProfile, email}, { rejectWithValue }) => {
    const response = await fetch('/api/user/update-profile-information', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ newProfile, email })
    })
    const json = await response.json();

    if(response.ok){
      let user = await JSON.parse(localStorage.getItem('user'));
      user.profile = newProfile;
      localStorage.setItem('user', JSON.stringify(user));
      return(user);
    }
  }
)

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

    // logout cases
    builder.addCase(logout.fulfilled, (state) => {
      return { ...state,
        user: null
      }
    });

    // signup cases
    builder.addCase(signup.pending, (state) => {
      return { ...state, loading: true }
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log(action.payload);
      return { ...state,
        loading: false,
        error: action.payload.error,
        emptyFields: action.payload.emptyFields
      }
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      return { ...state,
        loading: false,
        error: null,
        emptyFields: [],
        user: action.payload
      }
    });

    // update profile cases
    builder.addCase(updateProfileInformation.pending, (state) => {
      return { ...state, loading: true }
    });
    builder.addCase(updateProfileInformation.rejected, (state, action) => {
      return { ...state,
        loading: false,
        // error: action.payload.error
      }
    });
    builder.addCase(updateProfileInformation.fulfilled, (state, action) => {
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