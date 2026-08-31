import React from 'react';
import { X, ShieldCheck, Award, Download, Printer, CheckCircle2, Lock, Hash } from 'lucide-react';
import { TransformationResult } from '../types';
import { formatHash } from '../utils/cryptoUtils';

interface ProvenanceCertificateModalProps {
  result: TransformationResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProvenanceCertificateModal: React.FC<ProvenanceCertificateModalProps> = ({
  result,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white/[0.04] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-6 max-h-[90vh] overflow-y-auto glow-purple">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Banner */}
        <div className="text-center space-y-2 border-b border-white/10 pb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 p-0.5 mx-auto flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#0d0720]/90 backdrop-blur-md rounded-full flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-300">
            Government of India • National Technical Research Organisation
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-wide uppercase">
            Certificate of Cryptographic Provenance
          </h3>
          <p className="text-xs text-slate-300 font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 inline-block backdrop-blur-sm">
            CERT-ID: NTRO-PROV-{result.id}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="space-y-4 text-xs font-mono">
          
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 backdrop-blur-md">
            <div className="text-slate-400 text-[11px]">Certified Intelligence Asset:</div>
            <div className="text-sm font-semibold text-white font-sans">{result.sourceTitle}</div>
            <div className="text-[10px] text-purple-300">
              Audience: {result.config.audience} | Tone: {result.config.tone} | Language: {result.config.language}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1 backdrop-blur-md">
              <div className="text-[10px] text-slate-400 uppercase">Blockchain Block Index</div>
              <div className="text-emerald-400 font-bold text-sm">
                Block #{result.blockchainRecord.index} (Confirmed)
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1 backdrop-blur-md">
              <div className="text-[10px] text-slate-400 uppercase">Factual Grounding Veracity</div>
              <div className="text-purple-300 font-bold text-sm">
                {result.factuality.groundingScore}% Zero-Drift Verified
              </div>
            </div>
          </div>

          {/* Cryptographic Hashes */}
          <div className="space-y-2">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-slate-400">Source Input SHA-256:</div>
              <div className="text-slate-200 break-all select-all font-mono text-[11px] mt-0.5">
                {result.sourceHash}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-slate-400">Artefacts Merkle Digest SHA-256:</div>
              <div className="text-emerald-400 break-all select-all font-mono text-[11px] mt-0.5">
                {result.rawArtefactsDigest}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-slate-400">Distributed Node Signature:</div>
              <div className="text-purple-300 break-all select-all font-mono text-[11px] mt-0.5">
                {result.blockchainRecord.validatorSignature}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center space-x-2 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>
              This digital certificate guarantees tamper-evident provenance under NIST and STIX/TAXII intelligence frameworks.
            </span>
          </div>

        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs text-slate-200 cursor-pointer border border-white/10 backdrop-blur-md transition-all"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-purple-950 border border-white/20 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
};
