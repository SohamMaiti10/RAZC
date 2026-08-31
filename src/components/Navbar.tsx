import React from 'react';
import { Shield, Cpu, Activity, Database, CheckCircle2, Sparkles, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProjectModal: () => void;
  totalBlocks: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenProjectModal,
  totalBlocks,
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'studio', label: 'Studio' },
    { id: 'artefacts', label: 'Parallel Outputs' },
    { id: 'factuality', label: 'Factuality RAG' },
    { id: 'blockchain', label: 'Blockchain Ledger' },
    { id: 'pipeline', label: 'Pipeline' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#06050e]/65 border-b border-white/10 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-400 p-[1.5px] flex items-center justify-center glow-purple group-hover:scale-105 transition-transform shadow-lg">
            <div className="w-full h-full bg-[#0a0718]/90 backdrop-blur-md rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-xl tracking-wider text-white">RAZC</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                NTRO 26154
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-tight">Source-Grounded GenAI</span>
          </div>
        </div>

        {/* Capsule Navigation Pill (Matching Frosted Glass Template) */}
        <nav className="hidden md:flex items-center bg-white/[0.05] border border-white/15 rounded-full p-1.5 backdrop-blur-xl shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 font-semibold border border-white/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          {/* Node Status Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-400 font-mono backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>NTRO-NODE-{totalBlocks}</span>
          </div>

          {/* Project Details Modal Trigger */}
          <button
            id="btn-sih-project-info"
            onClick={onOpenProjectModal}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-purple-500/15 border border-white/15 hover:border-purple-500/40 text-xs text-slate-200 hover:text-purple-300 transition-all cursor-pointer backdrop-blur-md"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">SIH 2026</span>
            <span className="font-semibold text-purple-400">Goated Tech</span>
          </button>

          {/* Launch Studio Action Button */}
          <button
            id="btn-launch-transformation"
            onClick={() => setActiveTab('studio')}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-900/50 hover:shadow-purple-700/70 border border-white/20 transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transform</span>
          </button>
        </div>
      </div>
    </header>
  );
};
