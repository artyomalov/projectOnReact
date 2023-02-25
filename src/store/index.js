import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice.js';
import adminReducer from './adminSlice.js';
export default configureStore({
  reducer: {
    users: usersReducer,
    admin: adminReducer,
  },
});
