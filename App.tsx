
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import NeedsAssessment from './components/NeedsAssessment';
import FundingCalculator from './components/FundingCalculator';
import PlanCompletion from './components/PlanCompletion';
import SupportPlan from './components/SupportPlan';
import KnowledgePages from './components/KnowledgePages';
import KnowledgeHub from './components/KnowledgeHub';
import { PatientDetails, NeedItem } from './types';
import { INITIAL_PATIENT_DETAILS } from './constants';
import { ScrollText, Calculator, FileText, Save, Download, RotateCcw, CheckCircle2, AlertCircle, X, ExternalLink, FileJson } from 'lucide-react';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assessment' | 'plan' | 'knowledge'>('knowledge');
  const [mobilePreview, setMobilePreview] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [patientDetails, setPatientDetails] = useState<PatientDetails>(INITIAL_PATIENT_DETAILS);
  const [needs, setNeeds] = useState<NeedItem[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Auto-clear notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
  };

  const handleDetailsChange = (field: keyof PatientDetails, value: any) => {
    setPatientDetails(prev => ({ ...prev, [field]: value }));
  };

  const saveWork = () => {
    const data = {
      patientDetails,
      needs,
      savedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem('s117_toolkit_data', JSON.stringify(data));
      showNotification('Work saved successfully to your browser.', 'success');
    } catch (error) {
      showNotification('Failed to save. Your browser storage might be full or disabled.', 'error');
    }
  };

  const exportWorkJson = () => {
    const data = {
      patientDetails,
      needs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `S117_Assessment_${patientDetails.name || 'Case'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Case data exported as JSON.', 'success');
  };

  const loadWork = () => {
    const savedData = localStorage.getItem('s117_toolkit_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.patientDetails) setPatientDetails(parsed.patientDetails);
        if (parsed.needs) setNeeds(parsed.needs);
        showNotification(`Work loaded. Last saved: ${new Date(parsed.savedAt).toLocaleString()}`, 'success');
      } catch (e) {
        showNotification('Failed to load data. The saved file may be corrupted.', 'error');
      }
    } else {
      showNotification('No saved work found on this device.', 'info');
    }
  };

  const resetWork = () => {
    if (window.confirm("Are you sure you want to clear all current data? This cannot be undone unless you have saved previously.")) {
      setPatientDetails(INITIAL_PATIENT_DETAILS);
      setNeeds([]);
      showNotification('All data has been reset.', 'info');
    }
  };

  // Progress Logic
  const progress = useMemo(() => {
    const steps = [
        { name: 'Demographics', met: !!patientDetails.name && !!patientDetails.mhaSection },
        { name: 'Responsibility', met: !!patientDetails.responsibleLA && !!patientDetails.responsibleICB },
        { name: 'Needs', met: needs.length > 0 },
        { name: 'Funding', met: needs.some(n => n.category === 'S117 After-care') },
        { name: 'Completion', met: !!patientDetails.completedBy }
    ];
    const completed = steps.filter(s => s.met).length;
    return {
        percent: (completed / steps.length) * 100,
        steps
    };
  }, [patientDetails, needs]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-black bg-brand-white relative">
      <div className={mobilePreview ? "max-w-[420px] mx-auto w-full min-h-screen bg-[#F6F5F2] shadow-xl border border-black/10" : "w-full"}>
      <Header isOnline={isOnline} />
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-sm shadow-xl border-l-4 ${
            notification.type === 'success' ? 'bg-green-50 border-green-600 text-green-900' :
            notification.type === 'error' ? 'bg-red-50 border-red-600 text-red-900' :
            'bg-brand-black text-brand-white border-brand-gold'
          }`}>
            {notification.type === 'success' && <CheckCircle2 size={18} className="text-green-600" />}
            {notification.type === 'error' && <AlertCircle size={18} className="text-red-600" />}
            <span className="text-sm font-medium">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-70 transition-opacity">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Progress Stepper - Sticky below header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brand-grey/20 print:hidden shadow-sm">
          <div className="container mx-auto px-4 py-2">
              <div className="flex items-center gap-4">
                  <div className="flex-grow bg-brand-grey/20 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-gold h-full transition-all duration-700 ease-out" 
                        style={{ width: `${progress.percent}%` }}
                      />
                  </div>
                  <div className="flex gap-4 shrink-0">
                      {progress.steps.map((step, i) => (
                          <div key={i} className={`text-[10px] font-bold uppercase flex items-center gap-1 ${step.met ? 'text-brand-gold' : 'text-brand-grey'}`}>
                             {step.met ? <CheckCircle2 size={12}/> : <div className="w-3 h-3 border border-current rounded-full"/>}
                             <span className="hidden sm:inline">{step.name}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Actions Toolbar */}
        <div className="flex justify-end gap-2 mb-4 print:hidden">
            <button
                onClick={() => setMobilePreview(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-black border border-brand-grey/50 rounded-sm hover:bg-brand-grey/10 transition-colors"
                title="Toggle mobile preview"
            >
                {mobilePreview ? 'Desktop Preview' : 'Mobile Preview'}
            </button>
            <button 
                onClick={loadWork}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-black border border-brand-grey/50 rounded-sm hover:bg-brand-grey/10 transition-colors"
                title="Load previously saved work"
            >
                <Download size={14} /> Load Saved
            </button>
            {activeTab === 'plan' && (
                <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-white bg-brand-black border border-brand-black rounded-sm hover:bg-brand-black/80 transition-colors"
                    title="Download or print the plan as PDF"
                >
                    <FileText size={14} /> Export PDF
                </button>
            )}
            <button 
                onClick={exportWorkJson}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-black border border-brand-grey/50 rounded-sm hover:bg-brand-grey/10 transition-colors"
                title="Export data as JSON file"
            >
                <FileJson size={14} /> Export JSON
            </button>
            <button 
                onClick={saveWork}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-white bg-brand-black border border-brand-black rounded-sm hover:bg-brand-black/80 transition-colors"
                title="Save current work to browser storage"
            >
                <Save size={14} /> Save Work
            </button>
            <button 
                onClick={resetWork}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-sm hover:bg-red-50 transition-colors ml-2"
                title="Clear all fields"
            >
                <RotateCcw size={14} /> Reset
            </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-8 print:hidden">
            <div className="bg-white p-1 rounded-sm shadow-sm border border-brand-grey/50 inline-flex">
                <button 
                    onClick={() => setActiveTab('knowledge')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-medium transition-all ${
                        activeTab === 'knowledge' 
                        ? 'bg-brand-gold text-brand-black shadow-md' 
                        : 'text-brand-black/70 hover:bg-brand-grey/10'
                    }`}
                >
                    <ScrollText size={18} /> Knowledge Pages
                </button>
                <button 
                    onClick={() => setActiveTab('assessment')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-medium transition-all ${
                        activeTab === 'assessment' 
                        ? 'bg-brand-gold text-brand-black shadow-md' 
                        : 'text-brand-black/70 hover:bg-brand-grey/10'
                    }`}
                >
                    <Calculator size={18} /> Entitlement Tool
                </button>
                <button 
                    onClick={() => setActiveTab('plan')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-medium transition-all ${
                        activeTab === 'plan' 
                        ? 'bg-brand-gold text-brand-black shadow-md' 
                        : 'text-brand-black/70 hover:bg-brand-grey/10'
                    }`}
                >
                    <FileText size={18} /> View Draft Plan
                </button>
            </div>
        </div>

        {activeTab === 'assessment' && (
            <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-brand-white border-l-4 border-brand-gold shadow-sm p-4 flex gap-4">
                    <ScrollText className="text-brand-gold flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-brand-black font-serif">Discharge planning & s.117 entitlement assistant</h3>
                        <p className="text-sm text-brand-black/80 mt-1">
                            This tool helps you separate needs based on legal definitions (MHA vs Care Act vs NHS). 
                            The professional update now includes mandatory advocacy triggers and enhanced s.117(6) evidence vaulting.
                        </p>
                    </div>
                </div>

                <PatientForm details={patientDetails} onChange={handleDetailsChange} />
                <NeedsAssessment needs={needs} setNeeds={setNeeds} details={patientDetails} onChange={handleDetailsChange} />
                <FundingCalculator needs={needs} details={patientDetails} onChange={handleDetailsChange} />
                <PlanCompletion details={patientDetails} onChange={handleDetailsChange} />
            </div>
        )}

        {activeTab === 'plan' && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SupportPlan details={patientDetails} needs={needs} />
            </div>
        )}

        {activeTab === 'knowledge' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <KnowledgePages />
            </div>
        )}

      </main>

      <footer className="bg-white/80 text-brand-grey py-6 text-center text-sm print:hidden border-t border-black/10">
        <p>&copy; {new Date().getFullYear()} Neil Allen / 39 Essex Chambers</p>
        <p className="text-[10px] uppercase tracking-widest mt-2 opacity-50 font-medium italic">Professional Grade Decision Support</p>
      </footer>
      </div>
    </div>
  );
};

export default App;
