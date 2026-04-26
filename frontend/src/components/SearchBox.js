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
    "New York", "London", "Tokyo", "Paris", "Dubai", "Singapore", "Sydney",
    "Berlin", "Rome", "Toronto", "Bangkok", "Seoul", "Moscow", "Cape Town"
  ];

  const filteredCities = cities.filter(
    (c) =>
      c.toLowerCase().includes(input.toLowerCase()) &&
      !selectedCities.includes(c)
  );

  const addCity = (city) => {
    const cityName = typeof city === 'string' ? city.trim() : "";
    if (cityName && !selectedCities.includes(cityName)) {
      setSelectedCities([...selectedCities, cityName]);
    }
    setInput("");
  };

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((c) => c !== city));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        if (filteredCities.length > 0) {
          addCity(filteredCities[0]);
        } else {
          addCity(input.trim());
        }
      } else if (selectedCities.length > 0) {
        handleSearch();
      }
    } else if (e.key === "Backspace" && !input && selectedCities.length > 0) {
      removeCity(selectedCities[selectedCities.length - 1]);
    }
  };

  const handleSearch = () => {
    if (selectedCities.length === 0) {
      if (input.trim()) {
        onSearch(input.trim());
        return;
      }
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
    <div className="w-full max-w-lg mx-auto relative z-[60]" ref={dropdownRef}>
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.01]' : 'scale-100'} z-50`}>
        <div
          className={`glass-panel rounded-2xl p-1.5 flex flex-col gap-1 transition-all duration-300 ${isFocused ? 'border-white/20 ring-4 ring-white/5' : 'border-white/5'} bg-[#020617]/90 backdrop-blur-3xl`}
        >
          <div className="flex flex-wrap gap-1.5 px-2 pt-1.5">
            {selectedCities.map((city, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-medium text-white group animate-in fade-in zoom-in duration-300"
              >
                {city}
                <button
                  className="text-white/40 hover:text-white transition-colors"
                  onClick={() => removeCity(city)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-500 pointer-events-none">
              <SearchIcon size={16} />
            </div>
            <input
              className="w-full bg-transparent border-none px-10 py-2.5 text-white placeholder:text-slate-500 focus:ring-0 focus:outline-none text-sm"
              placeholder={selectedCities.length > 0 ? "Add more..." : "Enter destinations"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {isFocused && input && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-[100] glass-panel rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 bg-[#0a0f24] shadow-2xl border border-white/10">
              <div className="p-1.5">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-white/10 cursor-pointer text-slate-300 hover:text-white transition-colors rounded-lg flex items-center justify-between group"
                      onClick={() => addCity(city)}
                    >
                      <span className="text-xs font-medium">{city}</span>
                      <span className="text-[9px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Select</span>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-slate-300 text-xs flex items-center justify-between cursor-pointer hover:bg-white/10 rounded-lg"
                    onClick={() => addCity(input)}>
                    <span className="font-medium">Add "{input}"</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Custom</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6 relative z-10">
        <button
          className="premium-button flex items-center gap-2 group min-w-[180px] py-2.5 text-sm justify-center"
          onClick={handleSearch}
        >
          <span className="tracking-tight">Analyze Strategy</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}

function SearchIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function ArrowRightIcon({ size = 18 }) {
  return (
    <svg className="group-hover:translate-x-1 transition-transform" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}


export default SearchBox;
