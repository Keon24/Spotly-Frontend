type Spot = {
  id: number;
  name: string;
  status: string;
};

interface HorizontalCardRowProps {
  title: string;
  items: Spot[];
}

export default function HorizontalCardRow({ title, items }: HorizontalCardRowProps) {
  return (
    <section className="mb-10">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {items.map((spot) => (
          <div
            key={spot.id}
            className="min-w-[200px] bg-[#1f1f1f] text-white rounded-lg p-4 shadow-md hover:scale-105 transform transition"
          >
            <h4 className="font-semibold text-lg">{spot.name}</h4>
            <p className="text-sm text-gray-400">{spot.status}</p>
            <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 py-1 rounded">
              Reserve
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
