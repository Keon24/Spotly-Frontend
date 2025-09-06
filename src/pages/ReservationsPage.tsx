import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

type Reservation = {
  id: number;
  space: {
    id: number;
    label: string;
  };
  reserve_date: string;
  ticket_code: string;
  created_at: string;
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reservations/`, {
          withCredentials: true
        });
        setReservations(response.data);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = async (reservationId: number) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/reservations/${reservationId}/cancel/`, {}, {
        withCredentials: true
      });
      setReservations(prev => prev.filter(res => res.id !== reservationId));
      alert('Reservation cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
      alert('Failed to cancel reservation');
    }
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Reservations</h1>
            
            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-400">Loading your reservations...</p>
              </div>
            )}

            {!loading && reservations.length === 0 && (
              <div className="bg-white/5 p-8 rounded-lg text-center">
                <p className="text-gray-400 mb-4">You don't have any reservations yet.</p>
                <a href="/booking" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
                  Book a Spot
                </a>
              </div>
            )}

            {!loading && reservations.length > 0 && (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {reservation.space.label}
                        </h3>
                        <p className="text-gray-300 mb-1">
                          <span className="font-medium">Date & Time:</span> {' '}
                          {new Date(reservation.reserve_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}{' '}
                          at {new Date(reservation.reserve_date).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </p>
                        <p className="text-gray-400 text-sm">
                          <span className="font-medium">Ticket:</span> {reservation.ticket_code}
                        </p>
                        <p className="text-gray-400 text-sm">
                          <span className="font-medium">Booked:</span> {' '}
                          {new Date(reservation.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}