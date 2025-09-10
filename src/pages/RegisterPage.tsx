import RegisterForm from "../components/auth/RegisterForm";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import { Link } from 'react-router-dom'
export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0f1121] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Sign Up</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your information to create your Spotly account.
        </p>

    
        <RegisterForm />

       
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <GoogleAuthButton />
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
