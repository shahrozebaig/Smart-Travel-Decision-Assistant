import React from "react";
function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-20 w-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-brand-500 rounded-full animate-spin"></div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight text-white mb-2">Fetching Analysis...</h3>
        <p className="text-slate-500 text-sm italic">Getting real-time travel insights</p>
      </div>
    </div>
  );
}
export default Loader;