import React from "react";
function Navbar({ onBack }) {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between glass-panel sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
          <span className="text-xl">🌤️</span>
        </div>
        <span className="font-bold text-xl tracking-tight">Smart Travel AI</span>
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 transition-colors text-sm font-medium border border-white/5"
        >
          ← Back to Home
        </button>
      )}
    </nav>
  );
}
export default Navbar;