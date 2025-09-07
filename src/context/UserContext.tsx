import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string | null;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use cookie-based authentication (withCredentials is already set globally)
        const res = await axios.get("https://spotly-kozf.onrender.com/api/users/profile/");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setUser(null);
        // Clear any stored tokens if authentication fails
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
