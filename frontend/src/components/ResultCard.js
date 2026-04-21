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
    switch (vehicle) {
      case "CAR": return "🚗";
      case "BIKE": return "🏍️";
      case "WALK": return "🚶";
      case "PUBLIC_TRANSPORT": return "🚌";
      default: return "🚘";
    }
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
    <div className="glass-panel rounded-[2rem] p-8 relative group transition-all hover:shadow-brand-500/5">
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
      <div className="grid grid-cols-2 gap-3 mb-8">
        <WeatherMetric icon="🌡️" label="Temp" value={`${weather.temperature}°C`} />
        <WeatherMetric icon="💧" label="Humidity" value={`${weather.humidity}%`} />
        <WeatherMetric icon="🌬️" label="Wind" value={`${weather.wind_speed}km/h`} />
        <WeatherMetric icon="☁️" label="Condition" value={weather.condition} />
      </div>
      <div className="space-y-6">
        <div className="relative p-6 rounded-3xl bg-brand-500/5 border border-brand-500/10">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-brand-600 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
            AI Recommendation
          </div>
          <div className="flex items-center gap-4 pt-1">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${isGood ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
              {isGood ? "✓" : "!"}
            </div>
            <div>
              <div className={`font-bold text-lg ${isGood ? "text-emerald-400" : "text-rose-400"}`}>
                {isGood ? "Travel Recommended" : "Caution Advised"}
              </div>
              <div className="text-slate-400 text-xs mt-1">
                {Array.isArray(ai.reason) ? ai.reason[0] : ai.reason}
              </div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl">
              {getVehicleIcon(ai.vehicle)}
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-tighter">Optimal Mode</div>
              <div className="font-bold text-xl">{ai.vehicle.replace("_", " ")}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-brand-400 font-bold mb-1 uppercase">Comfort Level</div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className={`w-2.5 h-1 rounded-full ${s <= 4 ? "bg-brand-500" : "bg-white/10"}`}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <div className="text-[10px] text-slate-500 font-bold mb-3 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            AI Reasoning
          </div>
          <ul className="space-y-2">
            {(Array.isArray(ai.reason) ? ai.reason : [ai.reason]).map((r, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-brand-500 mt-0.5">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <div className="text-[10px] text-slate-500 font-bold mb-3 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Key Recommendations
          </div>
          <ul className="space-y-2">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
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
function WeatherMetric({ icon, label, value }) {
  return (
    <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
      <div className="text-xl">{icon}</div>
      <div>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{label}</div>
        <div className="text-sm font-bold text-slate-200 uppercase">{value}</div>
      </div>
    </div>
  );
}
export default ResultCard;