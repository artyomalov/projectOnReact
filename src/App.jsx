import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLayout from './components/pages/HeaderLayout';
import Users from './components/pages/Users';
import SingleUser from './components/pages/SingleUser';
import CreateUser from './components/pages/CreateUser';
import SendList from './components/pages/SendList';
import EditUser from './components/pages/EditUser';
import LoginPage from './components/pages/LoginPage';
import RequreAuth from './hoc/RequreAuth';
import { fetchAdminInfo } from './store/adminSlice';
import { fetchUsers } from './store/userSlice';
import './App.css';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAdminInfo());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route index element={<Users />} />

        <Route
          path="createUser"
          element={
            <RequreAuth>
              <CreateUser />
            </RequreAuth>
          }
        />
        <Route
          path="editUser/:id"
          element={
            <RequreAuth>
              <EditUser />
            </RequreAuth>
          }
        />
        <Route path="/:id" element={<SingleUser />} />
        <Route path="sendList" element={<SendList />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
