import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUSer } from '../../store/adminSlice';

export default function HeaderLayout() {
  const adminAuth = useSelector((state) => state.admin.isLogined);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUSer());
  };

  const header = adminAuth ? (
    <>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <NavLink className={styles.link} to="/">
            Users
          </NavLink>

          <NavLink className={styles.link} to="sendList">
            Send list
          </NavLink>

          <NavLink className={styles.link} to="createUser">
            Create user
          </NavLink>
        </div>

        <NavLink to="/" onClick={logoutHandler} className={styles.navItem}>
          Logout
        </NavLink>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </>
  ) : (
    <>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <NavLink className={styles.link} to="/">
            Users
          </NavLink>

          <NavLink className={styles.link} to="sendList">
            Send list
          </NavLink>
        </div>
        <NavLink className={styles.navItem} to="login">
          Login
        </NavLink>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
  return header;
}
