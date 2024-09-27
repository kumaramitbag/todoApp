import React from 'react';

interface FilterProps {
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
}

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  const filterToggle = (prop: 'all' | 'completed' | 'pending') => {
    localStorage.setItem('filter', prop);
    setFilter(prop);
  };
  return (
    <div>
      <button onClick={() => filterToggle('all')}>All</button>
      <button onClick={() => filterToggle('completed')}>Completed</button>
      <button onClick={() => filterToggle('pending')}>Pending</button>
    </div>
  );
};

export default Filter;
