import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import GoogleAuthButton from './GoogleAuthButton';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/login/', formData);
      navigate('/dashboard'); // 👈 Change this to your main page after login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md p-8 text-gray-800 shadow-xl rounded-lg space-y-4 border border-[#2c2c2c]"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <input
        className="w-full p-2 border rounded"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
    <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
      </div>

       <GoogleAuthButton />
       <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
      >
        Login
      </button>


      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
