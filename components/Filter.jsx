import { useState } from 'react';

const Filter = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div>
      Filter shown with <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Filter;