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
    "Noida", "Dehradun", "Darjeeling", "Shillong", "Gangtok", "Itanagar",
    "Kohima", "Imphal", "Aizawl", "Agartala", "Manali", "Shimla", "Nainital",
    "Rishikesh", "Udaipur", "Munnar", "Ooty", "Kochi", "Panaji", "Pondicherry",
    "Meghalaya", "Sikkim", "Goa", "Kerala", "Uttarakhand", "Himachal Pradesh",
    "Rajasthan", "Gujarat", "Karnataka", "Tamil Nadu", "Maharashtra",
    "Assam", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura",
    "New York", "London", "Tokyo", "Paris", "Dubai", "Singapore", "Sydney",
    "Berlin", "Rome", "Toronto", "Bangkok", "Seoul", "Moscow", "Cape Town",
    "USA", "US", "America", "UK", "Australia", "Canada", "Germany", "France", "Italy", "Japan",
    "China", "Switzerland", "New Zealand", "Thailand", "Vietnam", "Bali", "Spain",
    "Mexico", "Brazil", "South Africa", "Norway", "Sweden", "Netherlands", "Austria",
    "California", "Texas", "Florida", "New York State", "Illinois", "Washington State",
    "Georgia", "Pennsylvania", "Ohio", "Virginia", "Massachusetts", "Colorado",
    "Arizona", "Nevada", "Oregon", "Michigan", "North Carolina", "New Jersey",
    "Ontario", "Bavaria", "New South Wales", "British Columbia", "Quebec",
    "Victoria", "Tuscany", "Boston"
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
        // If there's a matching city in the filtered list, add the first one
        // Otherwise add exactly what the user typed
        if (filteredCities.length > 0) {
          addCity(filteredCities[0]);
        } else {
          addCity(input.trim());
        }
      } else if (selectedCities.length > 0) {
        handleSearch();
      }
    }
  };

  const handleSearch = () => {
    if (selectedCities.length === 0) {
      if (input.trim()) {
        onSearch(input.trim());
        return;
      }
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
        <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
          {selectedCities.map((city, index) => (
            <div
              key={index}
              className="bg-brand-500/10 border border-brand-500/20 text-brand-200 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 group animate-in fade-in zoom-in duration-300"
            >
              {city}
              <button
                className="text-brand-400 hover:text-rose-400 transition-colors"
                onClick={() => removeCity(city)}
              >
                ✕
              </button>
            </div>
          ))}
          {selectedCities.length === 0 && !input && (
            <div className="text-slate-600 text-sm py-1.5 italic">Add destinations to analyze...</div>
          )}
        </div>
        <div className="relative">
          <input
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 outline-none text-white placeholder-slate-600 transition-all focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20"
            placeholder="Type city name (e.g. Darjeeling, London)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
          />
          {isFocused && input && (
            <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-slate-900 border border-white/10 rounded-xl max-h-64 overflow-y-auto shadow-2xl backdrop-blur-xl">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 hover:bg-brand-500/10 cursor-pointer text-slate-400 hover:text-white transition-colors flex items-center justify-between group"
                    onClick={() => addCity(city)}
                  >
                    <span>{city}</span>
                    <span className="text-[10px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-slate-400 text-sm flex items-center justify-between cursor-pointer hover:bg-brand-500/10"
                  onClick={() => addCity(input)}>
                  <span>Add "{input}"</span>
                  <span className="text-[10px] text-slate-600">Custom Entry</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        className="w-full mt-6 bg-brand-600 hover:bg-brand-500 text-white font-bold py-5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2 group"
        onClick={handleSearch}
      >
        <span>GENERATE TRAVEL ANALYSIS</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>

  );
}
export default SearchBox;