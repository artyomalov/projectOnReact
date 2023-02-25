import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addServerToggle } from '../../store/userSlice';
import styles from './user.module.css';
export default function User({
  id,
  email,
  first_name,
  last_name,
  avatar,
  added,
  deleteUser,
}) {
  const dispatch = useDispatch();
  return (
    <div className={styles.userContainer}>
      <img src={avatar} alt={avatar} />
      <div className={styles.infoContainer}>
        <Link className={styles.name} to={`${id}`}>
          {first_name} {last_name}
        </Link>
        <input
          type="checkbox"
          checked={added}
          onChange={() => dispatch(addServerToggle(id))}
        />
        <p>{email}</p>
      </div>
      <div>
        <button onClick={() => deleteUser(id)}>Delete!</button>
        <button>
          <Link to={`../editUser/${id}`}>Edit user</Link>
        </button>
      </div>
    </div>
  );
}
