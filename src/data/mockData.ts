import {
  PatientProfile,
  MedicalDocument,
  LabResult,
  Medication,
  Condition,
  Allergy,
  CrossValidationAlert,
  DrugLabInteractionAlert,
  FamilyMemberRecord,
  FamilyPatternAlert,
  ClinicalTrialMatch,
  SdohReferral,
  RiskStratification,
  CareCircleShare,
  AmbientTranscript,
  LiteracyQuizQuestion,
  AchievementBadge
} from '../types/medlens';

export const INITIAL_PATIENT: PatientProfile = {
  id: 'pt-101',
  name: 'Eleanor Vance',
  age: 54,
  sex: 'Female',
  bloodType: 'A Positive (A+)',
  heightCm: 165,
  weightKg: 78,
  bmi: 28.7,
  bpSystolic: 134,
  bpDiastolic: 86,
  primaryPhysician: 'Dr. Marcus Vance, MD (St. Jude Internal Medicine)',
  emergencyContact: {
    name: 'Robert Vance',
    relation: 'Spouse',
    phone: '+1 (555) 234-8901'
  },
  sdoh: {
    housingStability: 'Stable',
    foodSecurity: 'Low', // Triggers SDOH low iron correlation
    transportationAccess: 'Reliable',
    financialStress: 'Moderate'
  }
};

export const INITIAL_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-001',
    fileName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
    uploadDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    doctorName: 'Dr. Marcus Vance',
    fileType: 'pdf',
    extractedLabCount: 7,
    overallConfidence: 96,
    rawText: `PATIENT REPORT - QUEST DIAGNOSTICS
Patient: Eleanor Vance | DOB: 1972-04-12 | Sex: F
Specimen Collected: 2026-08-15 08:30 AM
Ordering Physician: Dr. Marcus Vance

COMPREHENSIVE METABOLIC & LIPID PANEL
Test Name                 Result      Units       Reference Range   Flag
-------------------------------------------------------------------------
Glucose, Fasting          118         mg/dL       70 - 99           HIGH
HbA1c                     7.1         %           4.0 - 5.6         HIGH
eGFR (CKD-EPI)            52          mL/min/1.73 > 60              LOW
Serum Creatinine          1.45        mg/dL       0.50 - 1.10       HIGH
Serum Potassium           5.2         mEq/L       3.5 - 5.0         HIGH
Vitamin B12               185         pg/mL       200 - 900         LOW
TSH                       4.2         mIU/L       0.45 - 4.50       NORMAL (Elevated Personal Trend)
Total Cholesterol         228         mg/dL       125 - 200         HIGH

NOTES: Patient reports mild peripheral fatigue. Kidney eGFR shows downward trajectory compared to 2025 records.`
  },
  {
    id: 'doc-002',
    fileName: 'Mercy_Health_Endocrine_and_Thyroid_Panel_2026-02-10.pdf',
    uploadDate: '2026-02-10',
    facility: 'Mercy Health Endocrinology Center',
    doctorName: 'Dr. Sarah Lin',
    fileType: 'pdf',
    extractedLabCount: 5,
    overallConfidence: 94,
    rawText: `MERCY HEALTH SYSTEM - CLINICAL LABORATORY REPORT
Patient Name: Eleanor Vance
Collection Date: 2026-02-10 09:15 AM

THYROID & METABOLIC SURVEILLANCE
Test Name                 Result      Units       Reference Range   Flag
-------------------------------------------------------------------------
TSH                       2.8         mIU/L       0.45 - 4.50       NORMAL
Free T4                   1.2         ng/dL       0.8 - 1.8         NORMAL
Glucose, Fasting          108         mg/dL       70 - 99           HIGH
Serum Creatinine          1.18        mg/dL       0.50 - 1.10       HIGH
Vitamin B12               240         pg/mL       200 - 900         NORMAL`
  },
  {
    id: 'doc-003',
    fileName: 'St_Jude_Hospital_Discharge_Summary_2025-08-20.pdf',
    uploadDate: '2025-08-20',
    facility: 'St. Jude Memorial Hospital',
    doctorName: 'Dr. Aris Thorne',
    fileType: 'pdf',
    extractedLabCount: 4,
    overallConfidence: 91,
    rawText: `ST. JUDE HOSPITAL SUMMARY
Patient: Eleanor Vance
Date: 2025-08-20

HISTORICAL BASELINE LABS
Test Name                 Result      Units       Reference Range   Flag
-------------------------------------------------------------------------
Glucose, Fasting          98          mg/dL       70 - 99           NORMAL
HbA1c                     6.2         %           4.0 - 5.6         HIGH
Serum Creatinine          0.92        mg/dL       0.50 - 1.10       NORMAL
Vitamin B12               320         pg/mL       200 - 900         NORMAL`
  }
];

