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
      className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 rounded-md py-3 px-4 bg-white hover:bg-gray-100 transition shadow-md"
    >
      <FcGoogle className="text-xl" />
      <span className="text-sm text-gray-900 font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
