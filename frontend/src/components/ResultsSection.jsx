import React from 'react';
import RestaurantCard from './RestaurantCard';
import LoadingCard from './LoadingCard';
import EmptyState from './EmptyState';

const ResultsSection = ({
  loading,
  recommendations,
  ratingFilter,
  setRatingFilter,
  resultLimit,
  setResultLimit,
}) => {
  const hasResults =
    recommendations &&
    recommendations.length > 0;

  const isEmpty =
    recommendations &&
    recommendations.length === 0;

  if (!loading && !recommendations) {
    return null;
  }

  let filteredResults = recommendations
    ? [...recommendations]
    : [];

  // Rating Filter
  if (ratingFilter !== 'all') {
    filteredResults = filteredResults.filter(
      (restaurant) =>
        parseFloat(
          restaurant['Aggregate rating']
        ) >= parseFloat(ratingFilter)
    );
  }

  // Top Results Filter
  if (
    resultLimit !== 'all' &&
    !isNaN(Number(resultLimit))
  ) {
    filteredResults = filteredResults.slice(
      0,
      Number(resultLimit)
    );
  }

  return (
    <section className="mt-16 md:mt-20 max-w-6xl mx-auto px-4 fade-up">

      {/* Section Header */}
      {(loading || hasResults) && (
        <div className="text-center mb-10">

          <p
            className="
              uppercase
              tracking-[0.25em]
              text-[11px]
              font-semibold
              text-slate-500
              mb-3
            "
          >
            AI Recommendation Results
          </p>

          <h2
            className="editorial-title"
            style={{
              fontSize: 'clamp(32px, 4vw, 54px)',
            }}
          >
            {loading
              ? 'Analyzing your preferences...'
              : 'Recommended for you'}
          </h2>

          {hasResults && (
            <>
              <div className="mt-4 flex justify-center">
                <div
                  className="
                    glass
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                  "
                >
                  {filteredResults.length} restaurants found
                </div>
              </div>

              {/* Filters */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">

                {/* Rating Filter */}
                <select
                  value={ratingFilter}
                  onChange={(e) =>
                    setRatingFilter(e.target.value)
                  }
                  className="
                    glass
                    rounded-full
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-slate-700
                    border-none
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="all">
                    Any Rating
                  </option>

                  <option value="4.5">
                    4.5+ Rating
                  </option>

                  <option value="4">
                    4+ Rating
                  </option>

                  <option value="3">
                    3+ Rating
                  </option>

                  <option value="2">
                    2+ Rating
                  </option>

                  <option value="1">
                    1+ Rating
                  </option>
                </select>

                {/* Result Count Filter */}
                <select
                  value={resultLimit}
                  onChange={(e) =>
                    setResultLimit(e.target.value)
                  }
                  className="
                    glass
                    rounded-full
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-slate-700
                    border-none
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="5">
                    Top 5 Restaurants
                  </option>

                  <option value="10">
                    Top 10 Restaurants
                  </option>

                  <option value="15">
                    Top 15 Restaurants
                  </option>

                  <option value="all">
                    All Results
                  </option>
                </select>

              </div>
            </>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : isEmpty ? (
        <div className="max-w-2xl mx-auto">
          <EmptyState />
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {filteredResults.map((res, index) => (
            <RestaurantCard
              key={index}
              res={res}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResultsSection;