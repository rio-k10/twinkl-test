import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useSearchContext } from '../../context/SearchContext';
import PostList from './PostList';

vi.mock('../../context/SearchContext', () => ({
  useSearchContext: vi.fn()
}));

const mockSetPosts = vi.fn();
const mockLoadMorePosts = vi.fn();

const mockPosts = [
  { id: 1, title: 'Mock Post 1', body: 'This is the first mock post.' },
  { id: 2, title: 'Mock Post 2', body: 'This is the second mock post.' }
];

describe('PostList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchContext as Mock).mockReturnValue({
      searchTerm: ''
    });
  });

  describe('Rendering', () => {
    it('should render posts correctly', () => {
      render(
        <PostList
          posts={mockPosts}
          setPosts={mockSetPosts}
          loadMorePosts={mockLoadMorePosts}
          loading={false}
        />
      );

      expect(screen.getByText('Mock Post 1')).toBeInTheDocument();
      expect(screen.getByText('Mock Post 2')).toBeInTheDocument();
    });

    it('should display the loader when loading is true', () => {
      render(
        <PostList
          posts={mockPosts}
          setPosts={mockSetPosts}
          loadMorePosts={mockLoadMorePosts}
          loading={true}
        />
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should display "No posts found" when no posts match the search term', () => {
      (useSearchContext as Mock).mockReturnValue({
        searchTerm: 'Nonexistent'
      });

      render(
        <PostList
          posts={mockPosts}
          setPosts={mockSetPosts}
          loadMorePosts={mockLoadMorePosts}
          loading={false}
        />
      );

      expect(screen.getByText('No posts found.')).toBeInTheDocument();
    });
  });

  describe('Functionality', () => {
    it('should filter posts based on the search term', () => {
      (useSearchContext as Mock).mockReturnValue({
        searchTerm: 'Post 2'
      });

      render(
        <PostList
          posts={mockPosts}
          setPosts={mockSetPosts}
          loadMorePosts={mockLoadMorePosts}
          loading={false}
        />
      );

      expect(screen.getByText('Mock Post 2')).toBeInTheDocument();
      expect(screen.queryByText('Mock Post 1')).not.toBeInTheDocument();
    });

    it('should call setPosts with the correct post removed when delete button is clicked', () => {
      render(
        <PostList
          posts={mockPosts}
          setPosts={mockSetPosts}
          loadMorePosts={mockLoadMorePosts}
          loading={false}
        />
      );

      const deleteButton = screen.getAllByRole('button', {
        name: /remove/i
      })[0];
      fireEvent.click(deleteButton);

      expect(mockSetPosts).toHaveBeenCalledTimes(1);

      const setPostsCallback = mockSetPosts.mock.calls[0][0];
      const updatedPosts = setPostsCallback(mockPosts);
      expect(updatedPosts).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: 2 })])
      );
      expect(updatedPosts).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: 1 })])
      );
    });

    it('should call loadMorePosts when scrolling to the bottom', async () => {
      const listRef = { scrollTop: 0, clientHeight: 100, scrollHeight: 200 };
      render(
        <PostList
          posts={mockPosts}
          setPosts={mockSetPosts}
          loadMorePosts={mockLoadMorePosts}
          loading={false}
        />
      );

      Object.defineProperty(listRef, 'scrollTop', { value: 100 });
      fireEvent.scroll(screen.getByTestId('post-list'));

      await waitFor(() => {
        expect(mockLoadMorePosts).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call loadMorePosts when loading is true', async () => {
      render(
        <PostList
          posts={mockPosts}
          setPosts={mockSetPosts}
          loadMorePosts={mockLoadMorePosts}
          loading={true}
        />
      );

      fireEvent.scroll(screen.getByTestId('post-list'));

      await waitFor(() => {
        expect(mockLoadMorePosts).not.toHaveBeenCalled();
      });
    });
  });
});
