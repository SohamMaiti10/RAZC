export type SourceType = 'text' | 'pdf' | 'audio' | 'image' | 'web';

export type AudienceType = 
  | 'intelligence_analyst'
  | 'defence_command'
  | 'executive_decision'
  | 'strategic_comms'
  | 'public_press';

export type ToneType = 
  | 'classified_confidential'
  | 'urgent_threat_alert'
  | 'executive_formal'
  | 'public_broadcast'
  | 'technical_forensic';

export type DetailLevel = 
  | 'executive_summary'
  | 'comprehensive_intelligence'
  | 'tactical_bulletin';

export type ObjectiveType = 
  | 'threat_mitigation'
  | 'strategic_synthesis'
  | 'policy_briefing'
  | 'public_awareness'
  | 'incident_response';

export interface MultimodalSource {
  id: string;
  title: string;
  type: SourceType;
  content: string;
  rawFileName?: string;
  fileSize?: string;
  timestamp: string;
  sha256Hash: string;
  extractedEntities?: string[];
  classificationLevel?: 'TOP SECRET // NOFORN' | 'SECRET' | 'CONFIDENTIAL' | 'UNCLASSIFIED';
}

export interface TransformationConfig {
  audience: AudienceType;
  tone: ToneType;
  language: string;
  detail: DetailLevel;
  objective: ObjectiveType;
}

export interface ExecutiveBrief {
  title: string;
  executiveSummary: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE' | 'LOW';
  keyFindings: string[];
  strategicImpact: string;
  recommendedActions: {
    priority: 'P1' | 'P2' | 'P3';
    action: string;
    owner: string;
    timeline: string;
  }[];
  resourceRequirements: string;
}

export interface SecurityAdvisory {
  advisoryId: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  threatActors: string[];
  attackVector: string;
  indicatorsOfCompromise: {
    type: 'IP' | 'DOMAIN' | 'HASH' | 'CVE' | 'PATTERN';
    indicator: string;
    description: string;
  }[];
  mitreTechniques: {
    id: string;
    tactic: string;
    technique: string;
  }[];
  mitigationSteps: string[];
  certAdvisoryNote: string;
}

export interface SocialComms {
  linkedInPost: string;
  xThreads: {
    tweetNumber: number;
    content: string;
    hashtags: string[];
  }[];
  pressBulletin: string;
  targetHashtags: string[];
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  speakerNotes: string;
  visualSuggestion: string;
}

export interface SlideDeck {
  deckTitle: string;
  totalSlides: number;
  targetAudience: string;
  slides: SlideItem[];
}

export interface InfographicMetadata {
  headline: string;
  coreMetrics: {
    label: string;
    value: string;
    change?: string;
    direction?: 'up' | 'down' | 'neutral';
  }[];
  entityRelationships: {
    from: string;
    to: string;
    relation: string;
  }[];
  timelineEvents: {
    phase: string;
    timeframe: string;
    description: string;
  }[];
  visualPalette: string[];
}

export interface FactualityCitation {
  claim: string;
  sourceQuote: string;
  confidence: number;
  status: 'GROUNDED_VERIFIED' | 'SYNTHESIZED_SAFE' | 'POTENTIAL_DRIFT';
}

export interface FactualityReport {
  groundingScore: number; // 0 - 100%
  hallucinationRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  verifiedClaimsCount: number;
  totalClaimsCount: number;
  citations: FactualityCitation[];
  validationNotes: string;
}

export interface BlockchainBlock {
  index: number;
  timestamp: string;
  sourceHash: string;
  artefactsHash: string;
  merkleRoot: string;
  previousHash: string;
  blockHash: string;
  nonce: number;
  validatorNode: string;
  validatorSignature: string;
  status: 'CONFIRMED' | 'PENDING';
}

export interface TransformationResult {
  id: string;
  sourceId: string;
  sourceTitle: string;
  sourceHash: string;
  timestamp: string;
  config: TransformationConfig;
  executiveBrief: ExecutiveBrief;
  securityAdvisory: SecurityAdvisory;
  socialComms: SocialComms;
  slideDeck: SlideDeck;
  infographicMetadata: InfographicMetadata;
  factuality: FactualityReport;
  blockchainRecord: BlockchainBlock;
  rawArtefactsDigest: string;
}

export interface PipelineStageInfo {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  log: string;
  durationMs?: number;
}
