import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUSer } from '../../store/adminSlice';

export default function HeaderLayout() {
  const adminAuth = useSelector((state) => state.admin.isLogined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUSer());
    navigate('/', { replace: true });
  };

  const header = adminAuth ? (
    <>
      <header>
        <button>
          <NavLink className={styles.link} to="/">
            Users
          </NavLink>
        </button>

        <button>
          <NavLink className={styles.link} to="createUser">
            Create user
          </NavLink>
        </button>

        <button>
          <NavLink className={styles.link} to="sendList">
            Send list
          </NavLink>
        </button>

        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  ) : (
    <>
      <header>
        <button>
          <NavLink className={styles.link} to="/">
            Users
          </NavLink>
        </button>

        <button>
          <NavLink className={styles.link} to="sendList">
            Send list
          </NavLink>
        </button>

        <button>
          <NavLink className={styles.link} to="login">
            Login
          </NavLink>
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
  return header;
}
