import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import zxcvbn from 'zxcvbn';
import GoogleAuthButton from './GoogleAuthButton';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post("https://spotly-kozf.onrender.com/api/users/register/", formData);

      setSuccess(true);
      navigate('/login');
    } catch (err) {
      const axiosErr = err as AxiosError<Record<string, string[] | string>>;
      console.error('Registration error:', axiosErr);

      const data = axiosErr.response?.data;
      if (data && typeof data === 'object') {
        const messages = Object.entries(data)
          .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
          .join(' | ');
        setError(messages);
      } else {
        setError(`Something went wrong: ${axiosErr.message || 'Unknown error'}`);
      }
    }
  };

  const passwordScore = zxcvbn(formData.password).score;

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 text-gray-800 max-w-md mx-auto p-6 bg-white/10 border border-white/20 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm text-center">Registered successfully!</p>}

      <input
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="password2"
        placeholder="Confirm Password"
        type="password"
        value={formData.password2}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {formData.password && (
        <small className="text-gray-400 block">
          Password Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordScore]}
        </small>
      )}

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-500" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-black px-2 text-gray-400">or</span>
        </div>
      </div>

      {/* Google button */}
      <GoogleAuthButton text="Sign up with Google" />

      {/* Register button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
