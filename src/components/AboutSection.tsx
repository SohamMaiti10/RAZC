import React from 'react';
import { Layers, ShieldCheck, Cpu, Terminal, Lock, FileText, Share2, Sparkles, Database, Check } from 'lucide-react';

interface AboutSectionProps {
  onOpenStudio: () => void;
  onOpenLedger: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenStudio,
  onOpenLedger,
}) => {
  return (
    <section className="relative py-24 bg-transparent border-b border-white/10 overflow-hidden">
      {/* Background radial frosted glows */}
      <div className="absolute top-1/2 left-1/4 w-[550px] h-[550px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-fuchsia-900/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Top Split Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-16">
          
          {/* Left Title */}
          <div className="md:col-span-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-none">
              Who We <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">
                Are?
              </span>
            </h2>
          </div>

          {/* Center Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              <span className="text-white font-serif text-xl font-bold text-purple-300">W</span>
              e redefine the standards of automated intelligence transformation by grounding data in absolute source truth, celebrating cryptographic integrity, and nurturing raw multimodal inputs into verified mission-ready communication artefacts.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-300">
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">National Technical Research Organisation</span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">Team Goated Tech</span>
            </div>
          </div>

          {/* Right Call to Action Capsule */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <div className="text-base font-display font-medium text-slate-200">
              Be a Part Of Something Great
            </div>
            
            {/* Frosted pill button */}
            <button
              id="about-cta-launch-studio"
              onClick={onOpenStudio}
              className="group flex items-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 rounded-full p-1.5 pr-4 transition-all shadow-xl backdrop-blur-xl cursor-pointer"
            >
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold uppercase tracking-wider group-hover:scale-95 transition-transform shadow-md">
                Launch
              </span>
              <span className="text-xs text-purple-200 font-medium ml-3 flex items-center gap-1.5">
                Studio Intake
                <span className="text-purple-300 group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </button>
          </div>

        </div>

        {/* Feature Section with Frosted Glass Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-2xl relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          
          {/* Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase leading-tight">
                WE'RE NOT JUST <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300">
                  A CONTENT GENERATOR
                </span>
              </h3>
              <div className="w-24 h-[3px] bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"></div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              We're a dynamic platform that breathes life into raw, unstructured defense and intelligence streams—transforming them into verified reality. Whether you're breaking down critical cyber incident advisories or preparing high-level strategic summaries for national command, we provide an immutable, tamper-evident launchpad for your intelligence workflows.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-xs font-mono text-purple-400 font-semibold">01. INGESTION</div>
                <div className="text-xs text-slate-300 mt-1">PDF, Audio, Image OCR, Text</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-xs font-mono text-fuchsia-400 font-semibold">02. PROVENANCE</div>
                <div className="text-xs text-slate-300 mt-1">SHA-256 Block Anchoring</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-xs font-mono text-indigo-400 font-semibold">03. ZERO DRIFT</div>
                <div className="text-xs text-slate-300 mt-1">Source-Grounded Veracity</div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-4">
              <span className="font-mono text-3xl font-bold text-slate-500">01</span>
              <span className="text-xs font-mono text-slate-400">SYSTEM ARCHITECTURE PIPELINE // NTRO 2026</span>
            </div>
          </div>

          {/* Right Visual Cyber Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white/[0.05] border border-white/20 p-6 shadow-2xl backdrop-blur-2xl overflow-hidden">
              
              {/* Decorative Cyber Grid Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                </div>
                <div className="text-[10px] font-mono text-purple-300 uppercase px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                  VERIFIED_IMMUTABLE_BLOCK #004
                </div>
              </div>

              {/* Futuristic Cyber Visual Node */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-slate-300 space-y-1.5 backdrop-blur-md">
                  <div className="text-[10px] text-purple-400 uppercase tracking-wider">Source Ingestion Root:</div>
                  <div className="text-[11px] text-emerald-300 break-all font-mono">
                    sha256: e3b0c44298fc1c149afbf4c8996fb92427ae...
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Semantic Router Status</span>
                    <span className="text-purple-300 font-semibold">Active // 5 Agents</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span>• Executive Briefing Agent</span>
                      <span className="text-emerald-400">Ready</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span>• Threat Advisory Agent</span>
                      <span className="text-emerald-400">Ready</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span>• Social & X Threads Agent</span>
                      <span className="text-emerald-400">Ready</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span>• Slide Deck & Speaker Notes</span>
                      <span className="text-emerald-400">Ready</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span>• Infographic Metadata Engine</span>
                      <span className="text-emerald-400">Ready</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[10px] text-slate-400">
                  <span>NTRO Certified Node</span>
                  <span className="text-purple-400 font-bold">100% Tamper Proof</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-xl transition-all group space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-display font-bold text-white uppercase tracking-wider">
              Multimodal Ingestion
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Text, PDF documents, Audio debriefs, and Image OCR parsed and normalized into structured intelligence tensors.
            </p>
            <div className="text-[10px] font-mono text-purple-400 pt-1">
              OCR • STT • PyMuPDF
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-xl transition-all group space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-display font-bold text-white uppercase tracking-wider">
              Configurable Router
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically adapt audience, tone, detail level, language, and core mission objectives with zero drift.
            </p>
            <div className="text-[10px] font-mono text-fuchsia-400 pt-1">
              Audience • Tone • Objective
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-xl transition-all group space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-display font-bold text-white uppercase tracking-wider">
              Parallel Outputs
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simultaneously synthesize Executive Briefs, Technical Advisories, Social feeds, Slide Decks, and Infographics.
            </p>
            <div className="text-[10px] font-mono text-indigo-400 pt-1">
              5 Simultaneous Artefacts
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-xl transition-all group space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-display font-bold text-white uppercase tracking-wider">
              Security & Provenance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Source validation, SHA-256 cryptographic hashing, Merkle proofs, and permissioned blockchain ledger record.
            </p>
            <div className="text-[10px] font-mono text-emerald-400 pt-1">
              SHA-256 • Proof of Integrity
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
