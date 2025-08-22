import { useState, useEffect } from 'react';
import axios from 'axios';

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

export default function ReservationsView() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('https://spotly-kozf.onrender.com/api/reservations/', {
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
      await axios.post(`https://spotly-kozf.onrender.com/api/reservations/${reservationId}/cancel/`, {}, {
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
    <div className="bg-white/5 p-6 rounded-lg shadow-md border border-white/10">
      <h2 className="text-xl font-semibold mb-4">My Reservations</h2>
      
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-400">Loading your reservations...</p>
        </div>
      )}

      {!loading && reservations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">You don't have any reservations yet.</p>
          <a href="/booking" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
            Book a Spot
          </a>
        </div>
      )}

      {!loading && reservations.length > 0 && (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="bg-black/30 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {reservation.space.label}
                  </h3>
                  <p className="text-gray-300 mb-1">
                    <span className="font-medium">Date & Time:</span> {' '}
                    {new Date(reservation.reserve_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
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
                </div>
                <button
                  onClick={() => handleCancelReservation(reservation.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
