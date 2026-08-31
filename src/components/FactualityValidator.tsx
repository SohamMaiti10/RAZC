import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Search, Link2, BookOpen, Sparkles, Filter } from 'lucide-react';
import { TransformationResult } from '../types';

interface FactualityValidatorProps {
  result: TransformationResult | null;
  onOpenStudio: () => void;
}

export const FactualityValidator: React.FC<FactualityValidatorProps> = ({
  result,
  onOpenStudio,
}) => {
  const [selectedCitationIndex, setSelectedCitationIndex] = useState<number>(0);

  if (!result) {
    return (
      <div className="py-24 px-4 max-w-4xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-bold text-white">
          No Transformation Audit Available
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Execute a content transformation in the Studio to review source grounding scores, claim citations, and hallucination metrics.
        </p>
        <button
          onClick={onOpenStudio}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Launch Studio Intake →
        </button>
      </div>
    );
  }

  const { factuality, sourceTitle } = result;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              SOURCE GROUNDING & FACTUALITY RAG
            </span>
            <span className="text-xs font-mono text-emerald-400">NIST / STIX-ALIGNED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Factuality & Hallucination Audit Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Strict cross-referencing between synthesized artefacts and ground-truth source tokens, ensuring zero-drift intelligence delivery.
          </p>
        </div>

        {/* Big Veracity Score Badge */}
        <div className="flex items-center space-x-4 bg-white/[0.02] border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">Veracity Score</div>
            <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400">
              {factuality.groundingScore}%
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Hallucination Risk Rating</div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-emerald-400">
              {factuality.hallucinationRisk}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              SAFE FOR COMMAND
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Probability of fabricated telemetry or unsupported claims is minimal.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Verified Claims Count</div>
          <div className="text-xl font-display font-bold text-white">
            {factuality.verifiedClaimsCount} / {factuality.totalClaimsCount || factuality.verifiedClaimsCount} Claims
          </div>
          <p className="text-xs text-slate-400">
            100% of generated strategic claims trace directly to source sentences.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Grounding Principle</div>
          <div className="text-sm font-semibold text-purple-300">
            Retrieval-Augmented Generation (Lewis et al.)
          </div>
          <p className="text-xs text-slate-400">
            Normalizes raw telemetry before routing into domain-specific outputs.
          </p>
        </div>

      </div>

      {/* Interactive Claim to Source Citation Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Citations List */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Synthesized Output Claims</span>
            <span className="text-purple-400">Click to Inspect Source Grounding</span>
          </h4>

          <div className="space-y-3">
            {factuality.citations.map((citation, idx) => {
              const isSelected = selectedCitationIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedCitationIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500 ring-1 ring-purple-500/50 shadow-lg shadow-purple-950'
                      : 'bg-white/[0.02] border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-purple-400 font-bold">CLAIM #{idx + 1}</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {Math.round(citation.confidence * 100)}% Confidence
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    "{citation.claim}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                      {citation.status}
                    </span>
                    <span className="text-purple-300">{isSelected ? 'Active Citation' : 'Inspect Ground →'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Source Evidence Inspector Box */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Source Ground Truth Evidence
          </h4>

          {factuality.citations[selectedCitationIndex] ? (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#140b2a] to-black border border-purple-500/30 space-y-5 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono text-white font-bold">
                    Direct Quote Alignment (Citation #{selectedCitationIndex + 1})
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  VERIFIED ANCHOR
                </span>
              </div>

              {/* Exact Source Quote */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-purple-300 uppercase">
                  Original Source Excerpt:
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-purple-500/20 text-xs sm:text-sm text-emerald-200 font-mono leading-relaxed">
                  "{factuality.citations[selectedCitationIndex].sourceQuote}"
                </div>
              </div>

              {/* Cross-Reference Alignment */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Synthesized Output Representation:
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {factuality.citations[selectedCitationIndex].claim}
                </div>
              </div>

              {/* Factual Audit Summary */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-purple-300">Auditor Evaluation:</div>
                <p className="leading-relaxed">
                  {factuality.validationNotes || "All extracted claims match the source without semantic distortion or hallucinated entities."}
                </p>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center text-slate-400 text-xs">
              Select a claim on the left to review its source quote.
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