export const INITIAL_LAB_RESULTS: LabResult[] = [
  {
    id: 'lab-101',
    testName: 'Glucose, Fasting',
    loincCode: '1558-6',
    category: 'Metabolic',
    value: 118,
    unit: 'mg/dL',
    referenceRangeMin: 70,
    referenceRangeMax: 99,
    referenceRangeText: '70 - 99 mg/dL',
    status: 'HIGH',
    testDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    providerName: 'Dr. Marcus Vance',
    documentId: 'doc-001',
    provenance: 'AI_EXTRACTED',
    confidenceScore: 98,
    sourceLocation: {
      documentId: 'doc-001',
      documentName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
      pageNumber: 1,
      snippet: 'Glucose, Fasting 118 mg/dL (Ref: 70 - 99)',
      bbox: { top: 22, left: 10, width: 80, height: 4 }
    },
    personalBaselineMean: 108,
    personalBaselineStd: 10,
    isPersonalAnomaly: false,
    velocityChange: '+9.2% in 6 months',
    cptCode: '82947',
    estimatedCost: 28,
    comments: [
      {
        id: 'c-1',
        authorName: 'Dr. Marcus Vance',
        authorRole: 'Primary Care Doctor',
        text: 'Elevated fasting blood sugar. Correlates with rising HbA1c trajectory.',
        timestamp: '2026-08-16 10:30 AM'
      }
    ]
  },
  {
    id: 'lab-102',
    testName: 'HbA1c',
    loincCode: '4548-4',
    category: 'Metabolic',
    value: 7.1,
    unit: '%',
    referenceRangeMin: 4.0,
    referenceRangeMax: 5.6,
    referenceRangeText: '4.0 - 5.6 %',
    status: 'HIGH',
    testDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    providerName: 'Dr. Marcus Vance',
    documentId: 'doc-001',
    provenance: 'AI_EXTRACTED',
    confidenceScore: 99,
    sourceLocation: {
      documentId: 'doc-001',
      documentName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
      pageNumber: 1,
      snippet: 'HbA1c 7.1 % (Ref: 4.0 - 5.6)',
      bbox: { top: 26, left: 10, width: 80, height: 4 }
    },
    personalBaselineMean: 6.65,
    personalBaselineStd: 0.45,
    isPersonalAnomaly: true,
    velocityChange: '+14.5% year-over-year',
    cptCode: '83036',
    estimatedCost: 45
  },
  {
    id: 'lab-103',
    testName: 'eGFR (CKD-EPI)',
    loincCode: '62238-1',
    category: 'Renal',
    value: 52,
    unit: 'mL/min/1.73',
    referenceRangeMin: 60,
    referenceRangeMax: 120,
    referenceRangeText: '> 60 mL/min/1.73',
    status: 'LOW',
    testDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    providerName: 'Dr. Marcus Vance',
    documentId: 'doc-001',
    provenance: 'AI_EXTRACTED',
    confidenceScore: 95,
    sourceLocation: {
      documentId: 'doc-001',
      documentName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
      pageNumber: 1,
      snippet: 'eGFR (CKD-EPI) 52 mL/min/1.73 (Ref: > 60)',
      bbox: { top: 30, left: 10, width: 80, height: 4 }
    },
    personalBaselineMean: 72,
    personalBaselineStd: 14,
    isPersonalAnomaly: true,
    velocityChange: '-27.7% drop (Rapid Velocity Risk)',
    cptCode: '82565',
    estimatedCost: 32,
    alternativeReadings: [
      { value: '52 mL/min/1.73', confidence: 95, reasoning: 'Clear standard print scan' },
      { value: '62 mL/min/1.73', confidence: 5, reasoning: 'Speckle artifact near numeral 5' }
    ]
  },
  {
    id: 'lab-104',
    testName: 'Serum Creatinine',
    loincCode: '2160-0',
    category: 'Renal',
    value: 1.45,
    unit: 'mg/dL',
    referenceRangeMin: 0.50,
    referenceRangeMax: 1.10,
    referenceRangeText: '0.50 - 1.10 mg/dL',
    status: 'HIGH',
    testDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    providerName: 'Dr. Marcus Vance',
    documentId: 'doc-001',
    provenance: 'AI_EXTRACTED',
    confidenceScore: 97,
    sourceLocation: {
      documentId: 'doc-001',
      documentName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
      pageNumber: 1,
      snippet: 'Serum Creatinine 1.45 mg/dL (Ref: 0.50 - 1.10)',
      bbox: { top: 34, left: 10, width: 80, height: 4 }
    },
    personalBaselineMean: 1.18,
    personalBaselineStd: 0.27,
    isPersonalAnomaly: true,
    velocityChange: '+22.8% increase in 6 months',
    cptCode: '82565',
    estimatedCost: 24
  },
  {
    id: 'lab-105',
    testName: 'Vitamin B12',
    loincCode: '2132-9',
    category: 'Metabolic',
    value: 185,
    unit: 'pg/mL',
    referenceRangeMin: 200,
    referenceRangeMax: 900,
    referenceRangeText: '200 - 900 pg/mL',
    status: 'LOW',
    testDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    providerName: 'Dr. Marcus Vance',
    documentId: 'doc-001',
    provenance: 'AI_EXTRACTED',
    confidenceScore: 94,
    sourceLocation: {
      documentId: 'doc-001',
      documentName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
      pageNumber: 1,
      snippet: 'Vitamin B12 185 pg/mL (Ref: 200 - 900)',
      bbox: { top: 42, left: 10, width: 80, height: 4 }
    },
    personalBaselineMean: 280,
    personalBaselineStd: 65,
    isPersonalAnomaly: true,
    velocityChange: '-42.1% drop since 2025 (Metformin Side Effect)',
    cptCode: '82607',
    estimatedCost: 65
  },
  {
    id: 'lab-106',
    testName: 'TSH',
    loincCode: '11580-8',
    category: 'Thyroid',
    value: 4.2,
    unit: 'mIU/L',
    referenceRangeMin: 0.45,
    referenceRangeMax: 4.50,
    referenceRangeText: '0.45 - 4.50 mIU/L',
    status: 'NORMAL',
    testDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    providerName: 'Dr. Marcus Vance',
    documentId: 'doc-001',
    provenance: 'AI_EXTRACTED',
    confidenceScore: 96,
    sourceLocation: {
      documentId: 'doc-001',
      documentName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
      pageNumber: 1,
      snippet: 'TSH 4.2 mIU/L (Ref: 0.45 - 4.50)',
      bbox: { top: 46, left: 10, width: 80, height: 4 }
    },
    personalBaselineMean: 2.7,
    personalBaselineStd: 0.4,
    isPersonalAnomaly: true, // Anomalously high for Eleanor even though < 4.5 population cutoff
    velocityChange: '+50% jump from baseline 2.8',
    cptCode: '84443',
    estimatedCost: 48
  },
  {
    id: 'lab-107',
    testName: 'Total Cholesterol',
    loincCode: '2093-3',
    category: 'Lipid',
    value: 228,
    unit: 'mg/dL',
    referenceRangeMin: 125,
    referenceRangeMax: 200,
    referenceRangeText: '125 - 200 mg/dL',
    status: 'HIGH',
    testDate: '2026-08-15',
    facility: 'Quest Diagnostics Regional Hub',
    providerName: 'Dr. Marcus Vance',
    documentId: 'doc-001',
    provenance: 'AI_EXTRACTED',
    confidenceScore: 97,
    sourceLocation: {
      documentId: 'doc-001',
      documentName: 'Quest_Diagnostics_Comprehensive_Blood_Panel_2026-08-15.pdf',
      pageNumber: 1,
      snippet: 'Total Cholesterol 228 mg/dL (Ref: 125 - 200)',
      bbox: { top: 50, left: 10, width: 80, height: 4 }
    },
    personalBaselineMean: 215,
    personalBaselineStd: 12,
    isPersonalAnomaly: false,
    cptCode: '82465',
    estimatedCost: 30
  }
];

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-01',
    name: 'Metformin HCl',
    dosage: '1000 mg',
    frequency: 'Twice daily with meals',
    startDate: '2024-03-10',
    prescriber: 'Dr. Marcus Vance',
    purpose: 'Type 2 Diabetes Management',
    provenance: 'USER_PROVIDED',
    knownSideEffectsOnLabs: ['Vitamin B12 depletion', 'Mild eGFR artifact'],
    monitoringIntervalMonths: 6,
    lastCheckedDate: '2026-08-15'
  },
  {
    id: 'med-02',
    name: 'Ibuprofen (NSAID)',
    dosage: '400 mg',
    frequency: 'As needed for joint pain (3x/week)',
    startDate: '2025-01-15',
    prescriber: 'Self / OTC',
    purpose: 'Osteoarthritis Symptom Relief',
    provenance: 'USER_PROVIDED',
    knownSideEffectsOnLabs: ['Renal toxicity / eGFR decline', 'Serum Creatinine elevation'],
    monitoringIntervalMonths: 3,
    lastCheckedDate: '2026-08-15'
  },
  {
    id: 'med-03',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily in the morning',
    startDate: '2023-11-01',
    prescriber: 'Dr. Marcus Vance',
    purpose: 'Hypertension & Renal Protection',
    provenance: 'USER_PROVIDED',
    knownSideEffectsOnLabs: ['Hyperkalemia (Elevated Potassium)', 'Serum Creatinine transient bump'],
    monitoringIntervalMonths: 6,
    lastCheckedDate: '2026-08-15'
  },
  {
    id: 'med-04',
    name: 'Lithium Carbonate',
    dosage: '300 mg',
    frequency: 'Once daily at bedtime',
    startDate: '2022-06-01',
    prescriber: 'Dr. Helen Vance (Psychiatry)',
    purpose: 'Mood Stabilization',
    provenance: 'USER_PROVIDED',
    knownSideEffectsOnLabs: ['Nephrotoxicity', 'Thyroid dysfunction (Elevated TSH)', 'Therapeutic Serum Level Monitoring Required'],
    monitoringIntervalMonths: 6,
    lastCheckedDate: '2025-10-10' // 10 MONTHS AGO -> MONITORING GAP ALERT!
  }
];

