import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { authorizeUser } from '../../store/adminSlice.js';
import styles from './loginPage.module.scss';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [infoChecker, setInfoChecker] = useState(true); //если false, появляется сообщение wrong login/password
  const location = useLocation();
  const navigate = useNavigate();
  const fromPage = location.state?.from?.pathname || '/';
  const loginPageAdress = location.pathname;
  const adminInfo = useSelector((state) => state.admin.admin);
  const loginHandler = () => {
    const admin = adminInfo.find((admin) => admin.login === login);
    if (admin === undefined || admin.login !== login) {
      setInfoChecker(false);
      setTimeout(() => setInfoChecker(true), 2000);
      setLogin('');
      return false;
    }
    if (admin.password !== password) {
      setInfoChecker(false);
      setTimeout(() => setInfoChecker(true), 2000);
      setPassword('');
      return false;
    }
    dispatch(authorizeUser());
    setLogin('');
    setPassword('');

    navigate(fromPage, {
      replace: false,
      state: {
        fromPage,
        loginPageAdress,
      },
    });
  };

  const authHeader = infoChecker ? (
    <h2 className={styles.formTitle}>Hello user! Please login!</h2>
  ) : (
    <h2 className={styles.formTitle}>Sorry, wrong login/password.</h2>
  );

  return (
    <>
      {authHeader}
      <form className={styles.form} autoComplete="off">
        <input
          className={styles.formInput}
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="login"
          autoComplete="username"
        />
        <input
          autoComplete="current-password"
          className={styles.formInput}
          type="password"
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
