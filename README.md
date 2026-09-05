# MedLens — AI-Powered Clinical Information Intelligence & Record Synergy

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-sky.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg)](https://vitejs.dev/)
[![FHIR R4](https://img.shields.io/badge/Interoperability-FHIR%20R4-emerald.svg)](https://hl7.org/fhir/)

**MedLens** is a state-of-the-art AI application designed to aggregate fragmented patient history, laboratory reports, prescriptions, and clinical notes into a structured, explainable, traceable, and reviewable patient record.

---

## 🌟 Key Capabilities & Architectural Pillars

### Core Features
- **Patient Information Intake**: Captures demographics, biological vitals, active prescriptions, clinical diagnoses, drug/environmental allergies, and Social Determinants of Health (SDOH).
- **Medical Report Processor**: Extraction engine for clinical PDF/Image/Text reports (Glucose, HbA1c, eGFR, Creatinine, TSH, B12, Cholesterol) preserving exact reference ranges without hallucinating synthetic population limits.
- **Structured Medical Record**: Filterable table & card views with reference-range badges (`LOW`, `NORMAL`, `HIGH`, `CRITICAL`), personal velocity shift indicators, and line-item care team annotations.
- **Source & Provenance Engine**: Tagging every record item as `USER_PROVIDED`, `AI_EXTRACTED`, or `CLINICIAN_VERIFIED`.
- **Safety Banners & Non-Diagnostic Guardrails**: Executive record summary with mandatory physician disclaimers.

---

## 🚀 15 Advanced Clinical Intelligence Engines

1. **Multi-Document Cross-Validation Engine**: Cross-references labs across providers to detect conflicting diagnosis/medication regimens, duplicate tests within 30 days, and routine surveillance gaps (e.g. diabetic profile missing HbA1c).
2. **Explainable AI with Source Highlighting**: Side-by-side document viewer highlighting source document lines and bounding box locations with OCR confidence heatmaps and alternative reading resolution.
3. **Patient-Specific Reference Range Learning & Velocity Analytics**: Calculates personal statistical baseline means (± std dev) and alerts on velocity shifts even when within population reference bounds (e.g. TSH jump from 2.7 to 4.2 mIU/L).
4. **Medication-Lab Interaction Checker**: Detects drug-induced lab shifts (Metformin -> Vitamin B12 depletion), Therapeutic Drug Monitoring gaps (Lithium check overdue), and NSAID renal contraindications.
5. **Natural Language Query (NLQ) & Voice Assistant**: Voice speech recognition (Web Speech API), text-to-speech synthesis playback, prompt pills, and direct source link triggers.
6. **Pre-Visit Preparation Generator**: Auto-generates a 1-page printable brief optimized for 15-minute consultations with top physician questions.
7. **Family Health Pattern Detection & Pedigree Tree**: Multi-profile support, hereditary pattern alerts, and an interactive Family Pedigree Tree chart.
8. **Clinical Trial & Research Matching Engine**: Biomarker matcher against active clinical trials with anonymized research dataset package exporter.
9. **Social Determinants of Health (SDOH) Integration**: Links social factors (food insecurity) to lab findings (low B12) and provides local community resource referrals.
10. **Predictive Risk Stratification**: Calculates 10-Year ASCVD Cardiovascular Risk and Metabolic Risk with modifiable vs non-modifiable driver breakdowns.
11. **Interoperability Bridge (FHIR R4 PDF + Emergency QR Code)**: Formats and exports FHIR R4 Bundle PDF documents and scannable offline Emergency QR code cards.
12. **Gamified Health Literacy Builder**: Daily micro-lesson cards, interactive quiz mode with confetti celebrations, and unlockable achievement badges.
13. **Collaborative Care Circle**: Role-based sharing permissions (7 to 90-day access timers) and line-item result comments.
14. **Ambient Visit Documentation Assistant**: Doctor-patient visit audio recorder simulator and NLP action item extractor.
15. **Healthcare Cost Transparency**: Maps lab tests to standard CPT billing codes, estimates out-of-pocket costs, and flags surprise out-of-network billing risks.

---

## 🛠 Tech Stack

- **Frontend Framework**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4 + Lucide React Icons
- **Data & Charts**: Recharts + Canvas Confetti
- **Document Export**: jsPDF (Formatted FHIR R4 PDF Generation)
- **Voice & Audio**: Web Speech Recognition & SpeechSynthesis APIs
- **Storage**: Browser LocalStorage for persistent per-patient records

---

## 🚀 Local Development Setup

```bash
# 1. Clone Repository
git clone https://github.com/nomulagirinandakishorreddy/MedLens-Ai-Clinical-Intelligence-Record-Synergy.git

# 2. Navigate to project directory
cd MedLens-Ai-Clinical-Intelligence-Record-Synergy

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev

# 5. Build for production
npm run build
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

*Disclaimer: MedLens is an informational clinical tool designed to organize patient data. It does not provide definitive medical diagnosis or treatment prescribing.*
