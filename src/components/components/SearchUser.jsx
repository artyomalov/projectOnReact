import { useState } from 'react';

export default function SearchUser({ search, setSearchParams }) {
  const [inputValue, setInputValue] = useState(search);
  const searchHandler = (e) => {
    setInputValue(e.target.value);
    setSearchParams({ search: e.target.value });
  };
  return (
    <input
      type="search"
      value={inputValue}
      onChange={(e) => searchHandler(e)}
    />
  );
}