export const INITIAL_CONDITIONS: Condition[] = [
  {
    id: 'cond-01',
    name: 'Type 2 Diabetes Mellitus',
    icd10: 'E11.9',
    diagnosedDate: '2024-03-10',
    status: 'Active',
    provenance: 'CLINICIAN_VERIFIED',
    recommendedTestsInterval: [
      { testName: 'HbA1c', intervalMonths: 6 },
      { testName: 'Urine Albumin-to-Creatinine Ratio', intervalMonths: 12 },
      { testName: 'Comprehensive Metabolic Panel', intervalMonths: 6 }
    ]
  },
  {
    id: 'cond-02',
    name: 'Essential Hypertension',
    icd10: 'I10',
    diagnosedDate: '2023-11-01',
    status: 'Active',
    provenance: 'CLINICIAN_VERIFIED'
  },
  {
    id: 'cond-03',
    name: 'Stage 3a Chronic Kidney Disease (Suspected)',
    icd10: 'N18.31',
    diagnosedDate: '2026-08-16',
    status: 'Suspected',
    provenance: 'AI_EXTRACTED'
  }
];

export const INITIAL_ALLERGIES: Allergy[] = [
  {
    id: 'alg-01',
    allergen: 'Penicillin',
    reaction: 'Hives & Facial Swelling',
    severity: 'Severe',
    provenance: 'USER_PROVIDED'
  },
  {
    id: 'alg-02',
    allergen: 'Sulfa Drugs',
    reaction: 'Mild Cutaneous Rash',
    severity: 'Moderate',
    provenance: 'USER_PROVIDED'
  }
];

