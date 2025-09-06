import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { useUser } from '../context/UserContext';
import axios from 'axios';

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || ''
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfileImage(imageUrl);
        // Save to localStorage
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile/`, formData, {
        withCredentials: true
      });
      setUser(response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-[#0f1121] to-gray-900 text-white">
      
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#121212] z-50 shadow-lg">
        <Sidebar />
      </aside>

      <div className="ml-64 w-full flex flex-col">
        
        <header className="fixed top-0 left-64 right-0 h-16 bg-[#1f1f1f] z-40 shadow-md">
          <Navbar />
        </header>

        <main className="mt-16 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10">
              <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
              
              {/* Profile Image Section */}
              <div className="flex flex-col items-center mb-8">
                <div 
                  className="relative w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors border-4 border-gray-600 hover:border-gray-500"
                  onClick={handleImageClick}
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-2 text-gray-400">+</div>
                      <div className="text-xs text-gray-400">Click to upload</div>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm">Upload</span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-gray-400 text-sm mt-2">Click to change profile picture</p>
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <p className="bg-gray-800/50 rounded-lg px-4 py-2 text-gray-200">
                        {user?.first_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <p className="bg-gray-800/50 rounded-lg px-4 py-2 text-gray-200">
                        {user?.last_name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <p className="bg-gray-800/50 rounded-lg px-4 py-2 text-gray-200">
                      {user?.email}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Account Stats */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-indigo-400">--</div>
                    <div className="text-sm text-gray-400">Total Reservations</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">--</div>
                    <div className="text-sm text-gray-400">Hours Parked</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-400">--</div>
                    <div className="text-sm text-gray-400">Favorite Spot</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}