import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { removeUser } from '../../store/userSlice';
import styles from './sendList.module.scss';
export default function SendList() {
  const dispatch = useDispatch();
  const deleteUser = (id) => {
    dispatch(removeUser(id));
  };

  const selectedUsers = useSelector((state) => state.users.selectedUsers);
  const header =
    selectedUsers.length > 0 ? (
      selectedUsers.map((user) => {
        return <User key={user.id} {...user} deleteUser={deleteUser} />;
      })
    ) : (
      <h2 className={styles.sendListTitle}>There're no users on the list</h2>
    );
  return (
    <div>
      <h2 className={styles.sendListTitle}>Send list</h2>
      {header}
    </div>
  );
}
