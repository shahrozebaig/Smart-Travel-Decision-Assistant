import React from "react";
function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center glass-panel backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20">
            <span className="text-lg">🌤️</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Smart Travel AI</h1>
        </div>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10 pt-20 pb-32">
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] max-w-4xl tracking-tighter">
          Make Smarter Travel <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
            Decisions with AI
          </span>
        </h1>
        <p className="text-slate-400 mt-8 text-lg md:text-xl max-w-2xl leading-relaxed">
          The ultimate companion for modern travelers. Get real-time weather insights,
          transportation recommendations, and data-driven travel advice.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onStart}
            className="btn-primary flex items-center justify-center gap-2 text-lg px-10"
          >
            Get Started Free
          </button>
        </div>
      </main>
      <section className="px-6 pb-32 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon="🌦"
            title="Real-time Weather"
            desc="Hyper-local forecasts with up-to-the-minute weather data."
          />
          <FeatureCard
            icon="🤖"
            title="AI Advice"
            desc="Smart recommendations based on current environmental conditions."
          />
          <FeatureCard
            icon="🚗"
            title="Optimal Transport"
            desc="Choose the best way to travel based on safety and comfort."
          />
          <FeatureCard
            icon="⚡"
            title="Instant Results"
            desc="Get detailed travel analysis in milliseconds."
          />
        </div>
      </section>
    </div>

  );
}
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-card p-8 rounded-3xl group">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
export default LandingPage;