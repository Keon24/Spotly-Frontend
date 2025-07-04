import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0f1121] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Login</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Welcome back! Log in to your Spotly account.
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