export const CROSS_VALIDATION_ALERTS: CrossValidationAlert[] = [
  {
    id: 'cv-101',
    type: 'DIAGNOSIS_MED_CONFLICT',
    title: 'Conflicting Medication & Diagnosis Pattern',
    description: 'Patient record lists active prescription for Lithium Carbonate (Mood Stabilizer), but recent discharge summary from St. Jude listed Bipolar Disorder as "Resolved" while primary chart retains active therapy.',
    severity: 'WARNING',
    affectedDocuments: ['doc-001', 'doc-003'],
    actionRequired: 'Clarify with Prescriber Dr. Helen Vance regarding continued therapeutic necessity.',
    dateFlagged: '2026-08-16'
  },
  {
    id: 'cv-102',
    type: 'DUPLICATE_TEST',
    title: 'Duplicate Lipid Testing Detected Across Facilities',
    description: 'Lipid Panel requested at Quest Diagnostics (2026-08-15) duplicates identical test completed at Mercy Health 21 days prior (2026-07-25).',
    severity: 'INFO',
    affectedDocuments: ['doc-001', 'doc-002'],
    actionRequired: 'Share previous Mercy Health digital record with Dr. Vance to prevent non-reimbursed duplicate billing.',
    dateFlagged: '2026-08-15'
  },
  {
    id: 'cv-103',
    type: 'MISSING_STANDARD_TEST',
    title: 'Surveillance Gap: Diabetic Microalbuminuria Screening Missing',
    description: 'Standard Clinical Guidelines require annual Urine Albumin-to-Creatinine Ratio for patients with T2D & eGFR < 60. Last recorded urine screen: > 14 months ago.',
    severity: 'CRITICAL',
    affectedDocuments: ['doc-001'],
    actionRequired: 'Request order for Spot Urine Albumin-to-Creatinine Ratio at upcoming consultation.',
    dateFlagged: '2026-08-16'
  }
];

