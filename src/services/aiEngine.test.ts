import { describe, it, expect } from 'vitest';
import { MedLensAiEngine } from './aiEngine';
import { INITIAL_PATIENT, INITIAL_LAB_RESULTS, INITIAL_MEDICATIONS, INITIAL_CONDITIONS } from '../data/mockData';
import { PatientProfile } from '../types/medlens';

const testPatientRecord: PatientProfile = {
  ...INITIAL_PATIENT,
  labs: INITIAL_LAB_RESULTS,
  medications: INITIAL_MEDICATIONS,
  conditions: INITIAL_CONDITIONS,
  allergies: [],
};

describe('MedLens AI Clinical Intelligence Engine', () => {
  it('Engine 1: extractReportEntities extracts structured clinical data from raw text', () => {
    const rawText = 'Patient exhibits HbA1c 7.8% and BP 138/86 mmHg with Metformin 500mg daily.';
    const result = MedLensAiEngine.extractReportEntities(rawText);

    expect(result.summary).toBeDefined();
    expect(result.keyFindings.length).toBeGreaterThan(0);
    expect(result.extractedLabs.length).toBeGreaterThan(0);
    expect(result.extractedLabs.some((l) => l.testName.includes('HbA1c'))).toBe(true);
  });

  it('Engine 2: analyzeDrugLabInteractions detects potential risks correctly', () => {
    const interactions = MedLensAiEngine.analyzeDrugLabInteractions(testPatientRecord);
    expect(Array.isArray(interactions)).toBe(true);
    expect(interactions.length).toBeGreaterThan(0);
    expect(interactions[0]).toHaveProperty('medication');
    expect(interactions[0]).toHaveProperty('labParameter');
    expect(interactions[0]).toHaveProperty('severity');
  });

  it('Engine 3: generateCrossValidation Audit detects conflicts across clinical domains', () => {
    const crossVal = MedLensAiEngine.generateCrossValidation(testPatientRecord);
    expect(crossVal).toHaveProperty('conflicts');
    expect(crossVal).toHaveProperty('reconciliations');
    expect(crossVal).toHaveProperty('auditScore');
    expect(crossVal.auditScore).toBeGreaterThanOrEqual(0);
    expect(crossVal.auditScore).toBeLessThanOrEqual(100);
  });

  it('Engine 4: calculateRiskStratification outputs score and risk tier', () => {
    const risk = MedLensAiEngine.calculateRiskStratification(testPatientRecord);
    expect(risk).toHaveProperty('score');
    expect(['Low', 'Moderate', 'High', 'Critical']).toContain(risk.tier);
    expect(risk.drivers.length).toBeGreaterThan(0);
    expect(risk.recommendations.length).toBeGreaterThan(0);
  });

  it('Engine 5: evaluateSdohFactors returns social determinants breakdown', () => {
    const sdoh = MedLensAiEngine.evaluateSdohFactors(testPatientRecord);
    expect(sdoh.factors.length).toBeGreaterThan(0);
    expect(sdoh.communityResources.length).toBeGreaterThan(0);
    expect(sdoh.impactScore).toBeDefined();
  });

  it('Engine 6: analyzeFamilyPedigree identifies hereditary risk flags', () => {
    const pedigree = MedLensAiEngine.analyzeFamilyPedigree(testPatientRecord);
    expect(pedigree.hereditaryRiskFlags.length).toBeGreaterThan(0);
    expect(pedigree.screeningRecommendations.length).toBeGreaterThan(0);
  });

  it('Engine 7: evaluateClinicalTrialEligibility matches relevant trial criteria', () => {
    const trials = MedLensAiEngine.evaluateClinicalTrialEligibility(testPatientRecord);
    expect(trials.length).toBeGreaterThan(0);
    expect(trials[0]).toHaveProperty('nctId');
    expect(trials[0]).toHaveProperty('matchScore');
  });

  it('Engine 8: analyzeCostTransparency calculates financial estimation and savings', () => {
    const cost = MedLensAiEngine.analyzeCostTransparency(testPatientRecord);
    expect(cost.annualEstimatedOutofPocket).toBeGreaterThan(0);
    expect(cost.savingsOpportunities.length).toBeGreaterThan(0);
  });

  it('Engine 9: calculatePersonalBaseline computes trajectory trends', () => {
    const baseline = MedLensAiEngine.calculatePersonalBaseline(testPatientRecord);
    expect(baseline.biomarkers.length).toBeGreaterThan(0);
    expect(baseline.overallStabilityScore).toBeGreaterThan(0);
  });

  it('Engine 10: generateFhirR4Bundle creates standard FHIR JSON bundle structure', () => {
    const fhir = MedLensAiEngine.generateFhirR4Bundle(testPatientRecord);
    expect(fhir.resourceType).toBe('Bundle');
    expect(fhir.type).toBe('document');
    expect(fhir.entry.length).toBeGreaterThan(0);
    expect(fhir.entry[0].resource.resourceType).toBe('Composition');
  });

  it('Engine 11: answerClinicalQuestion responds to AI assistant user queries', () => {
    const query = 'What are the risks of Metformin with impaired renal function?';
    const answer = MedLensAiEngine.answerClinicalQuestion(query, testPatientRecord);
    expect(answer).toBeDefined();
    expect(answer.length).toBeGreaterThan(20);
  });

  it('Engine 12: processAmbientAudio generates SOAP note draft', () => {
    const soap = MedLensAiEngine.processAmbientAudio('Patient reports mild shortness of breath upon exertion.');
    expect(soap.subjective).toBeDefined();
    expect(soap.assessment).toBeDefined();
    expect(soap.plan).toBeDefined();
  });

  it('Engine 13: generatePreVisitPrep outputs key clinical talking points', () => {
    const prep = MedLensAiEngine.generatePreVisitPrep(testPatientRecord);
    expect(prep.keyQuestions.length).toBeGreaterThan(0);
    expect(prep.symptomTimeline.length).toBeGreaterThan(0);
  });

  it('Engine 14: generateEmergencyQRPayload formats emergency responder JSON', () => {
    const qrData = MedLensAiEngine.generateEmergencyQRPayload(testPatientRecord);
    const parsed = JSON.parse(qrData);
    expect(parsed).toHaveProperty('patientId');
    expect(parsed).toHaveProperty('emergencyContacts');
  });

  it('Engine 15: getMedicalQuizQuestions provides diagnostic interactive questions', () => {
    const questions = MedLensAiEngine.getMedicalQuizQuestions();
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0]).toHaveProperty('question');
    expect(questions[0]).toHaveProperty('options');
    expect(questions[0]).toHaveProperty('correctIndex');
  });
});
