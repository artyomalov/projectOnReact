import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editUser } from '../../store/userSlice';
export default function EditUser() {
  const params = useParams();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const user = users.find((user) => {
    return user.id == params.id;
  });
  const [firstNameEdit, setFirstNameEdit] = useState(user.first_name);
  const [lastNameEdit, setLastNameEdit] = useState(user.last_name);
  const [emailEdit, setEmailEdit] = useState(user.email);

  const editUserToggle = () => {
    const editedUser = {
      id: parseInt(params.id),
      first_name: firstNameEdit,
      last_name: lastNameEdit,
      email: emailEdit,
    };

    dispatch(editUser(editedUser));
    navigate('/:id', { replace: true });
  };

  return (
    <div>
      <div>
        <input
          value={firstNameEdit}
          onChange={(e) => setFirstNameEdit(e.target.value)}
        />
        <input
          value={lastNameEdit}
          onChange={(e) => setLastNameEdit(e.target.value)}
        />
        <input
          value={emailEdit}
          onChange={(e) => setEmailEdit(e.target.value)}
        />
      </div>
      <button onClick={() => navigate('..', { replace: false })}>Back</button>
      <button onClick={editUserToggle}>Save</button>
    </div>
  );
}