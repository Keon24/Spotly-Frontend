import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import HorizontalCardRow from '../components/Dashboard/HorizontalCard'
import { useUser } from '../context/UserContext';

export default function DashboardPage() {
  const { user } = useUser()
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
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10 mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.first_name}!</h1>
              <p className="text-gray-300 mb-6">Manage your parking reservations and account settings from here.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/30 p-6 rounded-lg border border-gray-700">
                  <h2 className="text-xl font-semibold mb-2">Book a Spot</h2>
                  <p className="text-gray-400 mb-4">Find and reserve available parking spaces</p>
                  <a href="/booking" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition inline-block shadow-lg">
                    Book Now
                  </a>
                </div>
                <div className="bg-black/30 p-6 rounded-lg border border-gray-700">
                  <h2 className="text-xl font-semibold mb-2">My Reservations</h2>
                  <p className="text-gray-400 mb-4">View and manage your current bookings</p>
                  <a href="/reservations" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition inline-block shadow-lg">
                    View All
                  </a>
                </div>
                <div className="bg-black/30 p-6 rounded-lg border border-gray-700">
                  <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
                  <p className="text-gray-400 mb-4">Update your profile and preferences</p>
                  <a href="/profile" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium transition inline-block shadow-lg">
                    Settings
                  </a>
                </div>
              </div>
            </div>

            <HorizontalCardRow title="Quick Stats" items={[]} />
          </div>
        </main>

      </div>
    </div>
  );
}
