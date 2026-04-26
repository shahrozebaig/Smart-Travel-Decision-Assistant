import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import ResultCard from "./components/ResultCard";
import Loader from "./components/Loader";
import LandingPage from "./pages/LandingPage";
import { analyzeCity } from "./services/api";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshingCity, setRefreshingCity] = useState(null);

  const handleSearch = async (input) => {
    if (!input) return;
    setLoading(true);
    setData([]);
    try {
      const cities = input.split(",").map((c) => c.trim());
      const results = await Promise.all(
        cities.map((city) => analyzeCity(city))
      );
      setData(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleRefresh = async (city, index) => {
    setRefreshingCity(index);
    try {
      const result = await analyzeCity(city);
      const updated = [...data];
      updated[index] = result;
      setData(updated);
    } catch (err) {
      console.error(err);
    }
    setRefreshingCity(null);
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-[#020617]"
        style={{
          backgroundImage: 'url("/background.jpeg")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          opacity: 0.3
        }}
      ></div>

      {/* Subtle overlay for minimalism */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#020617]/90 via-[#020617]/40 to-[#020617]/90"></div>

      <div className="relative z-10">
        <Navbar onBack={() => setShowLanding(true)} />

      
      <main className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6 text-gradient">
              Travel Intelligence
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed font-medium">
              Real-time environmental analysis and AI-driven recommendations 
              for your global destinations.
            </p>
          </div>
        </header>

        <section className="mb-32 relative z-50">
          <SearchBox onSearch={handleSearch} />
        </section>


        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <ResultCard
                  data={item}
                  onRefresh={handleRefresh}
                  isRefreshing={refreshingCity === index}
                  index={index}
                />
              </div>
            ))}
          </section>
        )}
      </main>
      </div>
    </div>
  );
}


export default App;