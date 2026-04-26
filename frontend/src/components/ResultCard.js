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
    if (v.includes("BIKE")) return <BikeIcon />;
    if (v.includes("WALK")) return <WalkIcon />;
    if (v.includes("CAR")) return <CarIcon />;
    if (v.includes("PUBLIC")) return <BusIcon />;
    return <CarIcon />;
  };

  const recommendations = [
    !isGood ? "Avoid outdoor activities during peak heat hours" : "Conditions are optimal for travel",
    weather.temperature > 32 ? "Maintain high hydration levels" : null,
    ai.vehicle === "CAR" ? "Climate-controlled transport advised" : null,
    ai.vehicle === "BIKE" ? "Wear appropriate safety equipment" : null,
    ai.vehicle === "WALK" ? "Ideal for light pedestrian travel" : null,
  ].filter(Boolean);

  return (
    <div className="glass-card rounded-[2rem] p-8 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 block">Destination</span>
          <h2 className="text-3xl font-display font-bold tracking-tight text-white">{data.data.city}</h2>
        </div>
        <button
          onClick={() => onRefresh(data.data.city, index)}
          className={`p-3 rounded-full bg-white/[0.03] hover:bg-white/[0.1] border border-white/5 transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <RefreshIcon className={isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-700"} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <MetricBox label="Temp" value={`${weather.temperature}°C`} icon={<TempIcon />} />
        <MetricBox label="Humidity" value={`${weather.humidity}%`} icon={<HumidityIcon />} />
        <MetricBox label="Wind" value={`${weather.wind_speed} km/h`} icon={<WindIcon />} />
        <MetricBox label="Condition" value={weather.condition} icon={<CloudIcon />} />
      </div>

      <div className="flex-grow space-y-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center gap-2 mb-3">
            <div className={`h-1.5 w-1.5 rounded-full ${isGood ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`}></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Intelligence Report</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {Array.isArray(ai.reason) ? ai.reason[0] : ai.reason}
          </p>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-white/[0.05]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-400">
              {getVehicleIcon(ai.vehicle)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Recommended</span>
              <span className="text-sm font-bold text-white uppercase tracking-tight">{ai.vehicle.replace("_", " ")}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${isGood ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-rose-500/20 text-rose-400 bg-rose-500/5'}`}>
            {isGood ? 'Safe' : 'Caution'}
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Logistics Advisory</span>
          <ul className="space-y-2">
            {recommendations.slice(0, 3).map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
                <div className="mt-1.5 h-1 w-1 rounded-full bg-slate-600 shrink-0"></div>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-white/[0.03] flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase tracking-widest">
        <span>System Ready</span>
        <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      </div>
    </div>
  );
}

function MetricBox({ label, value, icon }) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] flex flex-col gap-2">
      <div className="text-slate-500">{icon}</div>
      <div>
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">{label}</span>
        <span className="text-xs font-bold text-slate-200 uppercase truncate block">{value}</span>
      </div>
    </div>
  );
}

// Minimalist Icons
const RefreshIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"></path>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
  </svg>
);

const TempIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
  </svg>
);

const HumidityIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
  </svg>
);

const WindIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
  </svg>
);

const CloudIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19h2a4.5 4.5 0 0 0 0-9 4.48 4.48 0 0 0-3.3 1.5A7 7 0 1 0 5 15.5A4.5 4.5 0 0 0 9.5 20h8z"></path>
  </svg>
);


const BikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="3.5"></circle>
    <circle cx="18.5" cy="17.5" r="3.5"></circle>
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"></path>
  </svg>
);

const WalkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 20-3-4 1.1-4.4c.1-.4-.1-.8-.5-1L12 9l2-3"></path>
    <circle cx="15" cy="4" r="1"></circle>
    <path d="m7 20 2-5 3-2-3-3 1-3"></path>
  </svg>
);

const CarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
    <circle cx="7" cy="17" r="2"></circle>
    <path d="M9 17h6"></path>
    <circle cx="17" cy="17" r="2"></circle>
  </svg>
);

const BusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="15" rx="2"></rect>
    <path d="M4 11h16"></path>
    <path d="M8 15h.01"></path>
    <path d="M16 15h.01"></path>
    <path d="M6 18v2"></path>
    <path d="M18 18v2"></path>
  </svg>
);

export default ResultCard;