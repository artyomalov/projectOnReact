import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { authorizeUser } from '../../store/adminSlice.js';
import styles from './loginPage.module.scss';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const fromPage = location.state?.from?.pathname || '/';
  const adminInfo = useSelector((state) => state.admin.admin);
  const loginHandler = () => {
    const admin = adminInfo.find((admin) => admin.login === login);
    if (admin === undefined) {
      console.log('wrong login');
      setLogin('');
      return false;
    }
    if (admin.password !== password) {
      console.log('wrong password');
      setPassword('');
      return false;
    }
    dispatch(authorizeUser());
    setLogin('');
    setPassword('');

    navigate(fromPage, { replace: false });
  };

  return (
    <>
      <h2 className={styles.formTitle}>Hello user! Please login!</h2>
      <form className={styles.form} autoComplete="off">
        <input
          className={styles.formInput}
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="login"
        />
        <input
          className={styles.formInput}
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className={styles.formButton}
          type="button"
          onClick={loginHandler}
        >
          Login!
        </button>
      </form>
    </>
  );
}
