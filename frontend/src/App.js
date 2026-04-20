import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import ResultCard from "./components/ResultCard";
import Loader from "./components/Loader";
import { analyzeCity } from "./services/api";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bestCityIndex, setBestCityIndex] = useState(null);
  const getComfortScore = (weather) => {
    let score = 100;
    if (weather.temperature > 35) score -= 40;
    else if (weather.temperature > 30) score -= 25;
    if (weather.humidity > 70) score -= 15;
    if (weather.wind_speed > 10) score -= 10;
    if (weather.condition.toLowerCase().includes("rain")) score -= 20;
    if (weather.condition.toLowerCase().includes("haze")) score -= 15;
    return Math.max(score, 10);
  };
  const handleSearch = async (input) => {
    if (!input) return;
    setLoading(true);
    setData([]);
    setBestCityIndex(null);
    try {
      const cities = input.split(",").map((c) => c.trim());
      const results = await Promise.all(
        cities.map((city) => analyzeCity(city))
      );
      setData(results);
      let bestIndex = 0;
      let bestScore = -1;
      results.forEach((item, index) => {
        const weather = item.data.weather;
        const score = getComfortScore(weather);
        if (score > bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      });
      setBestCityIndex(bestIndex);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="text-center mt-10 px-4">
        <h1 className="text-4xl font-bold">
          🌤️ Smart Travel AI
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Compare cities & get AI-powered travel insights
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <SearchBox onSearch={handleSearch} />
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Try: Mumbai, Hyderabad, Delhi
      </p>
      <div className="mt-10 px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <Loader />
        ) : (
          data.map((item, index) => (
            <div key={index} className="relative">
              {bestCityIndex === index && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                  🏆 Best Comparison
                </div>
              )}
              <ResultCard data={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default App;