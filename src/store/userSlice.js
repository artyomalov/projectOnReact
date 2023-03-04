import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async function (_, { rejectWithValue }) {
    try {
      const responce = await fetch('http://localhost:3001/users');

      if (!responce.ok) {
        throw new Error('Server error!');
      }
      const data = await responce.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewUser = createAsyncThunk(
  'users/createNewUser',
  async function (userData, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
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

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      dispatch(deleteUser({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addServerToggle = createAsyncThunk(
  'users/serverToggle',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const user = getState().users.users.find((user) => user.id === id);
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ added: !user.added }),
      });
      if (!response.ok) {
        throw new Error('Server error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async function (editedData, { rejectWithValue }) {
    const id = editedData.id;
    const editedUser = {
      first_name: editedData.first_name,
      last_name: editedData.last_name,
      email: editedData.email,
      info: editedData.info,
      avatar: editedData.avatar,
      added: editedData.added,
    };
    try {
      const responce = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });
      if (!responce.ok) {
        throw new Error('Server.error');
      }
      const data = await responce.json();
      return data;
      // dispatch(updateUser(editedData));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendEmails = createAsyncThunk(
  'users/sendEmails',
  async function (user, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:3001/fakeEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Server error!');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selectedUsers: [],
    status: null,
    error: null,
  },
  reducers: {
    deleteUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },

  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.users = action.payload;
      state.selectedUsers = state.users.filter((user) => user.added === true);
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      alert(state.error);
    },
    [createNewUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.users.push(action.payload);
      if (action.payload.added === true) {
        state.selectedUsers.push(action.payload);
      }
    },
    [createNewUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      alert(state.error);
    },
    [removeUser.fulfilled]: (state) => {
      state.status = 'resolved';
    },
    [removeUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      alert(state.error);
    },
    [addServerToggle.fulfilled]: (state, action) => {
      state.status = 'resolved';
      const addedUser = state.users.find(
        (user) => user.id === action.payload.id
      );
      addedUser.added = !addedUser.added;
      state.selectedUsers = state.users.filter((user) => user.added === true);
    },
    [addServerToggle.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      alert(state.error);
    },
    [editUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      const updatedUser = state.users.find(
        (user) => user.id === action.payload.id
      );
      updatedUser.email = action.payload.email;
      updatedUser.first_name = action.payload.first_name;
      updatedUser.last_name = action.payload.last_name;
      updatedUser.info = action.payload.info;
      updatedUser.avatar = action.payload.avatar;
      updatedUser.added = action.payload.added;
    },
    [editUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      alert(state.error);
    },
    [sendEmails.fulfilled]: (state) => {
      state.status = 'resolved';
    },
    [sendEmails.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      alert(state.error);
    },
  },
});

export const { createUser, deleteUser, addToListToggle, updateUser } =
  usersSlice.actions;
export default usersSlice.reducer;
