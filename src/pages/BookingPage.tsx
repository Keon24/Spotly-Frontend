import AvailableSpots from '../components/Dashboard/AvailableSpots';

export default function BookingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book a Parking Spot</h1>
      <AvailableSpots />
    </div>
  );
}