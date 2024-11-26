it('', () => {});
// import { render, screen, fireEvent } from '@testing-library/react';
// import PostList from '@/components/PostList/PostList';
// import { SearchProvider } from '@/context/SearchContext';

// describe('PostList Component', () => {
//   const mockPosts = [
//     { id: 1, title: 'Post 1', body: 'Body 1' },
//     { id: 2, title: 'Post 2', body: 'Body 2' }
//   ];
//   const mockSetPosts = vi.fn();
//   const mockLoadMorePosts = vi.fn();

//   it('should render the list of posts', () => {
//     render(
//       <SearchProvider>
//         <PostList
//           posts={mockPosts}
//           setPosts={mockSetPosts}
//           loadMorePosts={mockLoadMorePosts}
//           loading={false}
//         />
//       </SearchProvider>
//     );

//     const postTitles = screen.getAllByText(/Post/);
//     expect(postTitles).toHaveLength(mockPosts.length);
//   });

//   it('should call setPosts with the correct post removed when "Remove" is clicked', () => {
//     render(
//       <SearchProvider>
//         <PostList
//           posts={mockPosts}
//           setPosts={mockSetPosts}
//           loadMorePosts={mockLoadMorePosts}
//           loading={false}
//         />
//       </SearchProvider>
//     );

//     const removeButton = screen.getAllByText(/Remove/)[0];
//     fireEvent.click(removeButton);

//     expect(mockSetPosts).toHaveBeenCalledTimes(1);
//     expect(mockSetPosts).toHaveBeenCalledWith([
//       { id: 2, title: 'Post 2', body: 'Body 2' }
//     ]);
//   });

//   it('should call loadMorePosts when scrolled to the bottom', () => {
//     const { container } =                              render(
//       <SearchProvider>
//         <PostList
//           posts={mockPosts}
//           setPosts={mockSetPosts}
//           loadMorePosts={mockLoadMorePosts}
//           loading={false}
//         />
//       </SearchProvider>
//     );

//     const postListDiv = screen.getByTestId('post-list');
//     fireEvent.scroll(postListDiv, {
//       target: { scrollTop: 100, scrollHeight: 300, clientHeight: 200 }
//     });

//     expect(mockLoadMorePosts).toHaveBeenCalled();
//   });

//   it('should display a loading spinner when loading is true', () => {
//     render(
//       <SearchProvider>
//         <PostList
//           posts={mockPosts}
//           setPosts={mockSetPosts}
//           loadMorePosts={mockLoadMorePosts}
//           loading={true}
//         />
//       </SearchProvider>
//     );

//     expect(screen.getByText(/Loading more posts/)).toBeInTheDocument();
//   });
// });
