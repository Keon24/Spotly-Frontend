import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'; 
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl" />
      <span className="text-sm text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
