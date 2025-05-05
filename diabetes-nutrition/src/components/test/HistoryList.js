"use client";

export default function HistoryList({ history }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Calculation History</h3>
      <ul className="space-y-4">
        {history.map((item, index) => (
          <li
            key={index}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <p className="font-medium text-lg">{item.name}</p>
            <p>Amount: {item.grams} grams</p>
            <p>Carbs: {item.carbs} grams</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
