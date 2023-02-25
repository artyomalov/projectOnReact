import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
export default function SingleUser() {
  const params = useParams();
  const usersList = useSelector((state) => state.users.users);
  const user = usersList.find((user) => user.id == params.id);
  const { first_name, last_name, avatar, email } = user;
  return (
    <div>
      <img src={avatar} alt={avatar} />
      <h2>
        {first_name} {last_name}
      </h2>
      <p>{email}</p>
    </div>
  );
}
