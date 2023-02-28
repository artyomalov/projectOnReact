import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewUser } from '../../store/userSlice';
import CreateUserForm from '../components/CreateUserForm';
import styles from './createUser.module.scss';
export default function CreateUser() {
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
    <div className={styles.createUserContainer}>
      <h2 className={styles.createUserTitle}>Create new user!</h2>
      <CreateUserForm
        fname={fname}
        setFname={setFname}
        sname={sname}
        setSname={setSname}
        email={email}
        setEmail={setEmail}
        info={info}
        setInfo={setInfo}
        image={image}
        setImage={setImage}
        added={added}
        setAdded={setAdded}
      />
      <button
        className={styles.createUserButton}
        onClick={(e) => {
          createNewUserHandler(e);
        }}
      >
        Add user!
      </button>
    </div>
  );
}
