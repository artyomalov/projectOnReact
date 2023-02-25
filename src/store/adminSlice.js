import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAdminInfo = createAsyncThunk(
  'admin/fetchAdmin',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:3001/admin');
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: [],
    isLogined: false,
  },
  reducers: {
    authorizeUser(state) {
      state.isLogined = !state.isLogined;
    },
    logoutUSer(state) {
      state.isLogined = false;
    },
  },

  extraReducers: {
    [fetchAdminInfo.fulfilled]: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { authorizeUser } = adminSlice.actions;
export default adminSlice.reducer;
