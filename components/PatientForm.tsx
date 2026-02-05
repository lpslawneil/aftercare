
import React, { useState } from 'react';
import { PatientDetails } from '../types';
import ResponsibilityWizard from './ResponsibilityWizard';
import NearestRelativeWizard from './NearestRelativeWizard';
import { Gavel, AlertTriangle, ChevronDown, ChevronUp, Calculator, ShieldAlert, Lock, UserCheck, Info, MessageCircle, AlertCircle } from 'lucide-react';
import { MHA_SECTIONS, NEILS_NOTES } from '../constants';

interface PatientFormProps {
  details: PatientDetails;
  onChange: (field: keyof PatientDetails, value: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ details, onChange }) => {
  const [wizardType, setWizardType] = useState<'ICB' | 'LA' | null>(null);
  const [showNRWizard, setShowNRWizard] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('demographics');
  const [showNote, setShowNote] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange(e.target.name as keyof PatientDetails, value);
  };

  const handleWizardComplete = (result: string, rationale: string) => {
      if (wizardType === 'ICB') {
        onChange('responsibleICB', result);
      } else if (wizardType === 'LA') {
        onChange('responsibleLA', result);
      }

      const currentRationale = details.responsibilityRationale || '';
      const separator = currentRationale ? '\n\n' : '';
      const sectionHeader = wizardType === 'ICB' ? '--- ICB RATIONALE ---' : '--- LOCAL AUTHORITY RATIONALE ---';
      
      onChange('responsibilityRationale', `${currentRationale}${separator}${sectionHeader}\n${rationale}`);
      setWizardType(null);
  };

  const handleNRComplete = (result: string, rationale: string) => {
      onChange('nearestRelative', result);
      const currentComments = details.familyComments || '';
      const separator = currentComments ? '\n\n' : '';
      onChange('familyComments', `${currentComments}${separator}**NR Legal Identification:** ${rationale}`);
      setShowNRWizard(false);
  };

  const toggleSection = (section: string) => {
      setActiveSection(activeSection === section ? '' : section);
  };

  const copyText = async (text: string, label: string) => {
      if (!text) return;
      try {
          await navigator.clipboard.writeText(text);
          alert(`${label} copied to clipboard.`);
      } catch {
          alert(`Unable to copy ${label}.`);
      }
  };

  const selectedSection = MHA_SECTIONS.find(s => s.code === details.mhaSection);
  const isSectionEligible = selectedSection?.eligible;

  // Advocacy Triggers
  const imhaRequired = details.mhaSection && !['Informal', 's135/136', 's5(2)'].includes(details.mhaSection);
  const imcaRequired = details.dolCapacity && details.dolSupervision && !details.dolFreeToLeave;

  const inputClass = "w-full p-2 border border-brand-grey/50 rounded-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black placeholder-brand-grey text-sm";
  const labelClass = "text-xs font-bold text-brand-black uppercase tracking-wide mb-1 block";

  const SectionHeader = ({ title, id }: { title: string, id: string }) => (
      <button 
        onClick={() => toggleSection(id)}
        className="w-full flex justify-between items-center bg-brand-black text-brand-white p-3 rounded-sm mb-2 group"
      >
          <span className="font-serif font-bold group-hover:text-brand-gold transition-colors">{title}</span>
          {activeSection === id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
      </button>
  );

  const TooltipNote = ({ content, id }: { content: string, id: string }) => (
      <div className="relative inline-block ml-2">
          <button 
            type="button" 
            onMouseEnter={() => setShowNote(id)} 
            onMouseLeave={() => setShowNote(null)}
            className="text-brand-gold hover:text-brand-black transition-colors"
          >
              <Info size={14} />
          </button>
          {showNote === id && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-brand-black text-white text-[10px] rounded shadow-xl z-50 animate-in fade-in zoom-in-95">
                  {content}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-brand-black" />
              </div>
          )}
      </div>
  );

  return (
    <div id="plan-details" className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
      {wizardType && (
          <ResponsibilityWizard 
            type={wizardType}
            onComplete={handleWizardComplete} 
            onCancel={() => setWizardType(null)} 
          />
      )}

      {showNRWizard && (
          <NearestRelativeWizard 
            onComplete={handleNRComplete}
            onCancel={() => setShowNRWizard(false)}
          />
      )}

      <h2 className="text-xl font-serif font-bold text-brand-black mb-6 border-b border-brand-grey/30 pb-2">1. Plan Details & Context</h2>
      
      {/* SECTION 1: Demographics */}
      <SectionHeader title="Demographic & Legal Framework" id="demographics" />
      {activeSection === 'demographics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 border border-brand-grey/20 rounded-sm">
            
            {/* Advocacy Trigger Alerts */}
            {(imhaRequired || imcaRequired) && (
                <div className="col-span-1 md:col-span-3 space-y-2 mb-4">
                    {imhaRequired && (
                        <div className={`p-3 rounded border flex items-center justify-between transition-colors ${details.imhaReferralDone ? 'bg-green-50 border-green-200 text-green-800' : 'bg-brand-gold/10 border-brand-gold text-brand-black animate-pulse'}`}>
                            <div className="flex items-center gap-2">
                                <MessageCircle size={18} />
                                <span className="text-xs font-bold uppercase">Statutory IMHA Referral Required (s.130A)</span>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="imhaReferralDone" checked={details.imhaReferralDone} onChange={handleChange} className="w-4 h-4 accent-brand-gold" />
                                <span className="text-xs font-bold">Referral Sent?</span>
                            </label>
                        </div>
                    )}
                    {imcaRequired && (
                        <div className={`p-3 rounded border flex items-center justify-between transition-colors ${details.imcaReferralDone ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800 animate-pulse'}`}>
                            <div className="flex items-center gap-2">
                                <AlertCircle size={18} />
                                <span className="text-xs font-bold uppercase">Statutory IMCA Referral Required (DoLS)</span>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="imcaReferralDone" checked={details.imcaReferralDone} onChange={handleChange} className="w-4 h-4 accent-red-600" />
                                <span className="text-xs font-bold">Referral Sent?</span>
                            </label>
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-1">
                <label className={labelClass}>Patient Name</label>
                <input type="text" name="name" value={details.name} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-1">
                <label className={labelClass}>Address</label>
                <input type="text" name="address" value={details.address} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-1">
                <label className={labelClass}>Date of Birth</label>
                <input type="date" name="dob" value={details.dob} onChange={handleChange} className={inputClass} />
            </div>
            
            {/* Legal Status Selection */}
            <div className="space-y-1">
                <label className={labelClass}>
                    MHA Section
                    <TooltipNote content={NEILS_NOTES.S117_ELIGIBILITY} id="mha-note" />
                </label>
                <select name="mhaSection" value={details.mhaSection} onChange={handleChange} className={inputClass}>
                    <option value="">-- Select Section --</option>
                    {MHA_SECTIONS.map(s => (
                        <option key={s.code} value={s.code}>{s.label}</option>
                    ))}
                </select>
            </div>

            {/* Entitlement Warning */}
            <div className="md:col-span-2 lg:col-span-1 flex items-end pb-1">
                {details.mhaSection && !isSectionEligible && (
                    <div className="text-xs bg-red-100 text-red-800 p-2 rounded border border-red-300 w-full flex items-center gap-2">
                        <AlertTriangle size={16} />
                        <span><strong>Not entitled:</strong> {selectedSection?.label} does NOT trigger s.117.</span>
                    </div>
                )}
                {details.mhaSection && isSectionEligible && (
                    <div className="text-xs bg-green-100 text-green-800 p-2 rounded border border-green-300 w-full flex items-center gap-2">
                        <ShieldAlert size={16} />
                        <span><strong>Entitled:</strong> This section qualifies for s.117 after-care.</span>
                    </div>
                )}
            </div>

            <div className="col-span-1 md:col-span-3">
                 <div className="flex items-center gap-2 mb-2 p-2 border border-brand-grey/20 rounded bg-brand-grey/5">
                    <input 
                        type="checkbox" 
                        name="isRestricted" 
                        checked={details.isRestricted} 
                        onChange={handleChange} 
                        className="w-4 h-4 accent-brand-gold"
                    />
                    <label className="text-sm font-bold text-brand-black flex items-center gap-2">
                        <Lock size={14} /> Is this a Restricted Patient? (e.g. s37/41)
                        <TooltipNote content={NEILS_NOTES.RESTRICTED} id="restricted-note" />
                    </label>
                 </div>
            </div>

            {details.isRestricted && (
                <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 bg-red-50 p-3 rounded border border-red-100 animate-in fade-in">
                    <div className="space-y-1">
                        <label className={labelClass}>Ministry of Justice (MHCS) Caseworker</label>
                        <input type="text" name="mojCaseWorker" value={details.mojCaseWorker} onChange={handleChange} className={inputClass} placeholder="Name & Contact" />
                    </div>
                    <div className="space-y-1">
                        <label className={labelClass}>Victim Liaison Officer (VLO)</label>
                        <input type="text" name="victimLiaisonOfficer" value={details.victimLiaisonOfficer} onChange={handleChange} className={inputClass} placeholder="Required under DVCV Act 2004" />
                    </div>
                </div>
            )}

            <div className="col-span-1 md:col-span-3 space-y-1">
                <label className={labelClass}>Conditions of Discharge (MoJ / Tribunal)</label>
                <textarea name="conditionsOfDischarge" value={details.conditionsOfDischarge} onChange={handleChange} rows={2} className={inputClass} placeholder="List explicit conditions..." />
            </div>

            <div className="col-span-1 md:col-span-3 space-y-1">
                <label className={labelClass}>Mental Disorders Diagnosed</label>
                <input type="text" name="diagnoses" value={details.diagnoses} onChange={handleChange} className={inputClass} />
            </div>
          </div>
      )}

      {/* SECTION 2: Responsibility */}
      <SectionHeader title="Responsibility & Professionals" id="responsibility" />
      {activeSection === 'responsibility' && (
          <div className="mb-6 p-4 border border-brand-grey/20 rounded-sm">
             <div className="bg-brand-grey/5 p-4 rounded-sm border border-brand-grey/20 mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-md font-bold text-brand-black font-serif flex items-center gap-2">
                        <Gavel size={18} /> Ordinary Residence
                        <TooltipNote content={NEILS_NOTES.ORDINARY_RESIDENCE} id="or-note" />
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelClass}>Responsible ICB</label>
                        <div className="flex gap-2">
                            <input type="text" name="responsibleICB" value={details.responsibleICB} onChange={handleChange} className={`${inputClass} font-bold`} placeholder="Unknown" />
                            <button 
                                onClick={() => setWizardType('ICB')}
                                className="bg-brand-gold text-brand-black px-3 rounded-sm text-xs font-bold hover:bg-[#8f7e5e] whitespace-nowrap border border-brand-black/20 flex items-center gap-1"
                            >
                                <Calculator size={14} /> Wizard
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className={labelClass}>Responsible Local Authority</label>
                         <div className="flex gap-2">
                            <input type="text" name="responsibleLA" value={details.responsibleLA} onChange={handleChange} className={`${inputClass} font-bold`} placeholder="Unknown" />
                            <button 
                                onClick={() => setWizardType('LA')}
                                className="bg-brand-gold text-brand-black px-3 rounded-sm text-xs font-bold hover:bg-[#8f7e5e] whitespace-nowrap border border-brand-black/20 flex items-center gap-1"
                            >
                                <Calculator size={14} /> Wizard
                            </button>
                        </div>
                    </div>
                </div>
                 {details.responsibilityRationale && (
                    <div className="mt-3 p-3 bg-brand-white border-l-4 border-brand-gold text-[10px] text-brand-black whitespace-pre-wrap font-mono rounded shadow-inner">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-brand-grey uppercase">Responsibility Audit Trail:</span>
                            <button
                                type="button"
                                onClick={() => copyText(details.responsibilityRationale, 'Responsibility rationale')}
                                className="text-[10px] font-bold text-brand-black border border-brand-grey/40 px-2 py-0.5 rounded-sm hover:bg-brand-grey/10"
                            >
                                Copy
                            </button>
                        </div>
                        {details.responsibilityRationale}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className={labelClass}>Social Worker</label>
                    <input type="text" name="socialWorkerName" value={details.socialWorkerName} onChange={handleChange} className={inputClass} />
                </div>
                 <div className="space-y-1">
                    <label className={labelClass}>Care Co-ordinator</label>
                    <input type="text" name="careCoordinator" value={details.careCoordinator} onChange={handleChange} className={inputClass} />
                </div>
                <div className="space-y-1">
                    <label className={labelClass}>Nearest Relative (s.26)</label>
                    <div className="flex gap-2">
                        <input type="text" name="nearestRelative" value={details.nearestRelative} onChange={handleChange} className={`${inputClass} font-bold`} placeholder="Identify via s.26 rules" />
                        <button 
                                onClick={() => setShowNRWizard(true)}
                                className="bg-brand-black text-brand-white px-3 rounded-sm text-xs font-bold hover:bg-brand-black/80 whitespace-nowrap flex items-center gap-1 mt-1"
                            >
                            <UserCheck size={14} /> Identify
                        </button>
                    </div>
                </div>
                 <div className="space-y-1">
                    <label className={labelClass}>Advocate (IMHA/IMCA)</label>
                    <input type="text" name="advocateContact" value={details.advocateContact} onChange={handleChange} className={inputClass} />
                </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default PatientForm;
