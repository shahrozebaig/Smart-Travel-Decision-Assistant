import React from "react";
function LandingPage({ onStart }) {
  const features = [
    {
      image: "/Weather.jpeg",
      title: "Real-time Weather Insights",
      desc: "Stay ahead of the elements with hyper-local forecasts and real-time environment tracking.",
    },
    {
      image: "/Advice.jpeg",
      title: "Smart AI Recommendations",
      desc: "Human-centric AI that analyzes weather patterns to give you the most safe and efficient travel advice.",
    },
    {
      image: "/Transport.jpeg",
      title: "Optimal Transport Modes",
      desc: "Whether it's walking, biking, or taking a car—we find the perfect mode for your specific conditions.",
    },
    {
      image: "/Results.jpeg",
      title: "Instant Analytics",
      desc: "Get deep insights into your destination's climate and trends in a beautiful, easy-to-read dashboard.",
      objectPosition: "bottom"
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden text-slate-50">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 z-0 bg-slate-950"
        style={{
          backgroundImage: 'url("/background.jpeg")',
          backgroundSize: '100% 100%',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          opacity: 0.6
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80 pointer-events-none"></div>

      {/* Glow Animations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-600/30 blur-[120px] rounded-full pointer-events-none z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-900/20 blur-[120px] rounded-full pointer-events-none z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center glass-panel backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-brand-500/20 rotate-3 transition-transform hover:rotate-0">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Smart Travel AI</h1>
        </div>
      </nav>

      <main className="relative z-20 flex flex-col items-center justify-center text-center px-6 pt-32 pb-48">
        <h1 className="text-6xl md:text-8xl font-bold leading-[1] max-w-5xl tracking-tighter text-white">
          Navigate Your World <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-indigo-600">
            With Precision AI
          </span>
        </h1>
        <p className="text-slate-400 mt-10 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium">
          The ultimate companion for modern explorers. Get data-driven insights
          and AI-powered decisions for every step of your journey.
        </p>
        <div className="mt-14 flex flex-col sm:flex-row gap-6">
          <button
            onClick={onStart}
            className="btn-primary group flex items-center justify-center gap-3 text-xl px-12 py-5 rounded-[2rem]"
          >
            Explore the Dashboard
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </main>

      <section className="relative z-20 px-6 max-w-7xl mx-auto w-full space-y-32 pb-48">
        {features.map((feature, idx) => (
          <FeatureSection
            key={idx}
            {...feature}
            isReversed={idx % 2 !== 0}
          />
        ))}
      </section>
    </div>
  );
}

function FeatureSection({ image, title, desc, isReversed, objectPosition }) {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
      <div className="flex-1 w-full">
        <div className="relative group">
          <div className="absolute -inset-4 bg-brand-500/10 rounded-[2.5rem] blur-2xl group-hover:bg-brand-500/20 transition-all duration-700"></div>
          <img
            src={image}
            alt={title}
            className="relative w-full rounded-[2rem] border border-white/10 shadow-2xl object-cover aspect-video group-hover:scale-[1.02] transition-transform duration-500"
            style={{ objectPosition: objectPosition || 'center' }}
          />
        </div>
      </div>
      <div className="flex-1 text-center md:text-left space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default LandingPage;