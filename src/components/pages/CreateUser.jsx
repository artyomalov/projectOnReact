import React from 'react';
import CreateUserForm from '../components/CreateUserForm';
import styles from './createUser.module.scss';
export default function CreateUser() {
  return (
    <div className={styles.createUserContainer}>
      <h2 className={styles.createUserTitle}>Create new user!</h2>
      <CreateUserForm />
    </div>
  );
}
