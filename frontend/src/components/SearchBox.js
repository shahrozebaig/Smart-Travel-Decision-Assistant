import React, { useState, useRef, useEffect } from "react";
function SearchBox({ onSearch }) {
  const [input, setInput] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const cities = [
    "Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune",
    "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore",
    "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
    "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi",
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad",
    "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada",
    "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur",
    "Hubli", "Mysore", "Tiruchirappalli", "Bareilly", "Aligarh", "Tiruppur",
    "Moradabad", "Jalandhar", "Bhubaneswar", "Salem", "Warangal", "Guntur",
    "Noida", "Dehradun"
  ];
  const filteredCities = cities.filter(
    (c) =>
      c.toLowerCase().includes(input.toLowerCase()) &&
      !selectedCities.includes(c)
  );
  const addCity = (city) => {
    setSelectedCities([...selectedCities, city]);
    setInput("");
  };
  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((c) => c !== city));
  };
  const handleSearch = () => {
    if (selectedCities.length === 0) {
      alert("Select at least one city");
      return;
    }
    onSearch(selectedCities.join(","));
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-4" ref={dropdownRef}>
      <div className="glass-panel rounded-3xl p-6 shadow-2xl relative">
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCities.map((city, index) => (
            <div
              key={index}
              className="bg-brand-500/10 border border-brand-500/30 text-brand-400 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 group hover:bg-brand-500/20 transition-all cursor-default"
            >
              {city}
              <button
                className="hover:text-white transition-colors"
                onClick={() => removeCity(city)}
              >
                ✕
              </button>
            </div>
          ))}
          {selectedCities.length === 0 && (
            <div className="text-slate-500 text-sm py-1.5 italic">No cities selected...</div>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
            🔍
          </div>
          <input
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none text-white placeholder-slate-500 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 transition-all"
            placeholder="Search cities (e.g., Mumbai, Delhi)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {(isFocused || input) && (
            <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-slate-900/95 backdrop-blur-xl rounded-2xl max-h-64 overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 scrollbar-thin scrollbar-thumb-white/10">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 hover:bg-white/5 cursor-pointer text-slate-300 hover:text-brand-400 transition-colors flex justify-between items-center group"
                    onClick={() => addCity(city)}
                  >
                    <span className="font-medium">{city}</span>
                    <span className="text-[10px] bg-brand-500/10 px-2 py-0.5 rounded text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-widest">Select +</span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-slate-500 text-sm italic text-center">
                  City not found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        className="btn-primary w-full mt-6 py-4 text-lg"
        onClick={handleSearch}
      >
        Get Travel Analysis ⚡
      </button>
    </div>
  );
}
export default SearchBox;