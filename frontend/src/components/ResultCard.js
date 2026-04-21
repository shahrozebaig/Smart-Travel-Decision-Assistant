import React, { useState, useEffect } from "react";
function ResultCard({ data, onRefresh, isRefreshing, index }) {
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
    const v = vehicle?.toUpperCase() || "";
    if (v.includes("BIKE") && v.includes("WALK")) return "🏍️/🚶";
    if (v.includes("BIKE")) return "🏍️";
    if (v.includes("WALK")) return "🚶";
    if (v.includes("CAR")) return "🚗";
    if (v.includes("PUBLIC")) return "🚌";
    return "🚘";
  };
  const getConditionEmoji = (condition) => {
    const c = condition?.toLowerCase() || "";
    if (c.includes("clear") || c.includes("sun")) return "☀️";
    if (c.includes("mostly sunny")) return "🌤️";
    if (c.includes("partly cloudy")) return "⛅";
    if (c.includes("cloud")) return "☁️";
    if (c.includes("overcast")) return "🌥️";
    if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
    if (c.includes("shower")) return "🌦️";
    if (c.includes("storm") || c.includes("thunder")) return "⛈️";
    if (c.includes("lightning")) return "⚡";
    if (c.includes("snow")) return "❄️";
    if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return "🌫️";
    if (c.includes("smoke")) return "💨";
    if (c.includes("dust") || c.includes("sand")) return "🏜️";
    if (c.includes("wind")) return "🌬️";
    if (c.includes("hot")) return "🔥";
    if (c.includes("cold")) return "🥶";
    return "🌡️";
  };
  const alerts = [
    weather.temperature > 35 ? "🔥 Heat Alert: Very high temperature" : null,
    weather.condition.toLowerCase().includes("rain") ? "🌧 Rain Alert: Carry protection" : null,
  ].filter(Boolean);
  const risks = [
    weather.temperature > 32 ? "🌡 High Temp" : null,
    weather.humidity > 70 ? "💧 Humidity" : null,
    weather.wind_speed > 10 ? "🌬 Wind" : null,
  ].filter(Boolean);
  const recommendations = [
    !isGood ? "Avoid going out during peak hours" : "Weather is suitable for travel",
    weather.temperature > 32 ? "Stay hydrated and avoid heat exposure" : null,
    ai.vehicle === "CAR" ? "Prefer AC travel for comfort" : null,
    ai.vehicle === "BIKE" ? "Wear protective gear while riding" : null,
    ai.vehicle === "WALK" ? "Good for short outdoor activity" : null,
  ].filter(Boolean);
  return (
    <div className="glass-panel rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative group transition-all hover:shadow-brand-500/5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Destination</div>
          <h2 className="text-3xl font-bold tracking-tighter">{data.data.city}</h2>
        </div>
        <button
          onClick={() => onRefresh(data.data.city, index)}
          className={`p-3 rounded-2xl bg-white/5 hover:bg-brand-500/10 transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className={`inline-block ${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}>
            🔄
          </span>
        </button>
      </div>
      <div className="text-[10px] font-mono text-slate-500 mb-8 border-b border-white/5 pb-4 flex justify-between uppercase">
        <span>Updated At</span>
        <span>{currentTime.toLocaleTimeString()}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-10">
        <WeatherMetric label="Temperature" value={`${weather.temperature}°C`} icon="🌡️" />
        <WeatherMetric label="Humidity" value={`${weather.humidity}%`} icon="💧" />
        <WeatherMetric label="Wind Speed" value={`${weather.wind_speed}km/h`} icon="🌬️" />
        <WeatherMetric label="Conditions" value={weather.condition} icon={getConditionEmoji(weather.condition)} />
      </div>
      <div className="space-y-8">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-start gap-4">
            <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${isGood ? "bg-emerald-500" : "bg-rose-500"} shadow-[0_0_10px_rgba(16,185,129,0.2)]`}></div>
            <div>
              <div className="text-sm font-bold tracking-tight mb-2 uppercase text-white/90">
                AI System Analysis
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {Array.isArray(ai.reason) ? ai.reason[0] : ai.reason}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-4 border-y border-white/5">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Recommended Mode</div>
            <div className="text-xl font-bold flex items-center gap-2">
              <span className="opacity-70">{getVehicleIcon(ai.vehicle)}</span>
              {ai.vehicle.replace("_", " ")}
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${isGood ? 'border-emerald-500/20 text-emerald-400' : 'border-rose-500/20 text-rose-400'}`}>
            {isGood ? 'Optimal' : 'Advisory'}
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Expert Recommendations</div>
          <ul className="space-y-3">
            {recommendations.slice(0, 3).map((rec, i) => (
              <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                <span className="text-base shrink-0">
                  {rec.includes("Avoid") || rec.includes("Avoid") ? "⚠️" : 
                   rec.includes("Stay hydrated") ? "🥤" :
                   rec.includes("AC") ? "❄️" :
                   rec.includes("protective") ? "🛡️" :
                   rec.includes("Good") ? "✅" : "💡"}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
        {(alerts.length > 0 || risks.length > 0) && (
          <div className="px-2">
            <div className="flex flex-wrap gap-2">
              {alerts.map((a, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                  {a.split(":")[0]}
                </span>
              ))}
              {risks.map((r, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function WeatherMetric({ label, value, icon }) {
  return (
    <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
      <div className="text-2xl opacity-80">{icon}</div>
      <div>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mb-1">{label}</div>
        <div className="text-sm font-bold text-slate-200 uppercase">{value}</div>
      </div>
    </div>
  );
}
export default ResultCard;