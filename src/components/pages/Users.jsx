import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { removeUser } from '../../store/userSlice';
import User from '../components/User';
import SearchUser from '../components/SearchUser';
export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const search = searchParams.get('search') || '';
  const deleteUser = (id) => {
    dispatch(removeUser(id));
  };
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const header =
    status === 'loading' ? (
      <h2>Loading...</h2>
    ) : (
      users
        .filter((user) => {
          // console.log(
          //   `${user.first_name} ${user.last_name}`
          //     .toLowerCase()
          //     .split(' ')
          //     .join('')
          // );
          // console.log(search.toLowerCase().split(' ').join(''));
          return (
            `${user.first_name} ${user.last_name}`
              .toLowerCase()
              .split(' ')
              .join('')
              .includes(search.toLowerCase().split(' ').join('')) ||
            user.email
              .toLowerCase()
              .split(' ')
              .join('')
              .includes(search.toLowerCase().split(' ').join(''))
          );
        })
        .map((user) => {
          return <User key={user.id} {...user} deleteUser={deleteUser} />;
        })
    );
  return (
    <>
      <h2>Users</h2>
      <SearchUser search={search} setSearchParams={setSearchParams} />
      <div>
        <div>{header}</div>
      </div>
    </>
  );
}

// &&
// user.email.toLowerCase().includes(search.toLowerCase())
