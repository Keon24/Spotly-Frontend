// components/layout/Navbar.tsx
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://spotly-kozf.onrender.com/api/users/logout/', {}, {
        withCredentials: true,
      });

      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return null;

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm">
          {user ? `Welcome, ${user.first_name}` : 'Not logged in'}
        </span>

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        )}

        
        <div className="w-8 h-8 bg-gray-600 rounded-full" />
      </div>
    </header>
  );
}
