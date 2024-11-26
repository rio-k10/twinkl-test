import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface SearchState {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchContext {
  children: ReactNode;
  contextOverride?: SearchState;
}

// Create the context
const SearchContext = createContext<SearchState | undefined>(undefined);

// Provider component
export const SearchProvider = ({
  children,
  contextOverride = undefined
}: SearchContext) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, ...contextOverride }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for consuming the context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within an AppProvider');
  }
  return context;
};
