import { useState } from 'react';
import styles from './searchUser.module.scss';
export default function SearchUser({ search, setSearchParams }) {
  const [inputValue, setInputValue] = useState(search);
  const searchHandler = (e) => {
    setInputValue(e.target.value);
    setSearchParams({ search: e.target.value });
  };
  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchLabel}>Search</span>
      <input
        className={styles.search}
        type="search"
        value={inputValue}
        placeholder="search name or email"
        autoComplete="off"
        onChange={(e) => searchHandler(e)}
      />
    </div>
  );
}