export const DRUG_LAB_INTERACTION_ALERTS: DrugLabInteractionAlert[] = [
  {
    id: 'dli-01',
    medicationName: 'Metformin HCl',
    labTestName: 'Vitamin B12',
    type: 'KNOWN_SIDE_EFFECT',
    severity: 'HIGH',
    explanation: 'Long-term Metformin usage (> 2 years) inhibits ileal absorption of Vitamin B12. Eleanor\'s current level is 185 pg/mL (Low), down 42.1% from baseline.',
    recommendation: 'Discuss sublingual Methylcobalamin B12 supplementation (1000 mcg/day) with primary physician.'
  },
  {
    id: 'dli-02',
    medicationName: 'Lithium Carbonate',
    labTestName: 'Therapeutic Lithium Level & TSH',
    type: 'MONITORING_GAP',
    severity: 'HIGH',
    explanation: 'Lithium therapy requires serum lithium monitoring every 6 months to avoid renal toxicity. Last level recorded 10 months ago.',
    recommendation: 'Order serum Lithium trough level and repeat TSH before next refill.'
  },
  {
    id: 'dli-03',
    medicationName: 'Ibuprofen (NSAID)',
    labTestName: 'eGFR & Serum Creatinine',
    type: 'CONTRAINDICATION_RISK',
    severity: 'HIGH',
    explanation: 'Regular NSAID use in the setting of eGFR = 52 mL/min/1.73 and ACE-inhibitor (Lisinopril) therapy severely increases triple-whammy acute kidney injury risk.',
    recommendation: 'Consider transitioning joint pain management to Topical NSAIDs or Acetaminophen under medical advice.'
  }
];

