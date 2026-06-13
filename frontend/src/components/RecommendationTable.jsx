import React from 'react';

/**
 * RecommendationTable — an optional tabular view of results.
 * Currently not used in App.jsx; swap RestaurantCard grid for this
 * if you prefer a table layout.
 */
const RecommendationTable = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <p className="text-center mt-10 text-slate-400">
        No restaurants found — try a different cuisine or raise the budget.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto glass-panel p-6 rounded-3xl mt-10 overflow-x-auto">
      <h2 className="text-xl font-bold text-slate-800 text-center mb-6">
        Recommended for you
      </h2>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-purple-200/60">
            <th className="p-3 text-purple-600 font-semibold">Restaurant</th>
            <th className="p-3 text-purple-600 font-semibold">Cuisine</th>
            <th className="p-3 text-purple-600 font-semibold">Rating</th>
            <th className="p-3 text-purple-600 font-semibold">Cost for two</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((res, i) => (
            <tr
              key={i}
              className="border-b border-slate-100 hover:bg-white/40 transition-colors"
            >
              <td className="p-3 font-medium text-slate-800">{res['Restaurant Name']}</td>
              <td className="p-3 text-slate-500">{res['Cuisines']}</td>
              <td className="p-3">
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                  ⭐ {res['Aggregate rating']}
                </span>
              </td>
              <td className="p-3 text-slate-700 font-medium">₹{res['Average Cost for two']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendationTable;