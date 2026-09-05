import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IntroPage } from './components/IntroPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';

import { OverviewTab } from './components/Views/OverviewTab';
import { CrossValidationTab } from './components/Views/CrossValidationTab';
import { LabRecordTab } from './components/Views/LabRecordTab';
import { DrugLabCheckerTab } from './components/Views/DrugLabCheckerTab';
import { PersonalBaselineTab } from './components/Views/PersonalBaselineTab';
import { RiskStratificationTab } from './components/Views/RiskStratificationTab';
import { FamilyPedigreeTab } from './components/Views/FamilyPedigreeTab';
import { ClinicalTrialsTab } from './components/Views/ClinicalTrialsTab';
import { SdohTab } from './components/Views/SdohTab';
import { CostTransparencyTab } from './components/Views/CostTransparencyTab';

import { PatientIntakeModal } from './components/PatientIntakeModal';
import { ReportUploaderModal } from './components/ReportUploaderModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { PreVisitPrepModal } from './components/PreVisitPrepModal';
import { EmergencyQRModal } from './components/EmergencyQRModal';
import { CareCircleModal } from './components/CareCircleModal';
import { AmbientRecorderModal } from './components/AmbientRecorderModal';
import { QuizModal } from './components/QuizModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';

import {
  INITIAL_PATIENT,
  INITIAL_DOCUMENTS,
  INITIAL_LAB_RESULTS,
  INITIAL_MEDICATIONS,
  INITIAL_CONDITIONS,
  INITIAL_ALLERGIES,
  CROSS_VALIDATION_ALERTS,
  DRUG_LAB_INTERACTION_ALERTS,
  FAMILY_MEMBERS,
  FAMILY_PATTERN_ALERTS,
  CLINICAL_TRIALS,
  SDOH_REFERRALS,
  INITIAL_RISK_STRATIFICATION,
  INITIAL_CARE_SHARES,
  AMBIENT_VISIT_TRANSCRIPT,
  LITERACY_QUIZ,
  INITIAL_BADGES
} from './data/mockData';

import { MedLensAiEngine } from './services/aiEngine';
import { PatientProfile, MedicalDocument, LabResult, CareCircleShare, Medication, Condition, Allergy } from './types/medlens';

