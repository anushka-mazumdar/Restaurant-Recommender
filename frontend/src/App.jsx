import { useState } from 'react';
import Grainient from './components/Grainient';
import HeroSection from './components/HeroSection';
import SearchPanel from './components/SearchPanel';
import ResultsSection from './components/ResultsSection';
import LoadingCard from './components/LoadingCard';
import EmptyState from './components/EmptyState';

function App() {
  const [formData, setFormData] = useState({
    location: 'Noida',
    cuisine: '',
    cost: 2000
  });

  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('all');
  const [resultLimit, setResultLimit] = useState('all');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations(null);

    try {
      const res = await fetch('/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Fetch error:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <Grainient
          color1="#fefefe"
          color2="#eee474"
          color3="#d2cb62"
          timeSpeed={ 1.85}
          grainAmount={0.08}
          contrast={1.4}
        />

        {/* Soft Editorial Light Overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Gradient Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-300/20 blur-[140px]" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-[140px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-20 flex flex-col items-center">

        {/* Hero + Search */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">

          <div className="w-full max-w-6xl">

            <HeroSection />

            <div className="mt-12">
              <SearchPanel
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>

            {/* Results directly below search bar */}
            {(loading || recommendations !== null) && (
              <div className="mt-14">
                <ResultsSection
                  loading={loading}
                  recommendations={recommendations}
                  ratingFilter={ratingFilter}
                  setRatingFilter={setRatingFilter}
                  resultLimit={resultLimit}
                  setResultLimit={setResultLimit}
                />
              </div>
            )}

          </div>

        </section>

      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 pb-10 text-center">
        <p className="text-[11px] font-medium text-black/40 tracking-[0.2em] uppercase">
          ML Powered Restaurant Discovery
        </p>
      </footer>

    </div>
  );
}

export default App;