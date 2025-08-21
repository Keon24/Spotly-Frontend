// src/components/layout/Sidebar.tsx

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#111] text-white px-6 py-8 space-y-8">
      <div className="text-2xl font-bold">Spotly</div>

      <nav className="flex flex-col space-y-4 text-sm">
        <Link to="/dashboard" className="flex items-center space-x-2 !text-white hover:!text-gray-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 no-underline visited:!text-white">
          <span className="!text-white">Dashboard</span>
        </Link>

        <Link to="/booking" className="flex items-center space-x-2 !text-white hover:!text-gray-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 no-underline visited:!text-white">
          <span className="!text-white">Book Spot</span>
        </Link>

        <Link to="/reservations" className="flex items-center space-x-2 !text-white hover:!text-gray-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 no-underline visited:!text-white">
          <span className="!text-white">My Reservations</span>
        </Link>

        <Link to="/profile" className="flex items-center space-x-2 !text-white hover:!text-gray-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 no-underline visited:!text-white">
          <span className="!text-white">Profile</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
