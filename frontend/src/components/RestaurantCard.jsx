import React from 'react';

const getRatingStyle = (rating) => {
  const value = parseFloat(rating);

  if (value >= 4.0) {
    return {
      background: '#e8f7ef',
      color: '#15803d',
      border: '#bbf7d0',
    };
  }

  if (value >= 3.0) {
    return {
      background: '#fef7e6',
      color: '#b45309',
      border: '#fde68a',
    };
  }

  return {
    background: '#fdecec',
    color: '#b91c1c',
    border: '#fecaca',
  };
};

const RestaurantCard = ({ res, index = 0 }) => {
  const rating = res['Aggregate rating'];
  const ratingStyle = getRatingStyle(rating);

  const cuisines = (res['Cuisines'] || '')
    .split(',')
    .map((c) => c.trim())
    .slice(0, 3);

  return (
    <div
      className="
        result-card
        glass
        rounded-[32px]
        p-7
        card-hover
        relative
        overflow-hidden
      "
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Soft top highlight */}
      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-20
          opacity-40
          pointer-events-none
        "
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.25), transparent)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4">

        <div className="flex-1">

          <p
            className="
              uppercase
              tracking-[0.18em]
              text-[10px]
              font-semibold
              text-slate-400
              mb-2
            "
          >
            Restaurant
          </p>

          <h3
            className="
              text-2xl
              font-bold
              text-slate-900
              leading-tight
            "
          >
            {res['Restaurant Name']}
          </h3>

        </div>

        <div
          className="
            px-3
            py-2
            rounded-full
            text-sm
            font-semibold
            border
            flex
            items-center
            gap-2
          "
          style={{
            background: ratingStyle.background,
            color: ratingStyle.color,
            borderColor: ratingStyle.border,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: ratingStyle.color,
            }}
          />

          {rating}
        </div>

      </div>

      {/* Cuisine Tags */}
      <div className="mt-6 flex flex-wrap gap-2">

        {cuisines.map((cuisine) => (
          <span
            key={cuisine}
            className="
              px-3
              py-1.5
              rounded-full
              text-xs
              font-medium
              bg-white/50
              text-slate-600
              border
              border-white/60
            "
          >
            {cuisine}
          </span>
        ))}

      </div>

      {/* Divider */}
      <div className="glass-divider my-6" />

      {/* Footer */}
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400 font-semibold">
            Average Cost
          </p>

          <p className="text-sm text-slate-500 mt-1">
            For two people
          </p>
        </div>

        <div
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          ₹{res['Average Cost for two']}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;