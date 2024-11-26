import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { vi, Mock } from 'vitest';

global.fetch = vi.fn();

const mockPostsPage1 = [
  { id: 1, title: 'Mock Title 1', body: 'Mock Body 1' },
  { id: 2, title: 'Mock Title 2', body: 'Mock Body 2' }
];

const mockPostsPage2 = [
  { id: 3, title: 'Mock Title 3', body: 'Mock Body 3' },
  { id: 4, title: 'Mock Title 4', body: 'Mock Body 4' }
];

describe('App Component', () => {
  beforeEach(() => {
    (fetch as Mock).mockImplementation((url: string) => {
      if (url.includes('_page=1')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockPostsPage1
        });
      }
      if (url.includes('_page=2')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockPostsPage2
        });
      }
      return Promise.resolve({
        ok: false
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the Header component', () => {
      render(<App />);
      expect(
        screen.getByPlaceholderText('Search posts...')
      ).toBeInTheDocument();
    });

    it('should render the Loader while fetching posts', async () => {
      render(<App />);
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
      );
    });

    it('should render the PostList component after fetching posts', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('Mock Title 1')).toBeInTheDocument();
        expect(screen.getByText('Mock Title 2')).toBeInTheDocument();
      });
    });
  });

  describe('Functionality', () => {
    it('should handle fetch failure gracefully', async () => {
      (fetch as Mock).mockResolvedValueOnce({
        ok: false
      });

      render(<App />);
      await waitFor(() =>
        expect(
          screen.getByText('Unable to load posts. Please try again later.')
        ).toBeInTheDocument()
      );
    });

    it('should allow searching posts through the search bar', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('Mock Title 1')).toBeInTheDocument();
        expect(screen.getByText('Mock Title 2')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search posts...');
      userEvent.type(searchInput, 'Title 2');

      await waitFor(() => {
        expect(screen.queryByText('Mock Title 1')).not.toBeInTheDocument();
        expect(screen.getByText('Mock Title 2')).toBeInTheDocument();
      });
    });

    it('should allow removing posts', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('Mock Title 1')).toBeInTheDocument();
      });

      const removeButton = screen.getAllByRole('button', {
        name: /remove/i
      })[0];
      userEvent.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText('Mock Title 1')).not.toBeInTheDocument();
      });
    });

    it('should fetch more posts when scrolling to the bottom', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('Mock Title 1')).toBeInTheDocument();
        expect(screen.getByText('Mock Title 2')).toBeInTheDocument();
      });

      const postListDiv = screen.getByTestId('post-list');
      fireEvent.scroll(postListDiv, { target: { scrollTop: 1000 } });

      await waitFor(() => {
        expect(screen.getByText('Mock Title 3')).toBeInTheDocument();
        expect(screen.getByText('Mock Title 4')).toBeInTheDocument();
      });
    });

    it('should not fetch posts while posts are loading', async () => {
      render(<App />);
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      const postListDiv = screen.getByTestId('post-list');
      fireEvent.scroll(postListDiv, { target: { scrollTop: 1000 } });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(2);
      });
      fireEvent.scroll(postListDiv, { target: { scrollTop: 1000 } });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(3);
      });
    });
  });
});
