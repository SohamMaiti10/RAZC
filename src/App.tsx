/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TransformationStudio } from './components/TransformationStudio';
import { ArtefactViewer } from './components/ArtefactViewer';
import { FactualityValidator } from './components/FactualityValidator';
import { BlockchainLedger } from './components/BlockchainLedger';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { ProvenanceCertificateModal } from './components/ProvenanceCertificateModal';
import { ProjectInfoModal } from './components/ProjectInfoModal';
import { TransformationResult } from './types';
import { Shield, Sparkles, Database, Lock, CheckCircle2, Award, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeResult, setActiveResult] = useState<TransformationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [totalBlocks, setTotalBlocks] = useState<number>(1);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Load initial blockchain ledger block count
  useEffect(() => {
    fetch('/api/blockchain/ledger')
      .then((res) => res.json())
      .then((data) => {
        if (data.totalBlocks) setTotalBlocks(data.totalBlocks);
      })
      .catch((err) => console.warn('Ledger fetch error:', err));
  }, [activeResult]);

  // Handle completed transformation
  const handleTransformationComplete = (result: TransformationResult) => {
    setActiveResult(result);
    setTotalBlocks((prev) => prev + 1);
    setActiveTab('artefacts');

    // Trigger celebratory confetti for successfully notarized blockchain transformation
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9333ea', '#c084fc', '#ec4899', '#38bdf8', '#10b981'],
    });
  };

  return (
    <div className="min-h-screen bg-[#06050e]/90 text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white font-sans relative">
      
      {/* Ambient Frosted Background Light Spots */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]"></div>
      </div>
      
      {/* Capsule Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        totalBlocks={totalBlocks}
      />

      {/* Main Tab Routing */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <div className="space-y-0">
            <HeroSection
              onStartTransformation={() => setActiveTab('studio')}
              onExploreBlockchain={() => setActiveTab('blockchain')}
              onExplorePipeline={() => setActiveTab('pipeline')}
            />
            <AboutSection
              onOpenStudio={() => setActiveTab('studio')}
              onOpenLedger={() => setActiveTab('blockchain')}
            />
          </div>
        )}

        {activeTab === 'studio' && (
          <TransformationStudio
            onTransformationComplete={handleTransformationComplete}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            activeResult={activeResult}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'artefacts' && (
          <ArtefactViewer
            result={activeResult}
            onOpenStudio={() => setActiveTab('studio')}
            onOpenFactuality={() => setActiveTab('factuality')}
            onOpenBlockchain={() => setActiveTab('blockchain')}
          />
        )}

        {activeTab === 'factuality' && (
          <FactualityValidator
            result={activeResult}
            onOpenStudio={() => setActiveTab('studio')}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainLedger
            activeResult={activeResult}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
            onOpenStudio={() => setActiveTab('studio')}
          />
        )}

        {activeTab === 'pipeline' && (
          <PipelineVisualizer />
        )}
      </main>

      {/* Cryptographic Provenance Certificate Modal */}
      <ProvenanceCertificateModal
        result={activeResult}
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />

      {/* SIH 2026 NTRO Project Dossier Modal */}
      <ProjectInfoModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      {/* Frosted Glass Footer */}
      <footer className="border-t border-white/10 bg-white/[0.02] backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 backdrop-blur-sm shadow-md">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-white tracking-wider text-sm">RAZC</span>
              <span className="text-[10px] text-purple-300 font-mono ml-2 px-1.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">NTRO // PS-26154</span>
              <div className="text-[11px] text-slate-400 mt-0.5">
                National Technical Research Organisation • Team Goated Tech (SIH 2026)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <button
              onClick={() => setActiveTab('studio')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Transformation Studio
            </button>
            <button
              onClick={() => setActiveTab('blockchain')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Permissioned Blockchain
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Architecture Pipeline
            </button>
            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 2026 Project Profile</span>
            </button>
          </div>

          <div className="text-slate-400 text-[10px] font-mono text-center md:text-right">
            <div>SHA-256 Verifiable • NIST & STIX/TAXII Aligned</div>
            <div className="text-purple-400 font-medium">Normalize Once → Route → Generate → Validate → Verify</div>
          </div>

        </div>
      </footer>

    </div>
  );
}
