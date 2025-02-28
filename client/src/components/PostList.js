import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-700">{post.description}</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">{post.code}</pre>
          <p className="text-sm text-gray-500 mt-2">Language: {post.language}</p>
          <Link to={`/posts/${post._id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;