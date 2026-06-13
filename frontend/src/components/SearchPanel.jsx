import React, { useState, useEffect } from 'react';

const DEFAULT_CUISINES = [
  'North Indian',
  'South Indian',
  'Chinese',
  'Italian',
  'Mexican',
  'Japanese',
  'Thai',
  'Continental',
  'Mughlai',
  'Fast Food',
  'Pizza',
  'Biryani',
  'Seafood',
  'Cafe',
  'Desserts',
];

const BUDGET_MARKS = [500, 1000, 2000, 5000, 10000];

const SearchPanel = ({
  formData,
  setFormData,
  onSubmit,
  loading,
}) => {
  const [cuisines, setCuisines] = useState(DEFAULT_CUISINES);

  // Future-proof for backend cuisine endpoint
  useEffect(() => {
    const loadCuisines = async () => {
      try {
        const response = await fetch('/cuisines');

        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setCuisines(data);
        }
      } catch (err) {
        console.log('Using fallback cuisines');
      }
    };

    loadCuisines();
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 fade-up fade-up-delay-4">
      <form
        onSubmit={onSubmit}
        className="
          glass
          rounded-[32px]
          px-6
          py-5
          shadow-xl
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-stretch
            lg:items-center
            gap-4
          "
        >
          {/* Cuisine */}
          <div className="flex-1 min-w-0">
            <label
              className="
                block
                text-xs
                uppercase
                tracking-[0.18em]
                font-semibold
                text-slate-500
                mb-2
              "
            >
              🍽 Cuisine
            </label>

            <input
              list="cuisine-options"
              type="text"
              placeholder="Search cuisine..."
              value={formData.cuisine}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cuisine: e.target.value,
                })
              }
              className="
                w-full
                bg-transparent
                border-none
                outline-none
                text-slate-800
                text-base
                font-medium
                placeholder:text-slate-400
              "
            />

            <datalist id="cuisine-options">
              {cuisines.map((cuisine) => (
                <option
                  key={cuisine}
                  value={cuisine}
                />
              ))}
            </datalist>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-12 bg-black/10" />

          {/* Location */}
          <div className="relative lg:w-[180px]">
            <label
              className="
                block
                text-xs
                uppercase
                tracking-[0.18em]
                font-semibold
                text-slate-500
                mb-2
              "
            >
              📍 Location
            </label>

            <select
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              className="
                w-full
                bg-transparent
                border-none
                outline-none
                appearance-none
                cursor-pointer
                text-slate-800
                font-medium
              "
            >
              <option value="Noida">Noida</option>
              <option value="Delhi">Delhi</option>
            </select>

            <span
              className="
                absolute
                right-2
                top-[36px]
                text-slate-500
                pointer-events-none
                text-xs
              "
            >
              ▼
            </span>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-12 bg-black/10" />

          {/* Budget */}
          <div className="relative lg:w-[200px]">
            <label
              className="
                block
                text-xs
                uppercase
                tracking-[0.18em]
                font-semibold
                text-slate-500
                mb-2
              "
            >
              ₹ Budget
            </label>

            <select
              value={formData.cost}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cost: Number(e.target.value),
                })
              }
              className="
                w-full
                bg-transparent
                border-none
                outline-none
                appearance-none
                cursor-pointer
                text-slate-800
                font-medium
              "
            >
              {BUDGET_MARKS.map((budget) => (
                <option
                  key={budget}
                  value={budget}
                >
                  {budget === 10000
                    ? 'Any Budget'
                    : `Under ₹${budget}`}
                </option>
              ))}
            </select>

            <span
              className="
                absolute
                right-2
                top-[36px]
                text-slate-500
                pointer-events-none
                text-xs
              "
            >
              ▼
            </span>
          </div>

        


          {/* Divider */}
          <div className="hidden lg:block w-px h-12 bg-black/10" />

          {/* Button */}
          <div className="lg:pl-2">
            <button
              type="submit"
              disabled={loading}
              className="
                btn-explore
                px-8
                py-4
                rounded-full
                font-semibold
                whitespace-nowrap
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin" />
                  Finding...
                </span>
              ) : (
                'Recommend'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchPanel;