import React, { useState, useEffect } from 'react';
import { 
  Database, ShieldCheck, Lock, AlertOctagon, CheckCircle2, 
  RefreshCw, Hash, FileCheck, Award, ArrowRight, Copy, Check, Sparkles
} from 'lucide-react';
import { BlockchainBlock, TransformationResult } from '../types';
import { formatHash, computeSHA256 } from '../utils/cryptoUtils';
import confetti from 'canvas-confetti';

interface BlockchainLedgerProps {
  activeResult: TransformationResult | null;
  onOpenCertificateModal: () => void;
  onOpenStudio: () => void;
}

export const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({
  activeResult,
  onOpenCertificateModal,
  onOpenStudio,
}) => {
  const [ledger, setLedger] = useState<BlockchainBlock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Tamper Simulator State
  const [tamperText, setTamperText] = useState<string>('');
  const [originalHash, setOriginalHash] = useState<string>('');
  const [liveHash, setLiveHash] = useState<string>('');
  const [isTampered, setIsTampered] = useState<boolean>(false);

  // Load live ledger from server
  const fetchLedger = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/blockchain/ledger');
      if (res.ok) {
        const data = await res.json();
        setLedger(data.ledger || []);
      }
    } catch (e) {
      console.error('Failed to load ledger', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, [activeResult]);

  // Setup Tamper Simulator when activeResult is available
  useEffect(() => {
    if (activeResult) {
      const baseText = activeResult.executiveBrief.executiveSummary;
      setTamperText(baseText);
      computeSHA256(baseText).then((hash) => {
        setOriginalHash(hash);
        setLiveHash(hash);
        setIsTampered(false);
      });
    }
  }, [activeResult]);

  // Re-hash as user edits tamper text
  const handleTamperTextChange = async (newText: string) => {
    setTamperText(newText);
    const newHash = await computeSHA256(newText);
    setLiveHash(newHash);
    setIsTampered(newHash !== originalHash);
  };

  const handleResetTamper = async () => {
    if (activeResult) {
      const baseText = activeResult.executiveBrief.executiveSummary;
      setTamperText(baseText);
      const hash = await computeSHA256(baseText);
      setOriginalHash(hash);
      setLiveHash(hash);
      setIsTampered(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(label);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              IMMUTABLE PROVENANCE
            </span>
            <span className="text-xs font-mono text-slate-400">NTRO PERMISSIONED LEDGER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Blockchain Integrity & Provenance Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Cryptographic SHA-256 block hashing, distributed validator node consensus, and tamper-evident audit trails for mission-critical national security intelligence.
          </p>
        </div>

        {/* Refresh & Certificate CTAs */}
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchLedger}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
            title="Refresh Blockchain"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {activeResult && (
            <button
              onClick={onOpenCertificateModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-950 flex items-center space-x-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Verifiable Provenance Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Tamper-Evident Proof Simulator (Core SIH Requirement) */}
      <div className="bg-gradient-to-br from-[#100a24] via-[#090615] to-black border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
              Interactive Tamper-Evident Simulator
            </h3>
          </div>
          <span className="text-xs font-mono text-purple-300">
            Edit text below to test real-time SHA-256 verification
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          In high-stakes intelligence and defense scenarios, unapproved modification of even a single character invalidates the cryptographic Merkle tree. Try adding or changing a letter below to observe the instant cryptographic failure:
        </p>

        {/* Tamper Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Text Editor */}
          <div className="lg:col-span-7 space-y-2">
            <label className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Live Generated Artefact Text</span>
              <button
                onClick={handleResetTamper}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Reset Original
              </button>
            </label>
            <textarea
              rows={5}
              value={tamperText}
              onChange={(e) => handleTamperTextChange(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500 transition-all leading-relaxed"
              placeholder="Load or transform an intelligence brief to test tampering..."
            />
          </div>

          {/* Real-time Verification Status Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`p-5 rounded-2xl border transition-all ${
              isTampered
                ? 'bg-red-950/40 border-red-500/70 glow-magenta'
                : 'bg-emerald-950/30 border-emerald-500/50'
            }`}>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase">
                  {isTampered ? '🚨 TAMPER DETECTED' : '✓ CRYPTOGRAPHICALLY VALID'}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  isTampered ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {isTampered ? 'SIGNATURE BROKEN' : 'LEDGER MATCH'}
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Ledger Block Anchor Hash:</div>
                  <div className="text-slate-300 break-all text-[11px] bg-black/40 p-1.5 rounded mt-0.5">
                    {originalHash || 'No active hash'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Current Computed Text Hash:</div>
                  <div className={`break-all text-[11px] bg-black/40 p-1.5 rounded mt-0.5 ${
                    isTampered ? 'text-red-400 font-bold' : 'text-emerald-400'
                  }`}>
                    {liveHash || 'Computing...'}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-300 leading-snug">
                {isTampered
                  ? 'Output fails SHA-256 verification. Downstream command will automatically reject this artefact.'
                  : 'Hash matches the immutable ledger record with 100% mathematical certainty.'}
              </p>

            </div>
          </div>

        </div>

      </div>

      {/* Live Blockchain Blocks Explorer */}
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-display font-bold text-white">
              Immutable Blockchain Block Explorer ({ledger.length} Blocks)
            </h3>
            <p className="text-xs text-slate-400">
              Chained cryptographic hashes notarized by NTRO distributed validator nodes.
            </p>
          </div>
          <span className="text-xs font-mono text-purple-400">
            Proof-of-Authority Consensus
          </span>
        </div>

        <div className="space-y-4">
          {ledger.map((block) => (
            <div
              key={block.index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all backdrop-blur-xl space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold flex items-center justify-center border border-purple-500/30">
                    #{block.index}
                  </div>
                  <div>
                    <span className="text-xs font-display font-bold text-white">
                      {block.index === 0 ? 'Genesis Block (System Boot)' : `Artefact Anchor Block #${block.index}`}
                    </span>
                    <div className="text-[10px] font-mono text-slate-400">
                      {new Date(block.timestamp).toUTCString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {block.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Nonce: {block.nonce}
                  </span>
                </div>
              </div>

              {/* Block Hashes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Block Hash</div>
                  <div className="text-emerald-400 break-all select-all font-bold">
                    {block.blockHash}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Previous Block Hash</div>
                  <div className="text-slate-300 break-all select-all">
                    {block.previousHash}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] text-purple-400 uppercase">Merkle Root</div>
                  <div className="text-purple-300 break-all select-all">
                    {block.merkleRoot}
                  </div>
                </div>
              </div>

              {/* Validator Node Signature */}
              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">Validator Node:</span>
                  <span className="text-slate-200">{block.validatorNode}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">Signature:</span>
                  <span className="text-purple-300">{formatHash(block.validatorSignature, 12, 8)}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
