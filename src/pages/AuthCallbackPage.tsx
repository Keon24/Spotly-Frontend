import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const error = searchParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=' + error);
        return;
      }

      if (accessToken && refreshToken) {
        // Store tokens in localStorage
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        try {
          // Fetch user profile
          const response = await axios.get('https://spotly-kozf.onrender.com/api/users/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          setUser(response.data);
          navigate('/dashboard');
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          navigate('/login?error=profile_fetch_failed');
        }
      } else {
        navigate('/login?error=missing_tokens');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0f1121] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Logging you in...</p>
      </div>
    </div>
  );
}
