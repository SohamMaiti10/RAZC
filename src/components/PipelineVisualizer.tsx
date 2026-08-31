import React, { useState } from 'react';
import { 
  Layers, Shield, Cpu, Share2, Database, CheckCircle2, 
  ArrowRight, FileText, Lock, Terminal, Activity, Sparkles 
} from 'lucide-react';

export const PipelineVisualizer: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const pipelineSteps = [
    {
      id: 'step-1',
      title: 'Multimodal Sources',
      subtitle: 'Raw Ingestion',
      icon: FileText,
      tech: 'PDF, Images, Audio debriefs, Text streams',
      details: 'Supports ingestion of diverse raw formats. Ingestion pipeline accepts unstructured data from external sensor feeds, classified reports, and audio debriefs.',
      codeSnippet: `// Ingestion Handler
const sourcePayload = await parseMultimodalStream(rawBuffer, {
  ocrEngine: 'Tesseract/EasyOCR',
  audioEngine: 'Whisper-v3',
  pdfParser: 'PyMuPDF'
});`,
    },
    {
      id: 'step-2',
      title: 'Secure Ingestion & OCR',
      subtitle: 'Preprocessing & Cleaning',
      icon: Terminal,
      tech: 'PyMuPDF • Whisper • OCR',
      details: 'Converts unstructured pixels, waveform PCM streams, and binary documents into normalized UTF-8 plain text with metadata timestamps.',
      codeSnippet: `// Normalization Layer
const normalizedText = await normalizeIntelligence(sourcePayload);
const sha256Source = crypto.createHash('sha256').update(normalizedText).digest('hex');`,
    },
    {
      id: 'step-3',
      title: 'Fact & Entity Extraction',
      subtitle: 'Knowledge Graph',
      icon: Cpu,
      tech: 'Named Entity Recognition • STIX/TAXII',
      details: 'Extracts critical entities such as Threat Actors, CVEs, IP addresses, MITRE ATT&CK techniques, and operational milestones.',
      codeSnippet: `// Entity Extractor
const entities = extractEntities(normalizedText, {
  extractCVE: true,
  extractIOC: true,
  extractMitreTactics: true
});`,
    },
    {
      id: 'step-4',
      title: 'Source-Grounded RAG',
      subtitle: 'Zero-Drift Grounding',
      icon: Shield,
      tech: 'RAG (Lewis et al.) • Vector Embeddings',
      details: 'Strict vector retrieval locks the transformation to only the facts present in the source, preventing model hallucination and synthetic embellishment.',
      codeSnippet: `// Grounded RAG Context Retrieval
const contextChunks = retrieveGroundedChunks(sourceHash, {
  strictness: 'HIGH',
  hallucinationThreshold: 0.05
});`,
    },
    {
      id: 'step-5',
      title: 'Semantic Router',
      subtitle: 'Domain Routing',
      icon: Activity,
      tech: 'Intent & Audience Filter',
      details: 'Routes transformed content according to the selected target audience (Ministers, Military Command, Public Affairs) and desired security classification.',
      codeSnippet: `// Dynamic Semantic Router
const agentConfig = routeToAgents({
  audience: 'executive_decision',
  tone: 'classified_confidential',
  formats: ['brief', 'advisory', 'social', 'slides', 'infographic']
});`,
    },
    {
      id: 'step-6',
      title: 'Parallel Output Agents',
      subtitle: '5x Generation',
      icon: Share2,
      tech: 'Gemini 3.7 Flash • Multi-Agent',
      details: 'Five specialized generation agents synthesize Executive Briefs, Technical Threat Advisories, Social/X Threads, Slide Decks, and Infographic blueprints simultaneously.',
      codeSnippet: `// Parallel Generation Execution
const [brief, advisory, social, slides, info] = await Promise.all([
  ExecutiveBriefAgent.generate(contextChunks),
  SecurityAdvisoryAgent.generate(contextChunks),
  SocialCommsAgent.generate(contextChunks),
  SlideDeckAgent.generate(contextChunks),
  InfographicAgent.generate(contextChunks),
]);`,
    },
    {
      id: 'step-7',
      title: 'Factuality Validator',
      subtitle: 'Source Cross-Check',
      icon: CheckCircle2,
      tech: 'Fact Alignment • Claim Verification',
      details: 'Every statement in the generated artefacts is reverse-matched against the original source text to compute a veracity score (95%+ required for clearance).',
      codeSnippet: `// Factual Cross-Verification
const validationReport = validateGrounding(generatedArtefacts, normalizedText);
if (validationReport.groundingScore < 90) {
  throw new SecurityDriftException('Hallucination detected in generated stream');
}`,
    },
    {
      id: 'step-8',
      title: 'SHA-256 Provenance & Blockchain',
      subtitle: 'Immutable Ledger',
      icon: Database,
      tech: 'SHA-256 • Merkle Proof • Permissioned Chain',
      details: 'Calculates the cryptographic Merkle root of all artefacts and source hash, then notarizes a new block on the NTRO permissioned blockchain ledger.',
      codeSnippet: `// Blockchain Ledger Anchoring
const block = await ntroLedger.mintBlock({
  sourceHash,
  artefactsDigest,
  merkleRoot: calculateMerkleRoot([sourceHash, artefactsDigest]),
  validatorNode: 'NTRO-VALIDATOR-ALPHA'
});`,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            TECHNICAL PIPELINE ARCHITECTURE
          </span>
          <span className="text-xs font-mono text-slate-400">SIH 2026 #26154</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
          Implementation Pipeline & Flow Topology
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          Core architectural design principle: <strong className="text-purple-300">Normalize once → route → generate → validate → verify.</strong> Click any stage below to inspect its algorithmic mechanics.
        </p>
      </div>

      {/* Horizontal Interactive Step Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStep(idx)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[130px] relative ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-900/60 to-[#120a26] border-purple-400 ring-1 ring-purple-400/50 shadow-xl shadow-purple-950/60'
                  : 'bg-white/[0.02] border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono font-bold text-purple-400">0{idx + 1}</span>
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-purple-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-0.5 my-auto">
                <div className="text-xs font-bold text-white line-clamp-2 leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {step.subtitle}
                </div>
              </div>

              <div className="text-[9px] font-mono text-purple-300">
                {isSelected ? '● Active' : 'Inspect →'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Deep Dive Inspector */}
      {pipelineSteps[selectedStep] && (
        <div className="bg-[#0c0818] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-mono font-bold text-sm">
                0{selectedStep + 1}
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Stage {selectedStep + 1}: {pipelineSteps[selectedStep].title}
                </h3>
                <div className="text-xs font-mono text-purple-300">
                  Tech Stack: {pipelineSteps[selectedStep].tech}
                </div>
              </div>
            </div>

            <div className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              PIPELINE NODE VERIFIED
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {pipelineSteps[selectedStep].details}
          </p>

          {/* Technical Code Representation */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Node Execution Blueprint:
            </div>
            <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{pipelineSteps[selectedStep].codeSnippet}</code>
            </pre>
          </div>

        </div>
      )}

      {/* Technology Stack Grid (Slide 3 alignment) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-purple-400 uppercase font-bold">Frontend & State</div>
          <div className="text-sm font-semibold text-white">React.js • TailwindCSS • Motion</div>
          <p className="text-xs text-slate-400">
            High-contrast dark cybernetic user interface with real-time Web Crypto SHA-256 verification.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-fuchsia-400 uppercase font-bold">Backend & AI Engine</div>
          <div className="text-sm font-semibold text-white">Express / Node • Gemini 3.7 Flash</div>
          <p className="text-xs text-slate-400">
            Secure server-side API proxy executing multi-agent parallel synthesis without exposing credentials.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-indigo-400 uppercase font-bold">Security & Blockchain</div>
          <div className="text-sm font-semibold text-white">SHA-256 • Merkle Trees • Permissioned Chain</div>
          <p className="text-xs text-slate-400">
            Off-chain high-security data storage with on-chain cryptographic provenance notarization.
          </p>
        </div>
      </div>

    </div>
  );
};
