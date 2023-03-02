import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './singleUser.module.scss';
export default function SingleUser() {
  const params = useParams();
  const usersList = useSelector((state) => state.users.users);
  const user = usersList.find((user) => user.id === parseInt(params.id));
  const { first_name, last_name, avatar, email, info } = user;
  return (
    <div className={styles.singleUserContainer}>
      <div className={styles.mainInfoContainer}>
        <img className={styles.img} src={avatar} alt={avatar} />
        <div className={styles.textContainer}>
          <h2 className={styles.item}>
            {first_name} {last_name}
          </h2>
          <p className={styles.item}>{email}</p>
        </div>
      </div>
      <p className={styles.info}>{info}</p>
    </div>
  );
}
