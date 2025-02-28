import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/api';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CodeConnect Feed</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;