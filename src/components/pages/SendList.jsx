import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { removeUser, sendEmails, addServerToggle } from '../../store/userSlice';
import styles from './sendList.module.scss';

export default function SendList() {
  const dispatch = useDispatch();
  const deleteUser = (id) => {
    dispatch(removeUser(id));
  };
  const selectedUsers = useSelector((state) => state.users.selectedUsers);

  const sendUsers = () => {
    dispatch(sendEmails(selectedUsers));
    selectedUsers.forEach((user) => {
      dispatch(sendEmails(user));
      dispatch(addServerToggle(user.id));
    });
  };

  const sendListBody =
    selectedUsers.length > 0 ? (
      <>
        {selectedUsers.map((user) => {
          return <User key={user.id} {...user} deleteUser={deleteUser} />;
        })}
        <button className={styles.sendButton} onClick={sendUsers}>
          Send
        </button>
      </>
    ) : (
      <h2 className={styles.sendListTitle}>There're no users on the list</h2>
    );
  return (
    <div className={styles.sendListContainer}>
      <h2 className={styles.sendListTitle}>Send list</h2>
      {sendListBody}
    </div>
  );
}
