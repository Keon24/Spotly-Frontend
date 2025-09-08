import { useState, useEffect } from 'react';
import axios from 'axios';

type Spot = {
  id: number;
  label?: string;
};

const AvailableSpots = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [spots, setSpots] = useState<Spot[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);



  // Temporarily disabled the date availability checking function
  // It was getting HTML responses instead of JSON from the API
// Temporarily disabled the 30-day check due to API issues
  // Will re-enable once we fix the HTML response problem

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  useEffect(() => {
    // Set today as default date and skip the 30-day check entirely
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setAvailableDates([today]); // Show at least today as available
    setLoading(false);
    // Don't run the 30-day check since it's failing
    // getAvailableDatesForNext30Days();
  }, []);

  useEffect(() => {
    if (date) {
      axios
  .get(`${import.meta.env.VITE_API_URL}/api/reservations/available/?date=${date}`, {
    withCredentials: true  
  })
  .then((res) => {
    console.log('Available response:', res.data);
    setSpots(res.data.available_spots || []);
  })
  .catch((err) => {
    console.error('Failed to fetch spots', err);
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        alert('Please log in to view available spots');
      } else if (err.response?.status === 404) {
        alert('Booking service is currently unavailable');
      } else {
        alert('Failed to load available spots. Please try again.');
      }
    }
    setSpots([]);
  });
    }
  }, [date]);

  const handleReserve = (spotId: number) => {
    const reserveDateTime = `${date}T${time}:00`;
    console.log('Making reservation:', { space: spotId, reserve_date: reserveDateTime });
    
    axios.post(
      `${import.meta.env.VITE_API_URL}/api/reservations/`,
      {
        space: spotId,
        reserve_date: reserveDateTime,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log('Reservation Successful', res.data);
      alert('Reservation Confirmed');
      setSpots(prev => prev.filter(spot => spot.id !== spotId));
    })
    .catch((err) => {
      console.log('Reservation failed', err);
      console.log('Error response:', err.response?.data);
      console.log('Error status:', err.response?.status);
      
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          alert('Please log in to make a reservation');
        } else if (err.response?.status === 409) {
          alert('This spot is no longer available');
        } else {
          alert(`Reservation failed: ${err.response?.data?.message || err.response?.data?.detail || 'Please try again'}`);
        }
      } else {
        alert('Reservation failed - this spot may already be reserved');
      }
    });
  };

  return (
    <div className="bg-white/5 p-6 rounded-lg shadow-md border border-white/10 mt-6">
      <h2 className="text-xl font-semibold mb-4">Check Available Parking</h2>
      
      {loading && (
        <div className="mb-4 text-blue-400">
          <p>Finding available dates...</p>
        </div>
      )}

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="bg-gray-900 text-white border border-gray-700 rounded px-4 py-2 w-full"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Select Time:</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded px-4 py-2 w-full"
            disabled={loading}
          >
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>
      </div>
      {availableDates.length === 0 && !loading && (
        <p className="text-sm text-gray-400 mt-1">No available dates found in the next 30 days.</p>
      )}


      {availableDates.length > 0 && !loading && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Quick Pick - Available Dates:</h3>
          <div className="flex flex-wrap gap-2">
            {availableDates.slice(0, 10).map((availableDate) => (
              <button
                key={availableDate}
                onClick={() => setDate(availableDate)}
                className={`px-3 py-2 rounded text-sm ${
                  date === availableDate
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {new Date(availableDate + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </button>
            ))}
          </div>
          {availableDates.length > 10 && (
            <p className="text-sm text-gray-400 mt-2">
              And {availableDates.length - 10} more available dates...
            </p>
          )}
        </div>
      )}

      {spots.length > 0 ? (
        <ul className="space-y-2">
          {spots.map((spot) => (
            <li key={spot.id} className="bg-black/40 p-4 rounded flex justify-between">
              <span>{spot.label || `Spot #${spot.id}`}</span>
              <button 
              onClick={() => handleReserve(spot.id)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                Reserve
              </button>
            </li>
          ))}
        </ul>
      ) : (
        date && <p className="text-gray-400">No spots available on this date.</p>
      )}
    </div>
  );
};

export default AvailableSpots;