export const FAMILY_MEMBERS: FamilyMemberRecord[] = [
  {
    id: 'fm-01',
    relation: 'Mother',
    name: 'Martha Vance',
    age: 78,
    conditions: ['Hypothyroidism (Hashimoto\'s)', 'Type 2 Diabetes', 'Osteoporosis'],
    notes: 'Diagnosed with hypothyroidism at age 48.',
    hasSharedEnvironment: true
  },
  {
    id: 'fm-02',
    relation: 'Sister',
    name: 'Clara Vance',
    age: 51,
    conditions: ['Hypothyroidism', 'Hypercholesterolemia'],
    notes: 'Taking Levothyroxine 75 mcg daily.'
  },
  {
    id: 'fm-03',
    relation: 'Father',
    name: 'Arthur Vance',
    age: 82,
    conditions: ['Coronary Artery Disease', 'Hypertension', 'CKD Stage 3'],
    notes: 'History of CABG at age 65.'
  }
];

export const FAMILY_PATTERN_ALERTS: FamilyPatternAlert[] = [
  {
    id: 'fpa-01',
    patternName: 'Strong Familial Endocrine & Thyroid Cluster',
    affectedMembersCount: 3,
    description: '3 primary female line relatives (Mother, Sister, Self) present with thyroid dysregulation or elevated TSH trajectory.',
    recommendation: 'Recommend Anti-TPO (Thyroid Peroxidase Antibody) titer panel to screen for early autoimmune thyroiditis.'
  },
  {
    id: 'fpa-02',
    patternName: 'Cardiorenal Risk Concordance',
    affectedMembersCount: 2,
    description: 'Father and Self exhibit co-occurring Hypertension and progressive renal function decline (eGFR < 60).',
    recommendation: 'Emphasize tight BP target (< 120/80 mmHg) and nephroprotective lifestyle strategies.'
  }
];

export const CLINICAL_TRIALS: ClinicalTrialMatch[] = [
  {
    id: 'trial-01',
    nctId: 'NCT05984123',
    title: 'Evaluation of Novel SGLT2-Inhibitor Cardiorenal Protection in Early Stage 3 CKD with T2D',
    phase: 'Phase 3',
    sponsor: 'St. Jude Clinical Research Institute',
    location: 'Metropolitan Medical Center (12 miles away)',
    matchScore: 96,
    matchingBiomarkers: ['HbA1c 7.1%', 'eGFR 52 mL/min', 'Serum Creatinine 1.45'],
    eligibilitySummary: 'Adults aged 40-75 with Type 2 Diabetes, eGFR 30-60 mL/min/1.73, and active ACE inhibitor regimen.',
    status: 'Recruiting'
  },
  {
    id: 'trial-02',
    nctId: 'NCT06129840',
    title: 'Oral Vitamin B12 Repletion Protocol in Metformin-Induced Absorption Deficits',
    phase: 'Phase 2',
    sponsor: 'National Institute of Diabetes and Digestive Diseases',
    location: 'University Health Sciences Center (18 miles away)',
    matchScore: 91,
    matchingBiomarkers: ['Metformin therapy > 12 mos', 'Serum B12 < 200 pg/mL'],
    eligibilitySummary: 'Metformin-treated T2D patients with confirmed B12 deficiency (< 200 pg/mL).',
    status: 'Recruiting'
  }
];

