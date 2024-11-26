import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchProvider, useSearchContext } from './SearchContext';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchContext', () => {
  describe('Provider', () => {
    it('should provide default values for searchTerm and setSearchTerm', async () => {
      const TestComponent = () => {
        const { searchTerm, setSearchTerm } = useSearchContext();

        return (
          <div>
            <p data-testid='search-term'>{searchTerm}</p>
            <button onClick={() => setSearchTerm('new value')}>Update</button>
          </div>
        );
      };

      render(
        <SearchProvider>
          <TestComponent />
        </SearchProvider>
      );

      expect(screen.getByTestId('search-term').textContent).toBe('');

      userEvent.click(screen.getByRole('button', { name: /update/i }));

      await waitFor(() => {
        expect(screen.getByTestId('search-term').textContent).toBe('new value');
      });
    });

    it('should override default context values when contextOverride is provided', () => {
      const TestComponent = () => {
        const { searchTerm, setSearchTerm } = useSearchContext();

        return (
          <div>
            <p data-testid='search-term'>{searchTerm}</p>
            <button onClick={() => setSearchTerm('updated value')}>
              Update
            </button>
          </div>
        );
      };

      render(
        <SearchProvider
          contextOverride={{ searchTerm: 'overridden', setSearchTerm: vi.fn() }}
        >
          <TestComponent />
        </SearchProvider>
      );

      expect(screen.getByTestId('search-term').textContent).toBe('overridden');
    });
  });

  describe('Custom Hook', () => {
    it('should throw an error when used outside of SearchProvider', () => {
      const TestComponent = () => {
        useSearchContext();
        return null;
      };

      expect(() => render(<TestComponent />)).toThrow(
        'useSearchContext must be used within an AppProvider'
      );
    });
  });
});
