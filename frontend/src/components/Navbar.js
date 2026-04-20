import React from "react";
function Navbar() {
  return (
    <div className="w-full px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/5 border-b border-white/10 shadow-sm">
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        🌤️ <span>Smart Travel AI</span>
      </div>
      <div className="text-sm text-gray-300 hidden sm:block">
        AI Weather Assistant
      </div>
    </div>
  );
}
export default Navbar;