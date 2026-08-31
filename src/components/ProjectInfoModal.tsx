import React from 'react';
import { X, Award, Users, Shield, Cpu, CheckCircle2, BookOpen, Layers, Terminal } from 'lucide-react';

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const teamMembers = [
    { name: 'Shreya Das', role: 'Team Lead & AI Architect' },
    { name: 'Piyush Kumar', role: 'Full Stack & Backend' },
    { name: 'Shreya Mandal', role: 'Blockchain & Security Lead' },
    { name: 'Aditi Maity', role: 'NLP & Multimodal Ingestion' },
    { name: 'Soham Maiti', role: 'Frontend & UI/UX Design' },
    { name: 'Ankita Mandal', role: 'Factuality & RAG Verification' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white/[0.04] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-6 max-h-[90vh] overflow-y-auto glow-purple">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 font-bold backdrop-blur-md">
              SMART INDIA HACKATHON 2026
            </span>
            <span className="text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">PROBLEM ID: 26154</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            Gen AI Platform for Automated Content Transformation
          </h2>
          <p className="text-xs sm:text-sm text-purple-300 font-mono">
            Secure Blockchain-Backed Source-Grounded Multimodal Transformation
          </p>
        </div>

        {/* Project Meta Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="text-slate-400 text-[10px] uppercase">Organization</div>
            <div className="text-white font-bold font-sans mt-0.5">
              National Technical Research Organisation (NTRO)
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="text-slate-400 text-[10px] uppercase">Theme & Category</div>
            <div className="text-purple-300 font-bold font-sans mt-0.5">
              Blockchain & Cybersecurity (Software)
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="text-slate-400 text-[10px] uppercase">Team ID & Name</div>
            <div className="text-emerald-400 font-bold font-sans mt-0.5">
              Goated Tech
            </div>
          </div>
        </div>

        {/* Team Members Grid (Slide 1) */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 uppercase tracking-wider">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Team Members (Goated Tech)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-1 hover:bg-white/[0.08] transition-colors">
                <div className="text-xs font-bold text-white">{member.name}</div>
                <div className="text-[10px] font-mono text-purple-300">{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Value Proposition (Slide 5) */}
        <div className="p-6 rounded-2xl bg-white/[0.04] border border-purple-500/30 backdrop-blur-2xl space-y-2 text-xs relative overflow-hidden shadow-lg">
          <div className="font-mono text-purple-300 uppercase tracking-wider font-bold">
            Strategic Value Formula
          </div>
          <div className="text-sm font-display font-bold text-white leading-relaxed">
            ONE SOURCE OF TRUTH → MANY AUDIENCE-READY ARTEFACTS → VERIFIED & TRACEABLE OUTPUTS
          </div>
          <p className="text-slate-300 leading-relaxed font-light">
            Repackages mission-critical intelligence content from hours to seconds while enforcing complete factual veracity and tamper-evident provenance.
          </p>
        </div>

        {/* Risk Mitigation Table (Slide 4) */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-300 uppercase tracking-wider">
            Key Risks & Mitigation Architecture (Slide 4)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-red-400 font-mono font-bold">RISK 01: Hallucination</div>
              <div className="text-slate-300 text-[11px]">
                Mitigation: Source-Grounded RAG (Lewis et al.) & strict claim cross-validation.
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-red-400 font-mono font-bold">RISK 02: Unauthorized Access</div>
              <div className="text-slate-300 text-[11px]">
                Mitigation: Role-Based Access Control (RBAC) & cryptographic node validation.
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-red-400 font-mono font-bold">RISK 03: Output Tampering</div>
              <div className="text-slate-300 text-[11px]">
                Mitigation: SHA-256 Merkle root hashing and permissioned blockchain notarization.
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-red-400 font-mono font-bold">RISK 04: Sensitive Data Exposure</div>
              <div className="text-slate-300 text-[11px]">
                Mitigation: Off-chain secure encrypted storage; only hashes anchored on-chain.
              </div>
            </div>
          </div>
        </div>

        {/* Research References (Slide 6) */}
        <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-slate-400">
          <div className="text-purple-300 font-bold">Research & Standards Foundation:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div>• RAG (Lewis et al.) & Multimodal Foundation Models</div>
            <div>• NIST Cybersecurity Framework & STIX / TAXII</div>
            <div>• SHA-256 Data Provenance Principles</div>
            <div>• Gemini API & PyMuPDF Normalization</div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-purple-900/40 border border-white/20 transition-all"
          >
            Close Project Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
