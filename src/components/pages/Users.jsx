import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/userSlice';
import User from '../components/User';
export default function Users() {
  const dispatch = useDispatch();
  const deleteUser = (id) => {
    dispatch(removeUser(id));
  };
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const header =
    status === 'loading' ? (
      <h2>Loading...</h2>
    ) : (
      users.map((user) => {
        return <User key={user.id} {...user} deleteUser={deleteUser} />;
      })
    );
  return (
    <>
      <h2>Users</h2>
      <div>
        <div>{header}</div>
      </div>
    </>
  );
}
