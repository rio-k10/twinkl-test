import { Post } from '@/types/post';
import React from 'react';

interface Props {
  post: Post;
  onDelete: (id: number) => void;
}

const PostItem = React.memo(({ post, onDelete }: Props) => {
  return (
    <li
      key={post.id}
      className='flex justify-between items-center bg-white p-4 border rounded shadow-md'
    >
      <div>
        <h3 className='font-semibold text-blue-600'>{post.title}</h3>
        <p className='text-sm text-gray-600'>{post.body}</p>
      </div>
      <button
        onClick={() => onDelete(post.id)}
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
      >
        Remove
      </button>
    </li>
  );
});

export default PostItem;
