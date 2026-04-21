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
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative">
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCities.map((city, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              {city}
              <button
                className="hover:text-rose-400 transition-colors"
                onClick={() => removeCity(city)}
              >
                ✕
              </button>
            </div>
          ))}
          {selectedCities.length === 0 && (
            <div className="text-slate-600 text-sm py-1.5">No cities selected</div>
          )}
        </div>
        <div className="relative">
          <input
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 outline-none text-white placeholder-slate-600 transition-all focus:border-brand-500/30"
            placeholder="Enter city names..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {(isFocused || input) && (
            <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-slate-900 border border-white/10 rounded-xl max-h-64 overflow-y-auto shadow-2xl">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 hover:bg-white/5 cursor-pointer text-slate-400 hover:text-white transition-colors"
                    onClick={() => addCity(city)}
                  >
                    {city}
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-slate-600 text-sm italic text-center">
                  Search results will appear here
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        className="w-full mt-6 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98]"
        onClick={handleSearch}
      >
        GENERATE TRAVEL ANALYSIS
      </button>
    </div>
  );
}
export default SearchBox;