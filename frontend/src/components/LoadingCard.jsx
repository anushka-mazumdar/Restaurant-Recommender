import React from 'react';

const LoadingCard = ({ delay = 0 }) => {
  return (
    <div
      className="
        glass
        rounded-[32px]
        p-7
        relative
        overflow-hidden
        result-card
      "
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {/* Soft highlight */}
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
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <div className="shimmer h-4 w-20 rounded-full mb-3" />

          <div className="shimmer h-8 w-4/5 rounded-xl mb-2" />

          <div className="shimmer h-4 w-1/2 rounded-lg" />

        </div>

        <div className="shimmer h-10 w-16 rounded-full flex-shrink-0" />

      </div>

      {/* Tags */}
      <div className="mt-6 flex gap-2">

        <div className="shimmer h-8 w-20 rounded-full" />

        <div className="shimmer h-8 w-24 rounded-full" />

        <div className="shimmer h-8 w-16 rounded-full" />

      </div>

      {/* Divider */}
      <div className="glass-divider my-6" />

      {/* Footer */}
      <div className="flex justify-between items-center">

        <div>
          <div className="shimmer h-3 w-24 rounded mb-2" />
          <div className="shimmer h-4 w-16 rounded" />
        </div>

        <div className="shimmer h-10 w-24 rounded-xl" />

      </div>

      {/* Status */}
      <div className="mt-6 flex items-center gap-3">

        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[#e76f66]
            pulse-dot
          "
        />

        <span
          className="
            text-sm
            font-medium
            text-slate-500
          "
        >
          AI is analyzing restaurant preferences...
        </span>

      </div>

    </div>
  );
};

export default LoadingCard;