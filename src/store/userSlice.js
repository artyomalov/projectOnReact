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
  async function (userData, { rejectWithValue, dispatch }) {
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
      dispatch(createUser(data));
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
      const responce = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ added: !user.added }),
      });
      if (!responce.ok) {
        throw new Error('Server error!');
      }
      dispatch(addToListToggle({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async function (editedData, { rejectWithValue, dispatch }) {
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
      dispatch(updateUser(editedData));
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
    createUser(state, action) {
      state.users.push(action.payload);
      if (action.payload.added === true) {
        state.selectedUsers.push(action.payload);
      }
    },
    deleteUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
    addToListToggle(state, action) {
      const addedUser = state.users.find(
        (user) => user.id === action.payload.id
      );
      addedUser.added = !addedUser.added;
      state.selectedUsers = state.users.filter((user) => user.added === true);
    },
    updateUser(state, action) {
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
    },
  },
});

export const { createUser, deleteUser, addToListToggle, updateUser } =
  usersSlice.actions;
export default usersSlice.reducer;
