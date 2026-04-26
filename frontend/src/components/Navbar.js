import React from "react";

function Navbar({ onBack, onGetStarted }) {
  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <div className="flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-full border border-white/[0.08] bg-[#020617]/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-all duration-500">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center ring-1 ring-white/10">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-bold text-base tracking-tight text-white hidden sm:block">Smart Travel AI</span>
        </div>
        
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.1] transition-all text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white border border-white/[0.05]"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Portal
            </button>
          ) : (
            <button
              onClick={onGetStarted}
              className="px-4 py-1.5 rounded-full bg-white text-[#020617] transition-all text-[11px] font-bold uppercase tracking-widest hover:bg-slate-200 active:scale-95"
            >
              Get Started
            </button>
          )}
        </div>



      </div>
    </nav>
  );
}

export default Navbar;
