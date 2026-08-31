import React, { useState } from 'react';
import { 
  FileText, ShieldAlert, Share2, Presentation, BarChart3, 
  Copy, Check, Download, ExternalLink, ArrowRight, ChevronLeft, 
  ChevronRight, AlertTriangle, ShieldCheck, Sparkles, Hash, Eye
} from 'lucide-react';
import { TransformationResult, SlideItem } from '../types';
import { formatHash } from '../utils/cryptoUtils';
import confetti from 'canvas-confetti';

interface ArtefactViewerProps {
  result: TransformationResult | null;
  onOpenStudio: () => void;
  onOpenFactuality: () => void;
  onOpenBlockchain: () => void;
}

export const ArtefactViewer: React.FC<ArtefactViewerProps> = ({
  result,
  onOpenStudio,
  onOpenFactuality,
  onOpenBlockchain,
}) => {
  const [activeFormat, setActiveFormat] = useState<'brief' | 'advisory' | 'social' | 'slides' | 'infographic'>('brief');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExportJSON = () => {
    if (!result) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NTRO_Artefacts_${result.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  if (!result) {
    return (
      <div className="py-24 px-4 max-w-4xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 glow-purple">
          <FileText className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-white">
            No Active Artefacts Generated Yet
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Ingest an intelligence source in the Studio and configure the transformation parameters to generate 5 parallel audience-ready outputs.
          </p>
        </div>
        <button
          onClick={onOpenStudio}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-900/40 cursor-pointer"
        >
          Launch Studio Intake →
        </button>
      </div>
    );
  }

  const {
    executiveBrief,
    securityAdvisory,
    socialComms,
    slideDeck,
    infographicMetadata,
    factuality,
    blockchainRecord,
  } = result;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner: Verification & Export Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              BLOCK #{blockchainRecord.index} CONFIRMED
            </span>
            <span className="text-xs font-mono text-purple-300">
              Veracity: {factuality.groundingScore}%
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Parallel Transformation Outputs: {result.sourceTitle}
          </h2>
          <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
            <span>Source Hash: <strong className="text-slate-200">{formatHash(result.sourceHash)}</strong></span>
            <span>Artefacts Digest: <strong className="text-slate-200">{formatHash(result.rawArtefactsDigest)}</strong></span>
            <span>Audience: <strong className="text-purple-300">{result.config.audience}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenFactuality}
            className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Factuality Audit</span>
          </button>

          <button
            onClick={onOpenBlockchain}
            className="px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Blockchain Proof</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-purple-950 flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Suite (.json)</span>
          </button>
        </div>
      </div>

      {/* 5-Tab Navigation Pill Bar (Matching SIH Slide 2) */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2">
        {[
          { id: 'brief', label: '1. Executive Decision Brief', icon: FileText, count: 'P1-P3 Actions' },
          { id: 'advisory', label: '2. Security & Threat Advisory', icon: ShieldAlert, count: 'STIX / MITRE' },
          { id: 'social', label: '3. Strategic Comms & X Threads', icon: Share2, count: 'LinkedIn + 3x X' },
          { id: 'slides', label: '4. Slide Deck & Speaker Notes', icon: Presentation, count: `${slideDeck.slides.length} Slides` },
          { id: 'infographic', label: '5. Infographic Metadata', icon: BarChart3, count: 'Metrics & Graph' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFormat === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFormat(tab.id as any)}
              className={`flex-1 min-w-[200px] p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-3 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-950/70 to-[#1e113a] border-purple-500 text-white shadow-xl shadow-purple-950/60 ring-1 ring-purple-500/50'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold truncate text-white">{tab.label}</span>
                <span className="text-[10px] font-mono text-purple-300">{tab.count}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Artefact Display Pane */}
      <div className="bg-[#0b0816] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        
        {/* ================= 1. EXECUTIVE BRIEF ================= */}
        {activeFormat === 'brief' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    executiveBrief.threatLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                    executiveBrief.threatLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    THREAT LEVEL: {executiveBrief.threatLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-400">NTRO EXECUTIVE SYNTHESIS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {executiveBrief.title}
                </h3>
              </div>

              <button
                onClick={() => handleCopy(
                  `${executiveBrief.title}\n\nEXECUTIVE SUMMARY:\n${executiveBrief.executiveSummary}\n\nKEY FINDINGS:\n${executiveBrief.keyFindings.join('\n')}\n\nSTRATEGIC IMPACT:\n${executiveBrief.strategicImpact}`,
                  'brief'
                )}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {copiedSection === 'brief' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'brief' ? 'Copied Brief' : 'Copy Brief'}</span>
              </button>
            </div>

            {/* Executive Summary Card */}
            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                Executive Synthesis & Situation Summary
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                {executiveBrief.executiveSummary}
              </p>
            </div>

            {/* Key Findings Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Core Findings & Factual Signals
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {executiveBrief.keyFindings.map((finding, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {finding}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Impact & Resource Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-fuchsia-400 uppercase">Strategic Impact Assessment</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {executiveBrief.strategicImpact}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-indigo-400 uppercase">Resource & Command Requirements</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {executiveBrief.resourceRequirements}
                </p>
              </div>
            </div>

            {/* Prioritized Recommended Action Table (P1, P2, P3) */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Action Matrix & Operational Roadmap
              </h4>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/[0.04] text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Action Item</th>
                      <th className="p-3">Owner / Division</th>
                      <th className="p-3">Target Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {executiveBrief.recommendedActions.map((rec, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            rec.priority === 'P1' ? 'bg-red-500/20 text-red-300' :
                            rec.priority === 'P2' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-blue-500/20 text-blue-300'
                          }`}>
                            {rec.priority}
                          </span>
                        </td>
                        <td className="p-3 text-slate-200 font-sans">{rec.action}</td>
                        <td className="p-3 text-purple-300">{rec.owner}</td>
                        <td className="p-3 text-emerald-400">{rec.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. SECURITY & THREAT ADVISORY ================= */}
        {activeFormat === 'advisory' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    {securityAdvisory.advisoryId}
                  </span>
                  <span className="text-xs font-mono text-purple-300">
                    SEVERITY: {securityAdvisory.severity}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Technical Security Advisory & STIX/TAXII Dispatch
                </h3>
              </div>

              <button
                onClick={() => handleCopy(JSON.stringify(securityAdvisory, null, 2), 'advisory')}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {copiedSection === 'advisory' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'advisory' ? 'Copied STIX' : 'Copy Advisory JSON'}</span>
              </button>
            </div>

            {/* Attack Vector & Threat Actors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-red-400 uppercase">Attack Vector & Modus Operandi</div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {securityAdvisory.attackVector}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-amber-400 uppercase">Tracked Threat Actors</div>
                <div className="space-y-1.5">
                  {securityAdvisory.threatActors.map((actor, i) => (
                    <div key={i} className="px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs font-mono text-slate-200">
                      {actor}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Indicators of Compromise (IOCs) */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Indicators of Compromise (IOCs)</span>
                <span className="text-purple-400">{securityAdvisory.indicatorsOfCompromise.length} Telemetry Records</span>
              </h4>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/[0.04] text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Indicator Pattern</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {securityAdvisory.indicatorsOfCompromise.map((ioc, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                            {ioc.type}
                          </span>
                        </td>
                        <td className="p-3 text-emerald-400 font-mono select-all">{ioc.indicator}</td>
                        <td className="p-3 text-slate-300 font-sans">{ioc.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MITRE ATT&CK Matrix Mapping */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                MITRE ATT&CK Framework Mapping
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {securityAdvisory.mitreTechniques.map((mitre, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-400">
                      <span>{mitre.id}</span>
                      <span>{mitre.tactic}</span>
                    </div>
                    <div className="text-xs font-medium text-white">{mitre.technique}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remediation Steps */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="text-xs font-mono text-emerald-400 uppercase">Prescribed Technical Remediation Protocols</div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {securityAdvisory.mitigationSteps.map((step, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-white/10">
                Note: {securityAdvisory.certAdvisoryNote}
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. STRATEGIC COMMUNICATIONS SUITE ================= */}
        {activeFormat === 'social' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/10 pb-6">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Strategic Communications & Social Dispatch Suite
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Audience-tailored messaging formatted for executive social networks, microblogs, and media briefings.
              </p>
            </div>

            {/* LinkedIn Post Box */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                  Executive LinkedIn Article / Post
                </span>
                <button
                  onClick={() => handleCopy(socialComms.linkedInPost, 'linkedin')}
                  className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  {copiedSection === 'linkedin' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'linkedin' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {socialComms.linkedInPost}
              </p>
            </div>

            {/* Twitter / X Multi-Tweet Thread */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  X (Twitter) Threat & Situation Thread ({socialComms.xThreads.length} Tweets)
                </span>
                <button
                  onClick={() => handleCopy(socialComms.xThreads.map((t) => t.content).join('\n\n---\n\n'), 'twitter')}
                  className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  {copiedSection === 'twitter' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'twitter' ? 'Copied Thread' : 'Copy Full Thread'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {socialComms.xThreads.map((tweet, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 hover:border-purple-500/30 transition-all">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="text-purple-400 font-bold">Tweet {tweet.tweetNumber}/{socialComms.xThreads.length}</span>
                      <span>{tweet.content.length} / 280 chars</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {tweet.content}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tweet.hashtags?.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-purple-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Press Release Bulletin */}
            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-purple-300 font-bold uppercase">
                  Official Public Affairs Press Release
                </span>
                <button
                  onClick={() => handleCopy(socialComms.pressBulletin, 'press')}
                  className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  {copiedSection === 'press' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'press' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{socialComms.pressBulletin}"
              </p>
            </div>
          </div>
        )}

        {/* ================= 4. SLIDE DECK & SPEAKER NOTES ================= */}
        {activeFormat === 'slides' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase">
                  Slide Deck Generator ({slideDeck.slides.length} Slides)
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {slideDeck.deckTitle}
                </h3>
              </div>

              {/* Slide Navigation Controls */}
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-3 py-1 bg-black/40 rounded-lg text-purple-300">
                  {currentSlideIndex + 1} / {slideDeck.slides.length}
                </span>
                <button
                  disabled={currentSlideIndex === slideDeck.slides.length - 1}
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(slideDeck.slides.length - 1, prev + 1))}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Slide Canvas Showcase */}
            {slideDeck.slides[currentSlideIndex] && (
              <div className="relative rounded-3xl bg-gradient-to-br from-[#160c2e] via-[#0d0720] to-black border border-purple-500/40 p-8 sm:p-12 shadow-2xl min-h-[380px] flex flex-col justify-between overflow-hidden">
                
                {/* Slide Decorative Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="text-[10px] font-mono text-purple-400 uppercase">
                    SLIDE {slideDeck.slides[currentSlideIndex].slideNumber} // {slideDeck.targetAudience}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    NTRO INTELLIGENCE DECK
                  </div>
                </div>

                {/* Slide Title & Bullets */}
                <div className="space-y-4 my-6">
                  <div className="space-y-1">
                    <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      {slideDeck.slides[currentSlideIndex].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-300 font-mono">
                      {slideDeck.slides[currentSlideIndex].subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {slideDeck.slides[currentSlideIndex].keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-3 text-xs sm:text-base text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Recommendation Box */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Visual Layout Concept:</span>
                  <span className="text-purple-300">{slideDeck.slides[currentSlideIndex].visualSuggestion}</span>
                </div>

              </div>
            )}

            {/* Speaker Notes Drawer */}
            {slideDeck.slides[currentSlideIndex] && (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold">
                    🎙️ Speaker Talking Points & Delivery Notes (Slide {currentSlideIndex + 1})
                  </span>
                  <button
                    onClick={() => handleCopy(slideDeck.slides[currentSlideIndex].speakerNotes, 'speaker')}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    {copiedSection === 'speaker' ? 'Copied' : 'Copy Notes'}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {slideDeck.slides[currentSlideIndex].speakerNotes}
                </p>
              </div>
            )}

            {/* Slide Thumbnails Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {slideDeck.slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'bg-purple-950/60 border-purple-500 text-white font-semibold'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono text-purple-400">SLIDE {s.slideNumber}</div>
                  <div className="truncate mt-1">{s.title}</div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* ================= 5. INFOGRAPHIC METADATA BLUEPRINT ================= */}
        {activeFormat === 'infographic' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs font-mono text-purple-400 uppercase">
                Visual Analytics & Infographic Blueprint
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {infographicMetadata.headline}
              </h3>
            </div>

            {/* Key Metrics Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {infographicMetadata.coreMetrics.map((met, mIdx) => (
                <div key={mIdx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="text-xs text-slate-400 font-mono">{met.label}</div>
                  <div className="text-2xl font-display font-bold text-white">{met.value}</div>
                  {met.change && (
                    <div className="text-[10px] font-mono text-emerald-400">{met.change}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Chronological Timeline Events */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Chronological Event Sequence
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {infographicMetadata.timelineEvents.map((evt, eIdx) => (
                  <div key={eIdx} className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                    <div className="text-[10px] font-mono text-purple-400 font-bold">{evt.timeframe}</div>
                    <div className="text-xs font-bold text-white">{evt.phase}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{evt.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entity Relationships Graph Metadata */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="text-xs font-mono text-slate-300 uppercase font-bold">
                Entity Relationship Matrix
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {infographicMetadata.entityRelationships.map((rel, rIdx) => (
                  <div key={rIdx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                    <div className="text-purple-300 font-semibold">{rel.from}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <span>↓ {rel.relation}</span>
                    </div>
                    <div className="text-emerald-400">{rel.to}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Palette Swatches */}
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 pt-2">
              <span>Color Harmony Swatches:</span>
              <div className="flex items-center space-x-1.5">
                {infographicMetadata.visualPalette?.map((color, cIdx) => (
                  <div
                    key={cIdx}
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
