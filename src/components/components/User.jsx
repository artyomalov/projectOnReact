import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const location = useLocation();
  const navigate = useNavigate();
  const adminAuth = useSelector((state) => state.admin.isLogined);
  const deleteUserHandler = (id) => {
    if (!adminAuth) {
      navigate('/login', { replace: false, state: { from: location } });
      return false;
    }
    deleteUser(id);
  };
  return (
    <div
      className={added ? styles.userContainerSelected : styles.userContainer}
    >
      <div className={styles.userCard}>
        <div className={styles.infoContainer}>
          <img className={styles.avatar} src={avatar} alt={avatar} />
          <div className={styles.texInfo}>
            <Link className={styles.name} to={`../${id}`}>
              {first_name} {last_name}
            </Link>
            <p className={styles.email}>{email}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>
                <Link className={styles.editLink} to={`../editUser/${id}`}>
                  Edit user
                </Link>
              </button>
              <button
                className={styles.button}
                onClick={() => deleteUserHandler(id)}
              >
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
