import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addServerToggle } from '../../store/userSlice';
import styles from './user.module.scss';
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
      <div className={styles.userCard}>
        <div className={styles.infoContainer}>
          <img className={styles.avatar} src={avatar} alt={avatar} />
          <div className={styles.texInfo}>
            <Link className={styles.name} to={`../${id}`}>
              {first_name} {last_name}
            </Link>
            <p>{email}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>
                <Link className={styles.editLink} to={`../editUser/${id}`}>
                  Edit user
                </Link>
              </button>
              <button className={styles.button} onClick={() => deleteUser(id)}>
                Delete!
              </button>
            </div>
          </div>
        </div>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={added}
          onChange={() => dispatch(addServerToggle(id))}
        />
      </div>
    </div>
  );
}
