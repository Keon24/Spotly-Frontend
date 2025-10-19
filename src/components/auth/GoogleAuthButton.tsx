import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleAuthButtonProps {
  text?: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ text = 'Login with Google' }) => {
  const handleGoogleLogin = () => {
    window.location.href = 'https://spotly-kozf.onrender.com/auth/redirect/';
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-lg py-3 px-4 bg-black text-white hover:bg-gray-900 transition-all duration-200 shadow-sm font-medium"
    >
      <FcGoogle className="text-xl" />
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default GoogleAuthButton;
