import React from 'react';

const EmptyState = () => {
  return (
    <div
      className="
        glass
        rounded-[32px]
        p-10
        text-center
        max-w-2xl
        mx-auto
      "
    >
      <div className="mb-6 text-5xl">
        🍽️
      </div>

      <h3
        className="
          text-3xl
          font-bold
          text-slate-900
          mb-4
        "
      >
        No restaurants found
      </h3>

      <p
        className="
          text-slate-500
          leading-relaxed
          max-w-md
          mx-auto
        "
      >
        We couldn't find any restaurants matching your
        selected cuisine, location, and budget.
      </p>

      <div className="glass-divider my-6" />

      <p
        className="
          text-sm
          text-slate-400
          font-medium
        "
      >
        Try another cuisine or increase your budget.
      </p>
    </div>
  );
};

export default EmptyState;