export const SDOH_REFERRALS: SdohReferral[] = [
  {
    id: 'sdoh-ref-01',
    category: 'Nutritional Support & Food Security',
    programName: 'Community Fresh Produce & Medically Tailored Meals',
    description: 'Provides free bi-weekly deliveries of fresh nutrient-rich produce and B12-fortified foods for patients managing chronic metabolic conditions.',
    contactInfo: 'Call 1-800-555-FOOD or visit freshnutrition.org',
    eligibilityCriteria: 'Patients with documented food insecurity and metabolic diagnoses.',
    linkedLabFinding: 'Vitamin B12 185 pg/mL (Low) + Low Food Security Score'
  },
  {
    id: 'sdoh-ref-02',
    category: 'Medication Copay Assistance',
    programName: 'RxProtect Prescription Relief Foundation',
    description: 'Offers grants covering up to $150/month for diabetic and hypertension medications.',
    contactInfo: 'Apply at rxprotect.org / Direct Line: (555) 019-2834',
    eligibilityCriteria: 'Moderate financial stress score + active chronic prescriptions.'
  }
];

export const INITIAL_RISK_STRATIFICATION: RiskStratification = {
  cardiovascularRisk: {
    scorePercentage: 18.4, // Elevated 10-Year ASCVD Risk
    category: 'Intermediate',
    modifiableFactors: [
      'Total Cholesterol (228 mg/dL)',
      'Fasting Glucose (118 mg/dL)',
      'Systolic BP (134 mmHg)',
      'BMI (28.7 kg/m²)'
    ],
    nonModifiableFactors: [
      'Age (54 years)',
      'Paternal History of Early Coronary Artery Disease'
    ]
  },
  metabolicRisk: {
    scorePercentage: 68.0,
    category: 'Elevated',
    modifiableFactors: [
      'HbA1c (7.1%)',
      'eGFR Decline (52 mL/min)',
      'Regular OTC NSAID Use'
    ],
    nonModifiableFactors: [
      'Maternal History of T2D & Hashimoto Thyroiditis'
    ]
  }
};

export const INITIAL_CARE_SHARES: CareCircleShare[] = [
  {
    id: 'share-01',
    recipientEmail: 'dr.lin@mercyhealth.org',
    recipientRole: 'Endocrinologist',
    grantedDate: '2026-08-16',
    expiresInDays: 30,
    accessibleCategories: ['Metabolic', 'Thyroid'],
    accessLink: 'https://medlens.health/share/token-892374'
  },
  {
    id: 'share-02',
    recipientEmail: 'sarah.nutritionist@wellness.org',
    recipientRole: 'Clinical Nutritionist',
    grantedDate: '2026-08-10',
    expiresInDays: 14,
    accessibleCategories: ['Metabolic', 'Lipid'],
    accessLink: 'https://medlens.health/share/token-110294'
  }
];

export const AMBIENT_VISIT_TRANSCRIPT: AmbientTranscript = {
  id: 'amb-101',
  visitDate: '2026-08-15',
  physicianName: 'Dr. Marcus Vance, MD',
  rawText: `Dr. Vance: Good morning Eleanor. I reviewed your recent lab report from Quest. Your HbA1c came in at 7.1%, which means your blood sugar control needs some adjustment. Also, your kidney numbers show eGFR at 52 and creatinine at 1.45.
Eleanor: Oh dear. Is that why I've been feeling so tired lately?
Dr. Vance: Part of the fatigue is likely your Vitamin B12, which dropped to 185 pg/mL. That's a known side effect of long-term Metformin. I'd like to start you on a sublingual B12 supplement today. Also, I noticed you've been taking OTC Ibuprofen regularly for your knee pain—with your kidney eGFR at 52, we must stop Ibuprofen immediately as it strains the kidneys.
Eleanor: Okay, I will stop taking Ibuprofen.
Dr. Vance: Excellent. I want you to repeat a Complete Metabolic Panel and B12 in 3 months. Also, I will put in a referral for a spot urine protein check next week.`,
  summary: 'Consultation focused on HbA1c rise (7.1%), eGFR decline (52), Metformin-induced B12 drop (185 pg/mL), and immediate cessation of NSAID (Ibuprofen).',
  extractedActionItems: [
    { task: 'Stop OTC Ibuprofen immediately to protect kidney function', dueDate: 'Immediate', type: 'MED_ADJUSTMENT' },
    { task: 'Begin Sublingual Vitamin B12 (1000 mcg daily)', dueDate: 'Within 24 hours', type: 'MED_ADJUSTMENT' },
    { task: 'Schedule Spot Urine Albumin-to-Creatinine Ratio test', dueDate: 'Next 7 days', type: 'LAB_REORDER' },
    { task: 'Repeat Comprehensive Metabolic Panel & Vitamin B12 in 90 days', dueDate: '2026-11-15', type: 'LAB_REORDER' }
  ]
};

