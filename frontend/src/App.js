import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import ResultCard from "./components/ResultCard";
import Loader from "./components/Loader";
import { analyzeCity } from "./services/api";
function App() {
  const [data, setData] = useState([]); // multiple results
  const [loading, setLoading] = useState(false);
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="text-center mt-10 px-4">
        <h1 className="text-4xl font-bold">
          🌤️ Smart Travel AI
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Get AI-powered travel insights for multiple cities
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <SearchBox onSearch={handleSearch} />
      </div>
      <div className="mt-10 px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <Loader />
        ) : (
          data.map((item, index) => (
            <ResultCard key={index} data={item} />
          ))
        )}
      </div>
    </div>
  );
}
export default App;