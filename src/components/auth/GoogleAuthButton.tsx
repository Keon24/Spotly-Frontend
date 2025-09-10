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
      className="w-full flex items-center justify-center gap-2 border-2 border-gray-400 rounded-md py-2 px-4 bg-white hover:bg-gray-50 transition shadow-sm"
    >
      <FcGoogle className="text-xl" />
      <span className="text-sm text-gray-800 font-semibold">Sign in with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
