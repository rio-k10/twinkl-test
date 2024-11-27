import React, { useEffect, useRef } from 'react';
import { useSearchContext } from '../../context/SearchContext';
import Loader from '@/components/Loader/Loader';
import PostItem from '../PostItem/PostItem';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loadMorePosts: () => void;
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  setPosts,
  loadMorePosts,
  loading
}) => {
  const { searchTerm } = useSearchContext();
  const listRef = useRef<HTMLDivElement | null>(null);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const isPageBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const canLoadMore = isPageBottom && !loading && !searchTerm;
      if (canLoadMore) {
        loadMorePosts();
      }
    }
  };

  useEffect(() => {
    const currentRef = listRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [listRef, loading]);

  return (
    <div
      ref={listRef}
      data-testid='post-list'
      className='h-full overflow-y-auto p-4 space-y-4'
    >
      <ul className='grid gap-4'>
        {filteredPosts.map((post) => (
          <PostItem post={post} onDelete={handleDelete} />
        ))}
      </ul>
      {loading && (
        <div className='fixed bottom-0 left-0 w-full pb-7 bg-transparent'>
          <Loader />
        </div>
      )}
      {!loading && filteredPosts.length === 0 && (
        <div className='flex justify-center items-center h-full'>
          <p className='text-gray-500'>No posts found.</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
