import React, { useState } from "react";
function SearchBox({ onSearch }) {
  const [input, setInput] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const cities = [
  "Hyderabad",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Surat",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Howrah",
  "Coimbatore",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Guwahati",
  "Chandigarh",
  "Solapur",
  "Hubli",
  "Mysore",
  "Tiruchirappalli",
  "Bareilly",
  "Aligarh",
  "Tiruppur",
  "Moradabad",
  "Jalandhar",
  "Bhubaneswar",
  "Salem",
  "Warangal",
  "Guntur",
  "Noida",
  "Dehradun"
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
  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedCities.map((city, index) => (
            <div
              key={index}
              className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {city}
              <span
                className="cursor-pointer"
                onClick={() => removeCity(city)}
              >
                ✕
              </span>
            </div>
          ))}
        </div>
        <input
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          placeholder="Search and select cities..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <div className="bg-gray-800 mt-2 rounded-lg max-h-40 overflow-y-auto">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => addCity(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
        onClick={handleSearch}
      >
        Analyze
      </button>
    </div>
  );
}
export default SearchBox;