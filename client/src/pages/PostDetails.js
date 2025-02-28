import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost, deletePost } from '../utils/api';
import PostForm from '../components/PostForm';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPostById(id);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [id]);

  const handleEdit = async (formData) => {
    try {
      const { data } = await updatePost(id, formData);
      setPost(data); // Update the post state with the edited data
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
          <PostForm onSubmit={handleEdit} initialData={post} />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-4">{post.description}</p>
          <pre className="bg-gray-100 p-4 rounded mb-4">{post.code}</pre>
          <p className="text-sm text-gray-500 mb-4">Language: {post.language}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default PostDetails;