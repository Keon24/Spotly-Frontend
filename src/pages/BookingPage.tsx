import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import AvailableSpots from '../components/Dashboard/AvailableSpots';

export default function BookingPage() {
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Book a Parking Spot</h1>
            <AvailableSpots />
          </div>
        </main>

      </div>
    </div>
  );
}