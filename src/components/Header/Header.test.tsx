import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect, Mock } from 'vitest';
import Header from './Header';
import { useSearchContext } from '@/context/SearchContext';

vi.mock('@/context/SearchContext', () => ({
  useSearchContext: vi.fn()
}));

vi.mock('@/context/useDebouncedValue', () => ({
  useDebouncedValue: vi.fn()
}));

describe('Header Component', () => {
  const setSearchTermMock = vi.fn();
  const mockContextValue = {
    searchTerm: '',
    setSearchTerm: setSearchTermMock
  };

  beforeEach(() => {
    (useSearchContext as Mock).mockReturnValue(mockContextValue);
    vi.clearAllMocks();
  });

  it('should render the input field', () => {
    render(<Header />);
    const input = screen.getByPlaceholderText('Search posts...');
    expect(input).toBeInTheDocument();
  });

  it('should display the current search term from context', () => {
    (useSearchContext as Mock).mockReturnValue({
      ...mockContextValue,
      searchTerm: 'React'
    });
    render(<Header />);
    const input = screen.getByDisplayValue('React');
    expect(input).toBeInTheDocument();
  });

  it('should call setSearchTerm on input change', () => {
    render(<Header />);
    const input = screen.getByPlaceholderText('Search posts...');

    fireEvent.change(input, { target: { value: 'React' } });

    expect(setSearchTermMock).toHaveBeenCalledTimes(2);
    expect(setSearchTermMock).toHaveBeenCalledWith('React');
  });
});
