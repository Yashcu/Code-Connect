import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../utils/api';
import PostForm from '../components/PostForm';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createPost(formData);
      navigate('/'); // Redirect to the home page after creating the post
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;