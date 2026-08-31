import React from 'react';
import { Sparkles, Shield, ArrowDown, Database, CheckCircle2, Lock, Cpu, Globe2, FileText, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onStartTransformation: () => void;
  onExploreBlockchain: () => void;
  onExplorePipeline: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTransformation,
  onExploreBlockchain,
  onExplorePipeline,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-white/10 bg-transparent">
      {/* Frosted Cosmic Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[580px] bg-gradient-to-tr from-purple-600/30 via-fuchsia-500/20 to-indigo-500/15 rounded-full blur-[140px] animate-pulse opacity-90" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[380px] bg-purple-900/25 rounded-full blur-[120px]" />
        
        {/* Subtle Vertical Grid Lines */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 sm:grid-cols-4 pointer-events-none opacity-15">
          <div className="border-l border-dashed border-white/30 h-full"></div>
          <div className="border-l border-dashed border-white/30 h-full"></div>
          <div className="border-l border-dashed border-white/30 h-full"></div>
          <div className="border-l border-dashed border-white/30 h-full hidden sm:block"></div>
        </div>
      </div>

      {/* Hero Header Top Bar Metadata */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span className="text-purple-300 font-semibold tracking-wider uppercase">NTRO PS-26154 // GOATED TECH</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-slate-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              SHA-256 Verified
            </span>
            <span className="text-slate-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Zero-Drift RAG
            </span>
            <span className="text-slate-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              Permissioned Ledger
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Hero Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Motto */}
          <div className="lg:col-span-3 space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg">
              <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
                <span className="text-white font-serif text-2xl font-bold tracking-tight block text-purple-300">W</span>
                here intelligence meets the cutting-edge and automated transformation knows no bounds!
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-2 text-slate-400 text-xs font-mono">
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-200 backdrop-blur-sm">PDF</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-200 backdrop-blur-sm">Audio</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-200 backdrop-blur-sm">OCR</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-200 backdrop-blur-sm">STIX</span>
              </div>
            </div>
          </div>

          {/* Center Column: RAZC Massive Futuristic Typography & Glowing Orb */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center relative py-6">
            
            {/* Ambient Cosmic Figure / Nebula Entity Aura */}
            <div className="relative flex flex-col items-center">
              
              {/* Massive Futuristic Logo Typography */}
              <div className="relative select-none">
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-300/90 drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                  RAZC
                </h1>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>

              {/* Sub-label banner */}
              <p className="mt-4 text-xs sm:text-sm uppercase font-mono tracking-[0.3em] text-purple-300 font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                National Technical Research Organisation
              </p>
              <p className="text-slate-300 text-sm max-w-md mt-3 font-normal leading-relaxed">
                Gen AI Platform for Source-Grounded Multimodal Content Transformation & Blockchain Provenance
              </p>

              {/* Center Glowing Action Trigger Orb */}
              <div className="mt-8 relative group">
                {/* Layered Pulsing Rings */}
                <div className="absolute inset-0 -m-4 rounded-full bg-purple-500/25 blur-2xl group-hover:bg-purple-500/45 transition-all animate-pulse"></div>
                <div className="absolute inset-0 -m-1.5 rounded-full border border-purple-400/40 animate-ping opacity-40"></div>
                
                <button
                  id="hero-center-transform-orb"
                  onClick={onStartTransformation}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-white/20 via-purple-900/60 to-[#120a2a]/90 backdrop-blur-2xl border border-white/30 hover:border-purple-300 flex flex-col items-center justify-center text-center p-3 glow-purple group-hover:scale-105 transition-all cursor-pointer shadow-[0_8px_32px_rgba(147,51,234,0.4)]"
                >
                  <Sparkles className="w-5 h-5 text-purple-300 mb-1 animate-bounce" />
                  <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-wider">
                    Transform
                  </span>
                  <span className="text-[9px] font-mono text-purple-200 uppercase tracking-tight mt-0.5">
                    Source Now
                  </span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Key Highlights & Quick CTAs */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between space-y-6 text-left lg:text-right">
            
            <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg w-full max-w-xs">
              <div className="text-xs font-mono text-purple-300 uppercase tracking-wider font-semibold">5 Parallel Artefacts</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Exec Briefs, Threat Advisories, Social/X Threads, Slide Decks, and Infographic metadata created concurrently.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl max-w-xs w-full space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>Tamper-Evident</span>
                <span className="text-emerald-400 font-bold">100% Immutable</span>
              </div>
              <div className="w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full w-[98%]"></div>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>RAG Grounding Score</span>
                <span className="text-purple-300 font-mono font-medium">98.6% Veracity</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div 
              onClick={onExplorePipeline}
              className="flex items-center space-x-2 text-xs font-mono text-slate-300 hover:text-white cursor-pointer group pt-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md"
            >
              <span>Scroll to Explore</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-400 group-hover:translate-y-1 transition-transform" />
            </div>

          </div>

        </div>
      </div>

      {/* Hero Bottom Bar - Quick Actions Banner */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10 z-10 backdrop-blur-md bg-white/[0.02]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <span className="font-semibold text-slate-200">Design Principle:</span>
            <span className="font-mono text-purple-300">Normalize once → route → generate → validate → verify</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onStartTransformation}
              className="text-xs px-4 py-1.5 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-400/40 backdrop-blur-md flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg shadow-purple-900/30"
            >
              <span>Launch Studio</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={onExploreBlockchain}
              className="text-xs px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/15 backdrop-blur-md flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
            >
              <Database className="w-3 h-3 text-indigo-400" />
              <span>Explore Ledger</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
