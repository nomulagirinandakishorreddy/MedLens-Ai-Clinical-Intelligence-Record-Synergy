export type ProvenanceType = 'USER_PROVIDED' | 'AI_EXTRACTED' | 'CLINICIAN_VERIFIED';

export type LabStatus = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';

export interface SourceLocation {
  documentId: string;
  documentName: string;
  pageNumber: number;
  snippet: string;
  bbox?: { top: number; left: number; width: number; height: number }; // percentage based
}

export interface AlternativeInterpretation {
  value: string;
  confidence: number; // 0 - 100
  reasoning: string;
}

export interface LabResult {
  id: string;
  testName: string;
  loincCode?: string;
  category: 'Metabolic' | 'Lipid' | 'Thyroid' | 'Hematology' | 'Renal' | 'Hepatic' | 'Other';
  value: number;
  unit: string;
  referenceRangeMin: number;
  referenceRangeMax: number;
  referenceRangeText: string;
  status: LabStatus;
  testDate: string;
  facility: string;
  providerName?: string;
  documentId: string;
  provenance: ProvenanceType;
  confidenceScore: number; // e.g. 96
  sourceLocation: SourceLocation;
  alternativeReadings?: AlternativeInterpretation[];
  personalBaselineMean?: number;
  personalBaselineStd?: number;
  isPersonalAnomaly?: boolean; // anomaly compared to personal baseline even if within population range
  velocityChange?: string; // e.g. "+35% in 30 days"
  comments?: CareComment[];
  cptCode?: string;
  estimatedCost?: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  prescriber: string;
  purpose: string;
  provenance: ProvenanceType;
  knownSideEffectsOnLabs?: string[];
  monitoringIntervalMonths?: number; // e.g. 6 for Lithium or Statins
  lastCheckedDate?: string;
}

export interface Condition {
  id: string;
  name: string;
  icd10?: string;
  diagnosedDate: string;
  status: 'Active' | 'Resolved' | 'Suspected';
  provenance: ProvenanceType;
  recommendedTestsInterval?: { testName: string; intervalMonths: number }[];
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  provenance: ProvenanceType;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  bloodType: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bpSystolic: number;
  bpDiastolic: number;
  primaryPhysician: string;
  emergencyContact: { name: string; relation: string; phone: string };
  sdoh: {
    housingStability: 'Stable' | 'At Risk' | 'Unstable';
    foodSecurity: 'High' | 'Moderate' | 'Low';
    transportationAccess: 'Reliable' | 'Limited' | 'None';
    financialStress: 'Low' | 'Moderate' | 'High';
  };
  labs?: LabResult[];
  medications?: Medication[];
  conditions?: Condition[];
  allergies?: Allergy[];
}

export interface CrossValidationAlert {
  id: string;
  type: 'DIAGNOSIS_MED_CONFLICT' | 'DUPLICATE_TEST' | 'MISSING_STANDARD_TEST' | 'LAB_DISCREPANCY';
  title: string;
  description: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  affectedDocuments?: string[];
  actionRequired?: string;
  dateFlagged: string;
}

export interface DrugLabInteractionAlert {
  id: string;
  medicationName: string;
  labTestName: string;
  type: 'KNOWN_SIDE_EFFECT' | 'MONITORING_GAP' | 'CONTRAINDICATION_RISK';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
  recommendation: string;
}

export interface FamilyMemberRecord {
  id: string;
  relation: 'Father' | 'Mother' | 'Brother' | 'Sister' | 'Grandfather' | 'Grandmother' | 'Child';
  name: string;
  age?: number;
  conditions: string[];
  notes?: string;
  hasSharedEnvironment?: boolean;
}

export interface FamilyPatternAlert {
  id: string;
  patternName: string;
  affectedMembersCount: number;
  description: string;
  recommendation: string;
}

export interface ClinicalTrialMatch {
  id: string;
  nctId: string;
  title: string;
  phase: string;
  sponsor: string;
  location: string;
  matchScore: number; // 0 - 100
  matchingBiomarkers: string[];
  eligibilitySummary: string;
  status: 'Recruiting' | 'Enrolling by Invitation';
}

export interface SdohReferral {
  id: string;
  category: string;
  programName: string;
  description: string;
  contactInfo: string;
  eligibilityCriteria: string;
  linkedLabFinding?: string;
}

export interface RiskStratification {
  cardiovascularRisk: {
    scorePercentage: number;
    category: 'Low' | 'Borderline' | 'Intermediate' | 'High';
    modifiableFactors: string[];
    nonModifiableFactors: string[];
  };
  metabolicRisk: {
    scorePercentage: number;
    category: 'Low' | 'Moderate' | 'Elevated';
    modifiableFactors: string[];
    nonModifiableFactors: string[];
  };
}

export interface CareComment {
  id: string;
  authorName: string;
  authorRole: 'Patient' | 'Primary Care Doctor' | 'Specialist' | 'Nutritionist';
  text: string;
  timestamp: string;
}

export interface CareCircleShare {
  id: string;
  recipientEmail: string;
  recipientRole: string;
  grantedDate: string;
  expiresInDays: number;
  accessibleCategories: string[]; // e.g. ["Metabolic", "Lipid"]
  accessLink: string;
}

export interface AmbientTranscript {
  id: string;
  visitDate: string;
  physicianName: string;
  rawText: string;
  extractedActionItems: { task: string; dueDate?: string; type: 'LAB_REORDER' | 'MED_ADJUSTMENT' | 'REFERRAL' }[];
  summary: string;
}

export interface LiteracyQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedTestName: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface MedicalDocument {
  id: string;
  fileName: string;
  uploadDate: string;
  facility: string;
  doctorName: string;
  fileType: 'pdf' | 'image' | 'text';
  rawText: string;
  extractedLabCount: number;
  overallConfidence: number; // percentage
}
