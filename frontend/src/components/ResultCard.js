import React, { useState, useEffect } from "react";
function ResultCard({ data }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  if (!data) return null;
  const weather = data.data.weather;
  const ai = data.data.ai_decision;
  const isGood = ai.decision === "YES";
  const getVehicleIcon = (vehicle) => {
    switch (vehicle) {
      case "CAR":
        return "🚗";
      case "BIKE":
        return "🏍️";
      case "WALK":
        return "🚶";
      case "PUBLIC_TRANSPORT":
        return "🚌";
      default:
        return "🚘";
    }
  };
  const getComfortScore = () => {
    let score = 100;
    if (weather.temperature > 35) score -= 40;
    else if (weather.temperature > 30) score -= 25;
    if (weather.humidity > 70) score -= 15;
    if (weather.wind_speed > 10) score -= 10;
    if (weather.condition.toLowerCase().includes("rain")) score -= 20;
    if (weather.condition.toLowerCase().includes("haze")) score -= 15;
    return Math.max(score, 10);
  };
  const score = getComfortScore();
  const alerts = [
    weather.temperature > 35 ? "🔥 Heat Alert: Very high temperature" : null,
    weather.condition.toLowerCase().includes("rain") ? "🌧 Rain Alert: Carry protection" : null,
    weather.condition.toLowerCase().includes("haze") ? "🌫 Visibility Alert: Low visibility" : null,
  ].filter(Boolean);
  const risks = [
    weather.temperature > 32 ? "🌡 High Temperature" : null,
    weather.humidity > 70 ? "💧 High Humidity" : null,
    weather.wind_speed > 10 ? "🌬 Strong Wind" : null,
    weather.condition.toLowerCase().includes("haze") ? "🌫 Low Visibility" : null,
  ].filter(Boolean);
  const getBestTime = () => {
    if (weather.temperature > 32) {
      return "After 6 PM (cooler conditions)";
    }
    if (weather.condition.toLowerCase().includes("rain")) {
      return "Wait until rain stops";
    }
    return "Anytime is fine";
  };
  const trend = [
    { time: "Morning", temp: weather.temperature - 3 },
    { time: "Afternoon", temp: weather.temperature },
    { time: "Evening", temp: weather.temperature - 2 },
  ];
  const recommendations = [
    !isGood ? "Avoid going out during peak hours" : "Weather is suitable for travel",
    weather.temperature > 32 ? "Stay hydrated and avoid heat exposure" : null,
    ai.vehicle === "CAR" ? "Prefer AC travel for comfort" : null,
    ai.vehicle === "BIKE" ? "Wear protective gear while riding" : null,
    ai.vehicle === "WALK" ? "Good for short outdoor activity" : null,
  ].filter(Boolean);
  const vehicleReason = {
    CAR: "Best for comfort and protection from heat or bad weather.",
    BIKE: "Good for short and pleasant rides in safe weather.",
    WALK: "Ideal for short distances in comfortable conditions.",
    PUBLIC_TRANSPORT: "Cost-effective and safe option for longer travel.",
  };
  return (
    <div className="mt-10 max-w-md mx-auto px-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6 text-white">
        <h2 className="text-2xl font-bold text-center">
          📍 {data.data.city}
        </h2>
        <div className="text-center mt-2 text-xs text-gray-400">
          ⏱ {currentTime.toLocaleTimeString()} • Updated just now
        </div>
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-400">Comfort Score</p>
          <p className="text-3xl font-bold">{score}/100</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl text-sm">
          <p>🌡 {weather.temperature}°C</p>
          <p>💧 {weather.humidity}%</p>
          <p>🌬 {weather.wind_speed} km/h</p>
          <p>☁ {weather.condition}</p>
        </div>
        <div className="mt-5 bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">📈 Temperature Trend</p>
          <div className="flex justify-between text-xs">
            {trend.map((t, i) => (
              <div key={i} className="text-center">
                <p>{t.time}</p>
                <p className="font-bold">{t.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <div
            className={`inline-block px-5 py-2 rounded-full text-sm font-semibold ${
              isGood
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {isGood ? "✅ Good Conditions" : "❌ Avoid Going Out"}
          </div>
        </div>
        {alerts.length > 0 && (
          <div className="mt-5 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
            <p className="text-sm text-red-400 mb-1">🚨 Alerts</p>
            {alerts.map((a, i) => (
              <p key={i} className="text-xs text-red-300">
                {a}
              </p>
            ))}
          </div>
        )}
        {risks.length > 0 && (
          <div className="mt-5">
            <p className="text-sm text-gray-400 mb-2">Risk Factors</p>
            <div className="flex flex-wrap gap-2">
              {risks.map((r, i) => (
                <span key={i} className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-5 bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400 mb-1">💡 AI Insight</p>
          <p className="text-sm text-gray-300">{ai.reason}</p>
        </div>
        <div className="mt-5 bg-green-500/10 border border-green-500/20 p-3 rounded-xl text-center">
          <p className="text-sm text-green-400">⏰ Best Time to Go Out</p>
          <p className="text-sm text-green-300 mt-1">
            {getBestTime()}
          </p>
        </div>
        <div className="mt-5 bg-gradient-to-r from-blue-600/20 to-blue-400/10 p-4 rounded-xl text-center border border-blue-500/20">
          <p className="text-sm text-gray-300">Recommended Vehicle</p>
          <p className="text-2xl font-bold mt-1">
            {getVehicleIcon(ai.vehicle)} {ai.vehicle.replace("_", " ")}
          </p>
          <p className="text-xs text-gray-300 mt-2">
            {vehicleReason[ai.vehicle] || ""}
          </p>
        </div>
        <div className="mt-5">
          <p className="text-sm text-gray-400 mb-2">📌 What You Should Do</p>
          <ul className="text-sm text-gray-300 space-y-1">
            {recommendations.map((rec, i) => (
              <li key={i}>• {rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ResultCard;