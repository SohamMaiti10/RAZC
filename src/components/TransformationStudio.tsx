import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Upload, FileText, Globe, Volume2, Image, Shield, 
  Settings2, Hash, CheckCircle2, AlertTriangle, ArrowRight, 
  RefreshCw, Cpu, Layers, Lock, SlidersHorizontal, Terminal
} from 'lucide-react';
import { 
  MultimodalSource, TransformationConfig, TransformationResult, 
  AudienceType, ToneType, DetailLevel, ObjectiveType 
} from '../types';
import { SAMPLE_SOURCES } from '../data/sampleSources';
import { computeSHA256, formatHash } from '../utils/cryptoUtils';

interface TransformationStudioProps {
  onTransformationComplete: (result: TransformationResult) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  activeResult: TransformationResult | null;
  setActiveTab: (tab: string) => void;
}

export const TransformationStudio: React.FC<TransformationStudioProps> = ({
  onTransformationComplete,
  isProcessing,
  setIsProcessing,
  activeResult,
  setActiveTab,
}) => {
  // Source State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SAMPLE_SOURCES[0].id);
  const [sourceTitle, setSourceTitle] = useState<string>(SAMPLE_SOURCES[0].title);
  const [sourceType, setSourceType] = useState<'text' | 'pdf' | 'audio' | 'image' | 'web'>(SAMPLE_SOURCES[0].type);
  const [sourceContent, setSourceContent] = useState<string>(SAMPLE_SOURCES[0].content);
  const [sourceHash, setSourceHash] = useState<string>('');
  const [classification, setClassification] = useState<string>(SAMPLE_SOURCES[0].classificationLevel || 'TOP SECRET // NOFORN');
  const [extractedEntities, setExtractedEntities] = useState<string[]>(SAMPLE_SOURCES[0].extractedEntities || []);

  // Configuration Parameters (Slide 2 & 3)
  const [config, setConfig] = useState<TransformationConfig>({
    audience: 'executive_decision',
    tone: 'classified_confidential',
    language: 'English',
    detail: 'comprehensive_intelligence',
    objective: 'threat_mitigation',
  });

  // Pipeline Execution Stage
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Compute live SHA-256 whenever sourceContent changes
  useEffect(() => {
    let isMounted = true;
    if (sourceContent) {
      computeSHA256(sourceContent).then((h) => {
        if (isMounted) setSourceHash(h);
      });
    } else {
      setSourceHash('');
    }
    return () => {
      isMounted = false;
    };
  }, [sourceContent]);

  // Load Preset
  const handleSelectPreset = (source: MultimodalSource) => {
    setSelectedPresetId(source.id);
    setSourceTitle(source.title);
    setSourceType(source.type);
    setSourceContent(source.content);
    setClassification(source.classificationLevel || 'SECRET');
    setExtractedEntities(source.extractedEntities || []);
    setErrorMessage(null);
  };

  // Custom File Upload Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const isPDF = fileName.endsWith('.pdf');
    const isAudio = fileName.match(/\.(mp3|wav|ogg|m4a)$/i);
    const isImage = fileName.match(/\.(png|jpg|jpeg|webp)$/i);

    const type = isPDF ? 'pdf' : isAudio ? 'audio' : isImage ? 'image' : 'text';
    setSourceType(type);
    setSourceTitle(`Ingested File: ${fileName}`);
    setSelectedPresetId('custom-upload');
    setClassification('CONFIDENTIAL');

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setSourceContent(text);
        setExtractedEntities(['Custom Ingestion', fileName, `${Math.round(file.size / 1024)} KB`]);
      }
    };
    reader.readAsText(file);
  };

  // Execute Transformation Pipeline
  const handleExecuteTransformation = async () => {
    if (!sourceContent || sourceContent.trim().length === 0) {
      setErrorMessage('Please provide source content to transform.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setPipelineLogs([]);
    setCurrentStage(1);

    const stages = [
      'Normalizing multimodal inputs & computing SHA-256 hash...',
      'Executing secure OCR & speech parsing pipeline...',
      'Extracting key entities, facts, and STIX/TAXII attributes...',
      'Semantic Router: Configuring 5 parallel output agents...',
      'Synthesizing Executive Brief, Security Advisory, Slides & Social feeds...',
      'Validating source-grounding veracity & zero-hallucination compliance...',
      'Minting block & anchoring cryptographic provenance into blockchain...',
    ];

    // Stage progression animation
    let stageIndex = 0;
    const interval = setInterval(() => {
      if (stageIndex < stages.length - 1) {
        stageIndex++;
        setCurrentStage(stageIndex + 1);
        setPipelineLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${stages[stageIndex]}`]);
      }
    }, 600);

    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceContent,
          sourceTitle,
          sourceType,
          audience: config.audience,
          tone: config.tone,
          language: config.language,
          detail: config.detail,
          objective: config.objective,
        }),
      });

      if (!response.ok) {
        throw new Error(`Transformation server error (${response.status})`);
      }

      const data: TransformationResult = await response.json();
      clearInterval(interval);
      setCurrentStage(7);
      setPipelineLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Transformation successfully completed! Block #${data.blockchainRecord.index} verified.`,
      ]);

      setTimeout(() => {
        setIsProcessing(false);
        onTransformationComplete(data);
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setIsProcessing(false);
      setErrorMessage(err.message || 'Transformation failed. Please retry.');
      console.error(err);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              STUDIO // INTAKE & ROUTING
            </span>
            <span className="text-xs font-mono text-slate-400">NTRO PS-26154</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Multimodal Content Transformation Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Ingest unstructured intelligence feeds, configure domain parameters, and synthesize 5 parallel audience-ready artefacts with immutable blockchain provenance.
          </p>
        </div>

        {/* Real-Time SHA-256 Badge */}
        <div className="flex flex-col sm:items-end font-mono text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-purple-400" />
            Source SHA-256 Hash:
          </span>
          <span className="text-emerald-400 font-bold bg-black/50 px-2.5 py-1 rounded border border-emerald-500/30 mt-1 break-all max-w-xs">
            {sourceHash ? formatHash(sourceHash, 10, 10) : 'Computing hash...'}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Source Ingestion, Right Config Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Multimodal Ingestion Hub */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Intelligence Scenarios */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Select Pre-Loaded Intelligence Source</span>
              <span className="text-purple-400">4 NTRO Datasets</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAMPLE_SOURCES.map((source) => {
                const isSelected = selectedPresetId === source.id;
                return (
                  <button
                    key={source.id}
                    onClick={() => handleSelectPreset(source)}
                    className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-950/60 ring-1 ring-purple-500/40'
                        : 'bg-white/[0.02] border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-purple-300 border border-white/10 flex items-center gap-1">
                        {source.type === 'pdf' && <FileText className="w-3 h-3 text-red-400" />}
                        {source.type === 'audio' && <Volume2 className="w-3 h-3 text-amber-400" />}
                        {source.type === 'image' && <Image className="w-3 h-3 text-blue-400" />}
                        {source.type === 'text' && <FileText className="w-3 h-3 text-emerald-400" />}
                        {source.type.toUpperCase()}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        source.classificationLevel?.includes('TOP SECRET')
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {source.classificationLevel?.split(' ')[0]}
                      </span>
                    </div>

                    <div className="font-medium text-xs text-white line-clamp-2 leading-snug">
                      {source.title}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{source.fileSize || '3.4 KB'}</span>
                      <span className="text-purple-300">{isSelected ? '● Active' : 'Select →'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ingestion Content Box & Live Editor */}
          <div className="space-y-3 bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="space-y-1 flex-1">
                <input
                  type="text"
                  value={sourceTitle}
                  onChange={(e) => setSourceTitle(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none border-b border-transparent focus:border-purple-500 transition-colors"
                  placeholder="Intelligence Source Title..."
                />
              </div>

              {/* Classification Tag */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                  {classification}
                </span>

                {/* Upload Custom File */}
                <label className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 cursor-pointer transition-colors">
                  <Upload className="w-3 h-3 text-purple-400" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept=".txt,.md,.pdf,.json,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Content Textarea */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Normalized Source Text Content</span>
                <span>{sourceContent.length} characters</span>
              </label>
              <textarea
                rows={9}
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all leading-relaxed"
                placeholder="Paste raw telemetry, incident debrief, or intelligence stream here..."
              />
            </div>

            {/* Extracted Entities Chips */}
            {extractedEntities.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[10px] font-mono text-slate-400 mr-1">Extracted Entities:</span>
                {extractedEntities.map((ent, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  >
                    {ent}
                  </span>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right Column (5 cols): Configurable Parameters Matrix (Slide 2 & 3) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-b from-white/[0.03] to-purple-950/20 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Transformation Parameters
                </h3>
              </div>
              <span className="text-[10px] font-mono text-purple-400">Deterministic RAG</span>
            </div>

            {/* 1. Target Audience */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>1. Target Audience</span>
                <span className="text-[10px] text-purple-400">Domain Filter</span>
              </label>
              <select
                value={config.audience}
                onChange={(e) => setConfig({ ...config, audience: e.target.value as AudienceType })}
                className="w-full bg-[#0d0a1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="executive_decision">Executive Decision-Makers / Cabinet / Ministers</option>
                <option value="intelligence_analyst">Intelligence Analysts & Forensic Desks</option>
                <option value="defence_command">Strategic Defence & Military Command</option>
                <option value="strategic_comms">Strategic Communications & Public Affairs</option>
                <option value="public_press">Public Broadcast / Press / Media</option>
              </select>
            </div>

            {/* 2. Desired Tone */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>2. Desired Tone</span>
                <span className="text-[10px] text-purple-400">Classification Filter</span>
              </label>
              <select
                value={config.tone}
                onChange={(e) => setConfig({ ...config, tone: e.target.value as ToneType })}
                className="w-full bg-[#0d0a1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="classified_confidential">Classified / High-Precision Intelligence</option>
                <option value="urgent_threat_alert">Urgent Cyber Threat Advisory (CERT-In)</option>
                <option value="executive_formal">Executive Formal / Strategic Synthesis</option>
                <option value="technical_forensic">Technical Forensic / MITRE ATT&CK</option>
                <option value="public_broadcast">Public Advisory / Neutral Broadcast</option>
              </select>
            </div>

            {/* 3. Output Language */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>3. Language Target</span>
                <span className="text-[10px] text-purple-400">Multilingual</span>
              </label>
              <select
                value={config.language}
                onChange={(e) => setConfig({ ...config, language: e.target.value })}
                className="w-full bg-[#0d0a1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="English">English (Global Command)</option>
                <option value="Hindi">Hindi (हिंदी - National Command)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
                <option value="Japanese">Japanese (日本語)</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="Mandarin">Mandarin (中文)</option>
              </select>
            </div>

            {/* 4. Detail Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>4. Detail Level</span>
                <span className="text-[10px] text-purple-400">Granularity</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'executive_summary', label: 'Executive' },
                  { id: 'comprehensive_intelligence', label: 'Detailed' },
                  { id: 'tactical_bulletin', label: 'Tactical' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setConfig({ ...config, detail: item.id as DetailLevel })}
                    className={`py-2 px-2 text-[11px] font-mono rounded-lg border text-center transition-all cursor-pointer ${
                      config.detail === item.id
                        ? 'bg-purple-600/30 border-purple-500 text-purple-200 font-semibold'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Objective */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>5. Core Mission Objective</span>
                <span className="text-[10px] text-purple-400">Action Path</span>
              </label>
              <select
                value={config.objective}
                onChange={(e) => setConfig({ ...config, objective: e.target.value as ObjectiveType })}
                className="w-full bg-[#0d0a1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="threat_mitigation">Threat Mitigation & Tactical Containment</option>
                <option value="strategic_synthesis">Strategic Intelligence Synthesis</option>
                <option value="policy_briefing">Policy & Governance Briefing</option>
                <option value="incident_response">Active Incident Response Triage</option>
                <option value="public_awareness">Public Safety & Cyber Hygiene Advisory</option>
              </select>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Transform Action CTA */}
            <button
              id="btn-execute-transformation"
              disabled={isProcessing}
              onClick={handleExecuteTransformation}
              className={`w-full py-3.5 px-6 rounded-xl font-display font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-xl cursor-pointer ${
                isProcessing
                  ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/50 hover:shadow-purple-700/60 hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-300" />
                  <span>Processing Stage {currentStage}/7...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Transform Across 5 Parallel Formats</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

          </div>

          {/* Quick Active Result Summary Card if already generated */}
          {activeResult && !isProcessing && (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Last Result Ready ({activeResult.id})
                </span>
                <span>Block #{activeResult.blockchainRecord.index}</span>
              </div>
              <p className="text-xs text-slate-300">
                Grounded veracity score: <strong className="text-purple-300">{activeResult.factuality.groundingScore}%</strong>. 5 communication artefacts minted with SHA-256 notarization.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setActiveTab('artefacts')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors"
                >
                  View Parallel Outputs →
                </button>
                <button
                  onClick={() => setActiveTab('blockchain')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-colors"
                >
                  Verify Block Proof
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Live Pipeline Execution Feed (When Processing) */}
      {isProcessing && (
        <div className="bg-black/60 border border-purple-500/40 rounded-2xl p-6 space-y-4 glow-purple">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Live Implementation Pipeline Execution Telemetry
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400">NTRO ENGINE RUNNING</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { num: 1, title: 'Multimodal Ingest' },
              { num: 2, title: 'Secure OCR/STT' },
              { num: 3, title: 'Entity Extract' },
              { num: 4, title: 'Semantic RAG' },
              { num: 5, title: '5x Synthesizers' },
              { num: 6, title: 'Factual Validate' },
              { num: 7, title: 'Blockchain Anchor' },
            ].map((stg) => (
              <div
                key={stg.num}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  currentStage === stg.num
                    ? 'bg-purple-600/30 border-purple-400 text-white font-bold animate-pulse'
                    : currentStage > stg.num
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/[0.02] border-white/5 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">STAGE {stg.num}</div>
                <div className="text-xs mt-0.5">{stg.title}</div>
              </div>
            ))}
          </div>

          <div className="bg-black/80 rounded-xl p-3 font-mono text-xs text-purple-300 space-y-1 max-h-36 overflow-y-auto border border-purple-900/30">
            {pipelineLogs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
