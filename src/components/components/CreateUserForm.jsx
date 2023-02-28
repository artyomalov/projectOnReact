import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewUser } from '../../store/userSlice';
import styles from './createUserForm.module.scss';
export default function CreateUserForm() {
  const [fname, setFname] = useState('');
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState('');
  const [image, setImage] = useState('');
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const createNewUserHandler = (e) => {
    e.preventDefault();

    if (fname && sname && email) {
      const newUser = {
        id: Date.now(),
        email: email,
        first_name: fname,
        last_name: sname,
        info: info,
        avatar: image,
        added: added,
      };
      dispatch(createNewUser(newUser));
      setFname('');
      setSname('');
      setEmail('');
      setInfo('');
      setAdded(false);
    }
  };

  return (
    <form className={styles.createUserForm}>
      <input
        className={styles.createUserItem}
        type="text"
        placeholder="Enter user's first_name"
        onChange={(e) => setFname(e.target.value)}
        value={fname}
      />
      <input
        className={styles.createUserItem}
        type="text"
        placeholder="Enter user's second_name"
        onChange={(e) => setSname(e.target.value)}
        value={sname}
      />
      <input
        className={styles.createUserItem}
        type="email"
        placeholder="Enter user's email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <textarea
        className={styles.createUsertextarea}
        placeholder="Enter user's info"
        onChange={(e) => setInfo(e.target.value)}
        value={info}
      />

      <div className={styles.imgCheckerContainer}>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.value)}
        />
        <label className={styles.createUserLabel}>
          <input
            className={styles.createUserChecker}
            type="checkbox"
            checked={added}
            onChange={() => {
              setAdded((prev) => !prev);
            }}
          />{' '}
          Added
        </label>
      </div>
      <button
        className={styles.createUserButton}
        onClick={(e) => {
          createNewUserHandler(e);
        }}
      >
        Add user!
      </button>
    </form>
  );
}
