import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 w-full animate-in fade-in duration-1000">
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing ring */}
        <div className="absolute w-24 h-24 rounded-full border border-white/5 animate-[ping_2s_linear_infinite]"></div>
        
        {/* Rotating dash ring */}
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 animate-[spin_4s_linear_infinite]"></div>
        
        {/* Center core pulse */}
        <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse"></div>
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/80 mb-3 ml-[0.5em]">
          Synthesizing Intelligence
        </h3>
        <div className="flex items-center justify-center gap-1.5">
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-blue-500/50 animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 rounded-full bg-blue-500/50 animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 rounded-full bg-blue-500/50 animate-bounce"></span>
          </div>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Querying Global Atmospheric Data
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loader;