import React, { useState, useEffect, useRef } from 'react';
import PostList from './components/PostList/PostList';
import Loader from './components/Loader/Loader';
import { SearchProvider } from './context/SearchContext';
import Header from './components/Header/Header';

interface Post {
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const mounted = useRef(false);
  const fetchPosts = async (pageNumber: number) => {
    if (loading) return; // Prevent new fetch if already loading or all posts are loaded
    setLoading(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}`
      );
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Unable to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    9;
    const onLoad = () => {
      fetchPosts(1);
    };
    if (!mounted.current) {
      mounted.current = true;
      void onLoad();
    }
  }, []);

  const loadMorePosts = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      fetchPosts(page + 1);
    }
  };

  return (
    <SearchProvider>
      <div className='h-screen flex flex-col bg-blue-50'>
        {/* Sticky Header */}
        <div className='sticky top-0 z-10 bg-white shadow-md'>
          <Header />
        </div>

        {/* Scrollable PostList */}
        <div className='flex-1 overflow-y-auto'>
          {error && <p className='text-center text-red-500 h-full'>{error}</p>}
          {loading && posts.length === 0 ? (
            <Loader />
          ) : (
            <PostList
              posts={posts}
              setPosts={setPosts}
              loadMorePosts={loadMorePosts}
              loading={loading}
            />
          )}
        </div>
      </div>
    </SearchProvider>
  );
};

export default App;