export const LITERACY_QUIZ: LiteracyQuizQuestion[] = [
  {
    id: 'q-1',
    question: 'What does an eGFR value below 60 mL/min/1.73 indicate in a blood report?',
    options: [
      'Optimal liver protein synthesis',
      'Reduced kidney filtration capacity requiring physician evaluation',
      'High thyroid hormone activity',
      'Dehydration only'
    ],
    correctIndex: 1,
    explanation: 'eGFR (estimated Glomerular Filtration Rate) measures how well your kidneys filter waste from your blood. A value below 60 suggests reduced filtration capacity.',
    relatedTestName: 'eGFR (CKD-EPI)'
  },
  {
    id: 'q-2',
    question: 'Why is Vitamin B12 monitoring important for patients taking Metformin for Type 2 Diabetes?',
    options: [
      'Metformin increases B12 to toxic levels',
      'Metformin has no impact on vitamins',
      'Long-term Metformin can reduce Vitamin B12 absorption in the intestine',
      'B12 replaces the need for blood sugar medication'
    ],
    correctIndex: 2,
    explanation: 'Metformin can interfere with how the body absorbs Vitamin B12 in the lower intestine, leading to gradual depletion and potential fatigue or nerve tingling.',
    relatedTestName: 'Vitamin B12'
  },
  {
    id: 'q-3',
    question: 'What is the key difference between a Lab Reference Range and a Personal Baseline?',
    options: [
      'Lab ranges apply to the broad population; Personal Baseline tracks your individual historical average.',
      'Personal Baseline is set by insurance companies.',
      'Lab ranges never change regardless of age.',
      'They mean exactly the same thing.'
    ],
    correctIndex: 0,
    explanation: 'Lab reference ranges are built from large population averages. Your Personal Baseline tracks your own historical trend, allowing MedLens to detect personal jumps even while still within standard lab limits.',
    relatedTestName: 'Personal Baseline'
  }
];

export const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'badge-1',
    title: 'Clinical Data Sentinel',
    description: 'Successfully processed and cross-referenced 3+ medical reports across healthcare systems.',
    iconName: 'ShieldCheck',
    unlocked: true,
    unlockedAt: '2026-08-16'
  },
  {
    id: 'badge-2',
    title: 'Medication Safety Guardian',
    description: 'Identified a critical Drug-Lab interaction and NSAID kidney safety alert.',
    iconName: 'Pill',
    unlocked: true,
    unlockedAt: '2026-08-16'
  },
  {
    id: 'badge-3',
    title: 'Health Literacy Master',
    description: 'Completed 3 daily health literacy micro-lessons and passed the interactive quiz.',
    iconName: 'GraduationCap',
    unlocked: false
  },
  {
    id: 'badge-4',
    title: 'Care Circle Commander',
    description: 'Configured role-based access for care team members with automated expiration timers.',
    iconName: 'Users',
    unlocked: true,
    unlockedAt: '2026-08-10'
  }
];
