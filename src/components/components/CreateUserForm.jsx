import styles from './createUserForm.module.scss';
export default function CreateUserForm({
  fname,
  setFname,
  sname,
  setSname,
  email,
  setEmail,
  info,
  setInfo,
  image,
  setImage,
  added,
  setAdded,
  createNewUserHandler,
}) {
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
    </form>
  );
}
