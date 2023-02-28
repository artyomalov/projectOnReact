import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editUser } from '../../store/userSlice';
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
  const [firstNameEdit, setFirstNameEdit] = useState(user.first_name);
  const [lastNameEdit, setLastNameEdit] = useState(user.last_name);
  const [emailEdit, setEmailEdit] = useState(user.email);
  const [infoEdit, setInfoEdit] = useState(user.info);

  const commitChangesHandler = () => {
    const editedUser = {
      id,
      first_name: firstNameEdit,
      last_name: lastNameEdit,
      email: emailEdit,
      info: infoEdit,
    };
    dispatch(editUser(editedUser));

    navigate(`/${params.id}`, { replace: true }); //!!!!!!!!!!!!!
  };

  const cancelChangesHandler = () => {
    if (location.state.loginPageAdress) {
      navigate(-2);
    }
    navigate(-1);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={firstNameEdit}
          onChange={(e) => setFirstNameEdit(e.target.value)}
        />
        <input
          type="text"
          value={lastNameEdit}
          onChange={(e) => setLastNameEdit(e.target.value)}
        />
        <input
          type="text"
          value={emailEdit}
          onChange={(e) => setEmailEdit(e.target.value)}
        />
        <textarea
          value={infoEdit}
          onChange={(e) => setInfoEdit(e.target.value)}
        />
      </div>
      <button onClick={cancelChangesHandler}>Back</button>
      <button onClick={commitChangesHandler}>Save</button>
    </div>
  );
}
