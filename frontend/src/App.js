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
      alert("Error fetching data");
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
      alert("Error refreshing data");
    }
    setRefreshingCity(null);
  };
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-600/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <Navbar onBack={() => setShowLanding(true)} />
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Travel Planning Dashboard
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Personalized weather insights and transport recommendations for your upcoming journey.
          </p>
        </header>
        <section className="mb-20">
          <SearchBox onSearch={handleSearch} />
        </section>
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-20">
              <Loader />
            </div>
          ) : (
            data.map((item, index) => (
              <ResultCard
                key={index}
                data={item}
                onRefresh={handleRefresh}
                isRefreshing={refreshingCity === index}
                index={index}
              />
            ))
          )}
        </section>

      </main>
    </div>
  );
}
export default App;