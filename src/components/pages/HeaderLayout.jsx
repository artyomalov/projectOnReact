import { NavLink, Outlet } from 'react-router-dom';
import styles from './header.module.css';
import { useSelector } from 'react-redux';
export default function HeaderLayout() {
  const adminAuth = useSelector((state) => state.admin.isLogined);
  const header = adminAuth ? (
    <>
      <header>
        <NavLink className={styles.link} to="/">
          Users
        </NavLink>
        <NavLink className={styles.link} to="createUser">
          Create user
        </NavLink>
        <NavLink className={styles.link} to="sendList">
          Send list
        </NavLink>
        <NavLink className={styles.link} to="login">
          Login
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  ) : (
    <>
      <header>
        <NavLink className={styles.link} to="/">
          Users
        </NavLink>
        <NavLink className={styles.link} to="sendList">
          Send list
        </NavLink>
        <NavLink className={styles.link} to="login">
          Login
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
  return header;
}
