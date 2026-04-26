import React from "react";
import Navbar from "../components/Navbar";

function LandingPage({ onStart }) {
  const features = [

    {
      title: "Real-time Weather Intelligence",
      desc: "Stay ahead of environmental factors with hyper-local forecasts and real-time atmospheric tracking.",
    },
    {
      title: "AI-Powered Advisory",
      desc: "Advanced neural networks analyze weather patterns to provide secure and efficient travel strategies.",
    },
    {
      title: "Optimal Logistics",
      desc: "Whether walking, cycling, or driving, we determine the most efficient mode for current conditions.",
    },
    {
      title: "Instant Destination Analytics",
      desc: "Comprehensive insights into climate trends and regional conditions in a sophisticated interface.",
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden selection:bg-white/20">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-[#020617]"
        style={{
          backgroundImage: 'url("/background.jpeg")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          opacity: 0.6
        }}
      ></div>

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-transparent to-[#020617]/80"></div>
      </div>


      <Navbar onGetStarted={onStart} />



      <main className="relative pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight text-white mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Navigate with <br />
            <span className="text-gradient">Absolute Precision</span>
          </h1>
          
          <p className="text-slate-400 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 font-medium">
            The professional companion for modern explorers. Data-driven insights 
            and AI-powered logistics for every destination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <button
              onClick={onStart}
              className="premium-button min-w-[200px] flex items-center justify-center gap-2"
            >
              Enter Dashboard
              <ArrowIcon />
            </button>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-3xl p-8 hover:translate-y-[-4px] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors">
                <FeatureIcon index={idx} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-white/[0.05] text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
          © 2026 Smart Travel AI. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

function FeatureIcon({ index }) {
  const icons = [
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19h2a4.5 4.5 0 0 0 0-9 4.48 4.48 0 0 0-3.3 1.5A7 7 0 1 0 5 15.5A4.5 4.5 0 0 0 9.5 20h8z"></path></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2M12 18v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
  ];
  return icons[index] || icons[0];
}


export default LandingPage;