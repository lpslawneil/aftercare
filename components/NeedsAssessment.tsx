
import React, { useState } from 'react';
import { NeedItem, NeedCategory, Severity, NeedDomain, PatientDetails } from '../types';
import { LEGAL_DEFINITIONS, SUGGESTED_NEEDS, CARE_ACT_OUTCOMES, UNABLE_TO_ACHIEVE_CRITERIA, NEILS_NOTES } from '../constants';
import { PlusCircle, Trash2, HelpCircle, Lightbulb, ChevronRight, Activity, AlertCircle, Home, Info, Scale, X, AlertTriangle, CheckSquare, ShieldCheck, ShieldAlert } from 'lucide-react';

interface NeedsAssessmentProps {
  needs: NeedItem[];
  setNeeds: React.Dispatch<React.SetStateAction<NeedItem[]>>;
  details: PatientDetails;
  onChange: (field: keyof PatientDetails, value: any) => void;
}

const NeedsAssessment: React.FC<NeedsAssessmentProps> = ({ needs, setNeeds, details, onChange }) => {
  const [newNeed, setNewNeed] = useState<Partial<NeedItem>>({
    description: '',
    category: NeedCategory.S117,
    domain: NeedDomain.MENTAL_HEALTH,
    intervention: '',
    provider: '',
    severity: 'Medium',
    statutoryTestArises: false,
    statutoryTestReducesRisk: false
  });

  const [showWizard, setShowWizard] = useState(true);
  const [wizardStep, setWizardStep] = useState<'category' | 'details'>('category');
  const [careActSelections, setCareActSelections] = useState<Record<string, string>>({});
  const [significantImpact, setSignificantImpact] = useState<boolean>(false);
  const [showDomainInfo, setShowDomainInfo] = useState(false);

  const handleAddNeed = () => {
    if (!newNeed.description || !newNeed.intervention) {
        alert("Please enter a need description and intervention.");
        return;
    }

    if (newNeed.category === NeedCategory.S117) {
        if (!newNeed.statutoryTestArises || !newNeed.statutoryTestReducesRisk) {
            alert("To qualify for s.117 funding, a need MUST meet both statutory tests: Arising from disorder AND Reducing risk of deterioration. Please confirm these tests.");
            return;
        }
    }

    const item: NeedItem = {
      id: crypto.randomUUID(),
      description: newNeed.description || '',
      category: newNeed.category as NeedCategory,
      domain: newNeed.domain || NeedDomain.MENTAL_HEALTH,
      intervention: newNeed.intervention || '',
      provider: newNeed.provider || '',
      severity: newNeed.severity || 'Medium',
      statutoryTestArises: newNeed.statutoryTestArises,
      statutoryTestReducesRisk: newNeed.statutoryTestReducesRisk
    };

    setNeeds([...needs, item]);
    
    setNewNeed({
      description: '',
      category: NeedCategory.S117,
      domain: NeedDomain.MENTAL_HEALTH,
      intervention: '',
      provider: '',
      severity: 'Medium',
      statutoryTestArises: false,
      statutoryTestReducesRisk: false
    });
    setCareActSelections({});
    setSignificantImpact(false);
    setWizardStep('category');
  };

  const removeNeed = (id: string) => {
    setNeeds(needs.filter(n => n.id !== id));
  };

  const selectSuggestion = (suggestion: any) => {
      setNewNeed({
          ...newNeed,
          description: suggestion.label,
          intervention: suggestion.intervention,
          provider: newNeed.category === NeedCategory.PHYSICAL_HEALTH ? 'NHS' : (newNeed.category === NeedCategory.CARE_ACT ? 'Local Authority' : 'Joint Funding')
      });
  };

  const setCategoryViaWizard = (cat: NeedCategory) => {
      setNewNeed({ ...newNeed, category: cat });
      setWizardStep('details');
  };

  const toggleOutcome = (outcome: string) => {
      const next = { ...careActSelections };
      if (next[outcome] !== undefined) {
          delete next[outcome];
      } else {
          next[outcome] = UNABLE_TO_ACHIEVE_CRITERIA[0];
      }
      setCareActSelections(next);
  };

  const updateOutcomeReason = (outcome: string, reason: string) => {
      setCareActSelections(prev => ({ ...prev, [outcome]: reason }));
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

  const generateCareActDescription = () => {
      const outcomes = Object.entries(careActSelections);
      if (outcomes.length === 0) return;
      
      let desc = `[Care Act Eligible] Unable to achieve ${outcomes.length} outcome(s):\n`;
      outcomes.forEach(([outcome, reason], index) => {
          desc += `${index + 1}. ${outcome} - ${reason}\n`;
      });
      if (significantImpact) {
          desc += `\nSignificant impact on wellbeing confirmed.`;
      }
      setNewNeed({ ...newNeed, description: desc.trim() });
  };

  const inputClass = "w-full mt-1 p-2 border border-brand-grey/50 rounded-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold text-sm bg-brand-white text-brand-black";

  return (
    <div id="needs-identification" className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 mt-6">
      <div className="flex justify-between items-center mb-6 border-b border-brand-grey/30 pb-2">
        <h2 className="text-xl font-serif font-bold text-brand-black">2. Needs Identification Module</h2>
        <button 
            onClick={() => setShowWizard(!showWizard)}
            className="text-sm text-brand-black font-medium hover:text-brand-gold underline decoration-brand-gold"
        >
            {showWizard ? 'Switch to Simple Form' : 'Switch to Guided Wizard'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Main Input Area */}
        <div className="lg:col-span-8 space-y-4 bg-brand-white p-6 rounded-sm border border-brand-grey/30 shadow-sm relative">
            
            {showWizard && wizardStep === 'category' ? (
                 <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                    <h3 className="font-bold text-lg text-brand-black mb-4 font-serif">Step 1: Identify the Nature of the Need</h3>
                    
                    {/* 1. s117 Question */}
                    <button 
                        onClick={() => setCategoryViaWizard(NeedCategory.S117)}
                        className="w-full text-left p-4 bg-white border border-brand-grey/30 rounded-sm hover:border-brand-gold hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#A89673]/10 rounded-sm group-hover:bg-[#A89673]/20">
                                <AlertCircle className="text-brand-gold" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-black group-hover:text-brand-gold">Does it arise from the mental disorder & reduce risk?</h4>
                                <p className="text-sm text-brand-grey">After-care to prevent readmission (s.117 Statutory Purpose).</p>
                            </div>
                            <ChevronRight className="ml-auto text-brand-grey group-hover:text-brand-black" />
                        </div>
                    </button>

                    {/* 2. Physical Health Question */}
                    <button 
                        onClick={() => setCategoryViaWizard(NeedCategory.PHYSICAL_HEALTH)}
                        className="w-full text-left p-4 bg-white border border-brand-grey/30 rounded-sm hover:border-green-600 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-sm group-hover:bg-green-100">
                                <Activity className="text-green-700" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-black group-hover:text-green-800">Is this primarily a physical health need?</h4>
                                <p className="text-sm text-brand-grey">e.g. Catheter care, district nursing, physical health meds.</p>
                            </div>
                            <ChevronRight className="ml-auto text-brand-grey group-hover:text-brand-black" />
                        </div>
                    </button>

                    {/* 3. Social Care / Care Act Question */}
                    <button 
                        onClick={() => setCategoryViaWizard(NeedCategory.CARE_ACT)}
                        className="w-full text-left p-4 bg-white border border-brand-grey/30 rounded-sm hover:border-orange-500 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-50 rounded-sm group-hover:bg-orange-100">
                                <Home className="text-orange-700" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-black group-hover:text-orange-800">Is it a general social care need unrelated to the disorder?</h4>
                                <p className="text-sm text-brand-grey">Shopping, cleaning or care due to physical frailty.</p>
                            </div>
                            <ChevronRight className="ml-auto text-brand-grey group-hover:text-brand-black" />
                        </div>
                    </button>
                 </div>
            ) : (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-brand-black flex items-center gap-2 font-serif">
                            {showWizard && <button onClick={() => setWizardStep('category')} className="text-xs bg-brand-grey/20 px-2 py-1 rounded hover:bg-brand-grey/40">Back</button>}
                            Define Need Details
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded font-bold ${
                            newNeed.category === NeedCategory.S117 ? 'bg-brand-gold/20 text-brand-black border border-brand-gold' :
                            newNeed.category === NeedCategory.CARE_ACT ? 'bg-orange-100 text-orange-900 border border-orange-200' : 'bg-green-100 text-green-900 border border-green-200'
                        }`}>
                            {newNeed.category}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                         {/* STATUTORY TEST FOR S117 */}
                        {newNeed.category === NeedCategory.S117 && (
                            <div className="md:col-span-2 space-y-4">
                                <div className="bg-brand-gold/10 border border-brand-gold/50 p-4 rounded-sm">
                                    <h4 className="font-bold text-brand-black text-sm flex items-center gap-2 mb-2 font-serif">
                                        <CheckSquare size={16}/> s.117(6) Statutory Purpose Test
                                    </h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded border border-brand-grey/20 hover:border-brand-gold">
                                            <input 
                                                type="checkbox" 
                                                checked={newNeed.statutoryTestArises}
                                                onChange={(e) => setNewNeed({...newNeed, statutoryTestArises: e.target.checked})}
                                                className="w-4 h-4 accent-brand-gold"
                                            />
                                            <span className="text-sm text-brand-black">1. Limb 1: Arises from mental disorder?</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded border border-brand-grey/20 hover:border-brand-gold">
                                            <input 
                                                type="checkbox" 
                                                checked={newNeed.statutoryTestReducesRisk}
                                                onChange={(e) => setNewNeed({...newNeed, statutoryTestReducesRisk: e.target.checked})}
                                                className="w-4 h-4 accent-brand-gold"
                                            />
                                            <span className="text-sm text-brand-black">2. Limb 2: Reduces risk of deterioration/readmission?</span>
                                        </label>
                                    </div>
                                </div>

                                {/* s.117 Evidence Vault */}
                                <div className="bg-brand-black text-brand-white p-4 rounded-sm shadow-lg border-l-4 border-brand-gold">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-sm flex items-center gap-2">
                                            <ShieldAlert size={18} className="text-brand-gold"/> 
                                            Limb 2 Evidence Vault
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => copyText(details.s117Limb2Evidence, 'Limb 2 evidence')}
                                            className="text-[10px] font-bold text-brand-white border border-brand-gold/50 px-2 py-0.5 rounded-sm hover:bg-brand-gold/20"
                                        >
                                            Copy
                                        </button>
                                        <div className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded border border-brand-gold/30">Professional Grade Requirement</div>
                                    </div>
                                    <p className="text-[10px] text-brand-grey mb-3">
                                        Under s.117(6), you must prove the service *prevents* readmission. ICB/LA panels often refuse funding if this evidence is missing.
                                    </p>
                                    <textarea 
                                        className="w-full bg-[#2a2929] border border-brand-grey/20 rounded p-2 text-xs text-brand-white focus:ring-1 focus:ring-brand-gold"
                                        rows={3}
                                        placeholder="EXPLAIN: What exactly happens to the patient's risk profile if this service is withdrawn? (e.g. 'Withdrawal of daily med-prompting has historically led to relapse within 14 days...')"
                                        value={details.s117Limb2Evidence}
                                        onChange={(e) => onChange('s117Limb2Evidence', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Care Act Eligibility Assistant */}
                        {newNeed.category === NeedCategory.CARE_ACT && (
                            <div className="md:col-span-2 bg-orange-50 border border-orange-200 p-4 rounded-sm mb-2">
                                <h4 className="font-bold text-orange-900 text-sm flex items-center gap-2 mb-2">
                                    <Scale size={16}/> Care Act Eligibility Assistant
                                </h4>
                                <div className="space-y-3 max-h-48 overflow-y-auto mb-4 border border-orange-200/50 rounded bg-white p-2">
                                    {CARE_ACT_OUTCOMES.map((outcome, i) => {
                                        const isSelected = careActSelections[outcome] !== undefined;
                                        return (
                                            <div key={i} className={`p-2 rounded border ${isSelected ? 'bg-orange-50 border-orange-300' : 'bg-transparent border-transparent'}`}>
                                                <label className="flex items-start gap-2 text-xs text-brand-black/80 cursor-pointer">
                                                    <input type="checkbox" checked={isSelected} onChange={() => toggleOutcome(outcome)} className="mt-0.5 accent-orange-600" />
                                                    <span className={isSelected ? "font-bold" : ""}>{outcome}</span>
                                                </label>
                                                {isSelected && (
                                                    <select 
                                                        className="w-full text-[11px] p-1 mt-1 border rounded bg-white"
                                                        value={careActSelections[outcome]}
                                                        onChange={(e) => updateOutcomeReason(outcome, e.target.value)}
                                                    >
                                                        {UNABLE_TO_ACHIEVE_CRITERIA.map((crit, j) => (
                                                            <option key={j} value={crit}>{crit}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-2 mb-3 bg-orange-100/50 p-2 rounded">
                                    <input type="checkbox" id="sigImpact" checked={significantImpact} onChange={(e) => setSignificantImpact(e.target.checked)} className="accent-orange-600" />
                                    <label htmlFor="sigImpact" className="text-xs font-bold text-brand-black">Significant Impact on Wellbeing Confirmed?</label>
                                </div>
                                <button onClick={generateCareActDescription} disabled={Object.keys(careActSelections).length < 2 || !significantImpact} className="w-full bg-orange-600 text-white text-xs py-2 rounded font-bold hover:bg-orange-700 disabled:opacity-50">Build Evidence-Based Description</button>
                            </div>
                        )}

                        <div className="md:col-span-2">
                             <label className="block text-xs font-semibold text-brand-grey uppercase flex items-center gap-2 mb-1">
                                <Lightbulb size={14} className="text-brand-gold"/> Suggestions
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTED_NEEDS[newNeed.category as NeedCategory].map((sugg, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => selectSuggestion(sugg)}
                                        className="text-[10px] bg-white border border-brand-grey/30 px-2 py-1 rounded hover:bg-brand-gold/10 hover:border-brand-gold transition-colors text-brand-black"
                                    >
                                        {sugg.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-brand-grey uppercase">Domain & description</label>
                            <select 
                                className={inputClass}
                                value={newNeed.domain}
                                onChange={(e) => setNewNeed({...newNeed, domain: e.target.value as NeedDomain})}
                            >
                                {Object.values(NeedDomain).map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            <textarea 
                                className={`${inputClass} mt-2`}
                                placeholder="Describe the specific need..."
                                value={newNeed.description}
                                onChange={(e) => setNewNeed({...newNeed, description: e.target.value})}
                                rows={2}
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-semibold text-brand-grey uppercase">Who Pays (Indicative)</label>
                            <input className={inputClass} placeholder="e.g. ICB" value={newNeed.provider} onChange={(e) => setNewNeed({...newNeed, provider: e.target.value})} />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-xs font-semibold text-brand-grey uppercase">Intervention</label>
                            <input className={inputClass} placeholder="e.g. 1:1 Support" value={newNeed.intervention} onChange={(e) => setNewNeed({...newNeed, intervention: e.target.value})} />
                        </div>
                    </div>
                    <button 
                        onClick={handleAddNeed}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-brand-gold hover:bg-[#8f7e5e] text-brand-black px-4 py-2 rounded-sm font-bold transition-colors shadow-md"
                    >
                        <PlusCircle size={18} /> Add Need to Plan
                    </button>
                </div>
            )}
        </div>

        {/* Legend / Helper Side Panel */}
        <div className="lg:col-span-4 space-y-4">
            <div className="bg-brand-white p-4 rounded-sm border-l-4 border-brand-gold shadow-sm text-sm text-brand-black">
                 <h4 className="font-bold mb-3 flex items-center gap-2 border-b border-brand-grey/20 pb-2 font-serif">
                    <HelpCircle size={16} className="text-brand-gold"/> Statutory Tests
                 </h4>
                 <div className="space-y-4">
                     {Object.entries(LEGAL_DEFINITIONS).map(([key, def]) => (
                         <div key={key}>
                            <h5 className="font-bold text-[10px] uppercase text-brand-gold tracking-widest mb-1">{def.title}</h5>
                            <p className="text-[11px] mb-2 leading-relaxed">{def.description}</p>
                            <ul className="list-disc pl-4 space-y-1">
                                {def.criteria.map((point: string, i: number) => (
                                     <li key={i} className="text-[10px] text-brand-grey">{point}</li>
                                ))}
                            </ul>
                         </div>
                     ))}
                 </div>
            </div>

            <div className="bg-brand-black text-brand-white p-4 rounded-sm shadow-xl border-l-4 border-brand-gold">
                <h4 className="font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-brand-gold"/> Neil's Checklist
                </h4>
                <ul className="text-[10px] space-y-2 opacity-80 italic">
                    <li>• Does every s.117 need have a Limb 2 evidence entry?</li>
                    <li>• Are physical needs correctly billed to ICB?</li>
                    <li>• If re-detained, has the previous s.117 duty been formally ended?</li>
                </ul>
            </div>
        </div>
      </div>

      {/* Needs Table */}
      {needs.length > 0 && (
        <div className="overflow-x-auto border border-brand-grey/30 rounded-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-brand-black text-brand-white text-[10px] uppercase tracking-wider">
                        <th className="p-3">Category</th>
                        <th className="p-3">Need Detail</th>
                        <th className="p-3">Intervention</th>
                        <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-brand-grey/20 bg-brand-white">
                    {needs.map((need) => (
                        <tr key={need.id} className="hover:bg-brand-grey/5">
                            <td className="p-3 align-top whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border
                                    ${need.category === NeedCategory.S117 ? 'bg-brand-gold/10 text-brand-black border-brand-gold' : 
                                      need.category === NeedCategory.CARE_ACT ? 'bg-orange-50 text-orange-900 border-orange-200' : 
                                      'bg-green-50 text-green-900 border-green-200'}`}>
                                    {need.category === NeedCategory.S117 ? 's.117' : 
                                     need.category === NeedCategory.CARE_ACT ? 'Care Act' : 'Physical'}
                                </span>
                            </td>
                            <td className="p-3">
                                <p className="text-[9px] uppercase font-bold text-brand-grey mb-1">{need.domain}</p>
                                <p className="text-sm text-brand-black whitespace-pre-wrap">{need.description}</p>
                            </td>
                            <td className="p-3 align-top">
                                <p className="text-xs text-brand-black">{need.intervention}</p>
                                <p className="text-[10px] text-brand-grey">By: {need.provider}</p>
                            </td>
                            <td className="p-3 text-center align-top">
                                <button onClick={() => removeNeed(need.id)} className="text-brand-grey hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default NeedsAssessment;
