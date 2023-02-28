import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editUser } from '../../store/userSlice';
import CreateUserForm from '../components/CreateUserForm';
import styles from './editUser.module.scss';
export default function EditUser() {
  const location = useLocation();
  const params = useParams();
  const id = parseInt(params.id);
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const user = users.find((user) => {
    return user.id === id;
  });
  const [fname, setFname] = useState(user.first_name);
  const [sname, setSname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [info, setInfo] = useState(user.info);
  const [image, setImage] = useState(user.avatar);
  const [added, setAdded] = useState(user.added);
  const commitChangesHandler = () => {
    const editedUser = {
      id,
      first_name: fname,
      last_name: sname,
      email,
      info,
      added,
      avatar: image,
    };
    dispatch(editUser(editedUser));

    navigate(`/${params.id}`, { replace: true });
  };

  const cancelChangesHandler = () => {
    if (location.state?.loginPageAdress) {
      navigate(-2);
    }
    navigate(-1);
  };

  return (
    <div className={styles.editUserContainer}>
      <h2 className={styles.editUserTitle}>
        Edit {fname} {sname}!
      </h2>
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
      <div className={styles.editUserButtonContainer}>
        <button
          className={styles.editUserButton}
          onClick={cancelChangesHandler}
        >
          Back
        </button>
        <button
          className={styles.editUserButton}
          onClick={commitChangesHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
}
