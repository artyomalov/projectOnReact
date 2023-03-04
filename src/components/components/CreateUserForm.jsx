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
  setImage,
  added,
  setAdded,
}) {
  return (
    <form className={styles.createUserForm} autoComplete="off">
      <input
        className={styles.createUserItem}
        type="text"
        placeholder="Enter user's first_name"
        onChange={(e) => setFname(e.target.value)}
        value={fname}
        autoComplete="given-name"
      />
      <input
        className={styles.createUserItem}
        type="text"
        placeholder="Enter user's second_name"
        onChange={(e) => setSname(e.target.value)}
        value={sname}
        autoComplete="family-name"
      />
      <input
        className={styles.createUserItem}
        type="email"
        placeholder="Enter user's email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="email"
      />
      <textarea
        className={styles.createUsertextarea}
        placeholder="Enter user's info"
        onChange={(e) => setInfo(e.target.value)}
        value={info}
        autoComplete="off"
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
