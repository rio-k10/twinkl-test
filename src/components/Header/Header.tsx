import { useSearchContext } from '@/context/SearchContext';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import React, { useEffect } from 'react';

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearchContext();
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  return (
    <div className='flex justify-center p-4'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search posts...'
        className='w-full max-w-md px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
    </div>
  );
};

export default Header;