export function App() {
  // Navigation Page Flow State: 'intro' | 'login' | 'signup' | 'dashboard'
  const [pageState, setPageStateInternal] = useState<'intro' | 'login' | 'signup' | 'dashboard'>('intro');

  // Change page state with window history push state for browser back button support
  const navigateTo = (newState: 'intro' | 'login' | 'signup' | 'dashboard') => {
    setPageStateInternal(newState);
    window.history.pushState({ pageState: newState }, '', `/#${newState}`);
  };

  // Synchronize browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.pageState) {
        setPageStateInternal(e.state.pageState);
      } else {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'login' || hash === 'signup' || hash === 'dashboard' || hash === 'intro') {
          setPageStateInternal(hash as any);
        } else {
          setPageStateInternal('intro');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Master Clinical Data State
  const [patient, setPatient] = useState<PatientProfile>(INITIAL_PATIENT);
  const [documents, setDocuments] = useState<MedicalDocument[]>(INITIAL_DOCUMENTS);
  const [labs, setLabs] = useState<LabResult[]>(INITIAL_LAB_RESULTS);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [conditions, setConditions] = useState<Condition[]>(INITIAL_CONDITIONS);
  const [allergies, setAllergies] = useState<Allergy[]>(INITIAL_ALLERGIES);
  const [crossValidationAlerts, setCrossValidationAlerts] = useState(CROSS_VALIDATION_ALERTS);
  const [drugLabAlerts, setDrugLabAlerts] = useState(DRUG_LAB_INTERACTION_ALERTS);
  const [familyMembers, setFamilyMembers] = useState(FAMILY_MEMBERS);
  const [familyPatternAlerts, setFamilyPatternAlerts] = useState(FAMILY_PATTERN_ALERTS);
  const [clinicalTrials, setClinicalTrials] = useState(CLINICAL_TRIALS);
  const [sdohReferrals, setSdohReferrals] = useState(SDOH_REFERRALS);
  const [riskStratification, setRiskStratification] = useState(INITIAL_RISK_STRATIFICATION);
  const [careShares, setCareShares] = useState<CareCircleShare[]>(INITIAL_CARE_SHARES);
  const [ambientTranscript, setAmbientTranscript] = useState(AMBIENT_VISIT_TRANSCRIPT);
  const [literacyScore, setLiteracyScore] = useState(150);

  // Active View Tab inside Dashboard
  const [activeTab, setActiveTab] = useState('overview');

  // Modals Active State
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocViewer, setShowDocViewer] = useState<{ docId: string; labId?: string } | null>(null);
  const [showPreVisitModal, setShowPreVisitModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showCareCircleModal, setShowCareCircleModal] = useState(false);
  const [showAmbientModal, setShowAmbientModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAiDrawer, setShowAiDrawer] = useState(false);

  // Load user details from LocalStorage upon login or session start
  const handleAuthenticatedUser = (userProfile: PatientProfile) => {
    setPatient(userProfile);

    // Fetch user-specific records from localStorage
    const savedLabs = localStorage.getItem(`medlens_labs_${userProfile.id}`);
    const savedMeds = localStorage.getItem(`medlens_meds_${userProfile.id}`);
    const savedDocs = localStorage.getItem(`medlens_docs_${userProfile.id}`);

    if (savedLabs) {
      setLabs(JSON.parse(savedLabs));
    } else {
      localStorage.setItem(`medlens_labs_${userProfile.id}`, JSON.stringify(INITIAL_LAB_RESULTS));
      setLabs(INITIAL_LAB_RESULTS);
    }

    if (savedMeds) {
      setMedications(JSON.parse(savedMeds));
    } else {
      localStorage.setItem(`medlens_meds_${userProfile.id}`, JSON.stringify(INITIAL_MEDICATIONS));
      setMedications(INITIAL_MEDICATIONS);
    }

    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    } else {
      localStorage.setItem(`medlens_docs_${userProfile.id}`, JSON.stringify(INITIAL_DOCUMENTS));
      setDocuments(INITIAL_DOCUMENTS);
    }

    navigateTo('dashboard');
  };

  // Sign Out / Logout handler
  const handleLogout = () => {
    localStorage.removeItem('medlens_active_user');
    navigateTo('login');
  };

  // Sync state changes back to LocalStorage for active user
  useEffect(() => {
    if (patient?.id) {
      localStorage.setItem(`medlens_patient_${patient.id}`, JSON.stringify(patient));
      localStorage.setItem(`medlens_labs_${patient.id}`, JSON.stringify(labs));
      localStorage.setItem(`medlens_meds_${patient.id}`, JSON.stringify(medications));
      localStorage.setItem(`medlens_docs_${patient.id}`, JSON.stringify(documents));
    }
  }, [patient, labs, medications, documents]);

  // Handle New Report Upload
  const handleUploadSuccess = (newDoc: MedicalDocument, newLabs: LabResult[]) => {
    const updatedDocs = [newDoc, ...documents];
    const updatedLabs = [...newLabs, ...labs];
    setDocuments(updatedDocs);
    setLabs(updatedLabs);

    // Re-evaluate Cross Validation and Drug-Lab checkers dynamically
    const newCv = MedLensAiEngine.runCrossValidation(updatedLabs, medications, conditions);
    const newDl = MedLensAiEngine.runDrugLabChecker(updatedLabs, medications);

    setCrossValidationAlerts([...newCv, ...crossValidationAlerts]);
    setDrugLabAlerts([...newDl, ...drugLabAlerts]);
  };

  // Handle Adding Line-Item Lab Annotation Comment
  const handleAddComment = (labId: string, text: string) => {
    setLabs((prev) =>
      prev.map((l) => {
        if (l.id === labId) {
          const newComments = l.comments || [];
          return {
            ...l,
            comments: [
              ...newComments,
              {
                id: `c-${Date.now()}`,
                authorName: patient.name,
                authorRole: 'Patient',
                text,
                timestamp: new Date().toLocaleString()
              }
            ]
          };
        }
        return l;
      })
    );
  };

  // FHIR Export Handler (Downloads formatted PDF)
  const handleExportFHIR = () => {
    MedLensAiEngine.exportFhirR4Pdf(patient, labs, medications);
  };


  // Render Page State logic
  if (pageState === 'intro') {
    return (
      <IntroPage
        onGoToLogin={() => navigateTo('login')}
        onGoToSignup={() => navigateTo('signup')}
      />
    );
  }

  if (pageState === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleAuthenticatedUser}
        onGoToSignup={() => navigateTo('signup')}
        onBackToIntro={() => navigateTo('intro')}
      />
    );
  }

  if (pageState === 'signup') {
    return (
      <SignupPage
        onSignupSuccess={handleAuthenticatedUser}
        onGoToLogin={() => navigateTo('login')}
        onBackToIntro={() => navigateTo('intro')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        patient={patient}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenIntake={() => setShowIntakeModal(true)}
        onOpenUpload={() => setShowUploadModal(true)}
        onOpenQR={() => setShowQRModal(true)}
        onOpenPreVisit={() => setShowPreVisitModal(true)}
        onOpenCareCircle={() => setShowCareCircleModal(true)}
        onOpenAmbient={() => setShowAmbientModal(true)}
        onOpenQuiz={() => setShowQuizModal(true)}
        onExportFHIR={handleExportFHIR}
        onOpenAiDrawer={() => setShowAiDrawer(true)}
        onLogout={handleLogout}
        onBackToIntro={() => navigateTo('intro')}
        literacyScore={literacyScore}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'overview' && (
          <OverviewTab
            patient={patient}
            labs={labs}
            documents={documents}
            crossValidationAlerts={crossValidationAlerts}
            drugLabAlerts={drugLabAlerts}
            onNavigateTab={setActiveTab}
            onOpenDocumentViewer={(docId, labId) => setShowDocViewer({ docId, labId })}
          />
        )}

        {activeTab === 'cross-validation' && (
          <CrossValidationTab
            alerts={crossValidationAlerts}
            onOpenDocumentViewer={(docId) => setShowDocViewer({ docId })}
          />
        )}

        {activeTab === 'lab-records' && (
          <LabRecordTab
            labs={labs}
            onOpenDocumentViewer={(docId, labId) => setShowDocViewer({ docId, labId })}
            onAddComment={handleAddComment}
          />
        )}

        {activeTab === 'drug-lab' && (
          <DrugLabCheckerTab alerts={drugLabAlerts} medications={medications} />
        )}

        {activeTab === 'personal-baseline' && <PersonalBaselineTab labs={labs} />}

        {activeTab === 'risk-stratification' && (
          <RiskStratificationTab risk={riskStratification} />
        )}

        {activeTab === 'family-pedigree' && (
          <FamilyPedigreeTab members={familyMembers} alerts={familyPatternAlerts} />
        )}

        {activeTab === 'clinical-trials' && <ClinicalTrialsTab trials={clinicalTrials} />}

        {activeTab === 'sdoh' && <SdohTab sdoh={patient.sdoh} referrals={sdohReferrals} />}

        {activeTab === 'cost-transparency' && <CostTransparencyTab labs={labs} />}
      </main>

      {/* Modals & Drawers */}
      {showIntakeModal && (
        <PatientIntakeModal
          patient={patient}
          medications={medications}
          conditions={conditions}
          allergies={allergies}
          onClose={() => setShowIntakeModal(false)}
          onSave={(p, m, c, a) => {
            setPatient(p);
            setMedications(m);
            setConditions(c);
            setAllergies(a);
          }}
        />
      )}

      {showUploadModal && (
        <ReportUploaderModal
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {showDocViewer && (
        <DocumentViewerModal
          document={
            documents.find((d) => d.id === showDocViewer.docId) || documents[0]
          }
          labs={labs.filter((l) => l.documentId === showDocViewer.docId)}
          activeLabId={showDocViewer.labId}
          onClose={() => setShowDocViewer(null)}
        />
      )}

      {showPreVisitModal && (
        <PreVisitPrepModal
          patient={patient}
          abnormalLabs={labs.filter((l) => l.status !== 'NORMAL')}
          medications={medications}
          conditions={conditions}
          onClose={() => setShowPreVisitModal(false)}
        />
      )}

      {showQRModal && (
        <EmergencyQRModal
          patient={patient}
          medications={medications}
          allergies={allergies}
          conditions={conditions}
          onClose={() => setShowQRModal(false)}
        />
      )}

      {showCareCircleModal && (
        <CareCircleModal
          shares={careShares}
          onClose={() => setShowCareCircleModal(false)}
          onAddShare={(s) => setCareShares([s, ...careShares])}
        />
      )}

      {showAmbientModal && (
        <AmbientRecorderModal
          transcript={ambientTranscript}
          onClose={() => setShowAmbientModal(false)}
          onSaveActionItems={() => {}}
        />
      )}

      {showQuizModal && (
        <QuizModal
          questions={LITERACY_QUIZ}
          badges={INITIAL_BADGES}
          onClose={() => setShowQuizModal(false)}
          onRewardPoints={(pts) => setLiteracyScore((s) => s + pts)}
        />
      )}

      {showAiDrawer && (
        <AiAssistantDrawer
          patient={patient}
          labs={labs}
          medications={medications}
          onClose={() => setShowAiDrawer(false)}
          onSelectLab={(labId) => {
            const lab = labs.find((l) => l.id === labId);
            if (lab) {
              setShowDocViewer({ docId: lab.documentId, labId: lab.id });
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
