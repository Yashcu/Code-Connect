import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../utils/api';
import AuthForm from '../components/AuthForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setError('');
      const { data } = isLogin
        ? await loginUser(formData)
        : await registerUser(formData);
      
      if (!data) {
        throw new Error('No response from server');
      }

      try {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
      } catch (storageError) {
        setError('Failed to save login information. Please try again.');
        console.error('Storage error:', storageError);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
      setError(errorMessage);
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <AuthForm type={isLogin ? 'login' : 'register'} onSubmit={handleSubmit} />
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;