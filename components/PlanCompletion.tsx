
import React, { useState } from 'react';
import { PatientDetails } from '../types';
import DoLChecker from './DoLChecker';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PlanCompletionProps {
  details: PatientDetails;
  onChange: (field: keyof PatientDetails, value: any) => void;
}

const PlanCompletion: React.FC<PlanCompletionProps> = ({ details, onChange }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.name as keyof PatientDetails, e.target.value);
  };

  const toggleSection = (section: string) => {
      setActiveSection(activeSection === section ? '' : section);
  };

  const inputClass = "w-full p-2 border border-brand-grey/50 rounded-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black placeholder-brand-grey text-sm";
  const labelClass = "text-xs font-bold text-brand-black uppercase tracking-wide mb-1 block";

  const SectionHeader = ({ title, id }: { title: string, id: string }) => (
      <button 
        onClick={() => toggleSection(id)}
        className="w-full flex justify-between items-center bg-brand-black text-brand-white p-3 rounded-sm mb-2"
      >
          <span className="font-serif font-bold">{title}</span>
          {activeSection === id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
      </button>
  );

  return (
    <div id="arrangements" className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 mt-6">
      <h2 className="text-xl font-serif font-bold text-brand-black mb-6 border-b border-brand-grey/30 pb-2">4. Arrangements & Completion</h2>
      
      {/* DoL Checker (Always Visible as it's critical) */}
      <DoLChecker details={details} onChange={onChange} />
      <div className="mb-6"></div>

      {/* SECTION: Plan Meta Data */}
      <SectionHeader title="Arrangements & Completion" id="meta" />
      {activeSection === 'meta' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border border-brand-grey/20 rounded-sm animate-in fade-in slide-in-from-top-2">
             <div className="col-span-1 md:col-span-2 space-y-1">
                <label className={labelClass}>Brief description of current arrangements</label>
                <textarea name="currentArrangements" value={details.currentArrangements} onChange={handleChange} rows={2} className={inputClass} />
            </div>
             <div className="space-y-1">
                <label className={labelClass}>Level of Confidence in Arrangements</label>
                <input type="text" name="confidenceLevel" value={details.confidenceLevel} onChange={handleChange} className={inputClass} />
            </div>
             <div className="space-y-1">
                <label className={labelClass}>Case Status</label>
                <select name="caseStatus" value={details.caseStatus} onChange={handleChange} className={inputClass}>
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Finalised">Finalised</option>
                </select>
            </div>
             <div className="space-y-1">
                <label className={labelClass}>Statutory Funding Already In Place</label>
                <input type="text" name="statutoryFunding" value={details.statutoryFunding} onChange={handleChange} className={inputClass} />
            </div>
             <div className="space-y-1">
                <label className={labelClass}>Completed By</label>
                <input type="text" name="completedBy" value={details.completedBy} onChange={handleChange} className={inputClass} />
            </div>
             <div className="space-y-1">
                <label className={labelClass}>Designation</label>
                <input type="text" name="designation" value={details.designation} onChange={handleChange} className={inputClass} />
            </div>
             <div className="space-y-1">
                <label className={labelClass}>Date</label>
                <input type="date" name="completionDate" value={details.completionDate} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-1">
                <label className={labelClass}>Version</label>
                <input type="text" name="version" value={details.version} onChange={handleChange} className={inputClass} />
            </div>
             <div className="space-y-1">
                <label className={labelClass}>Next Review Due</label>
                <input type="date" name="nextReviewDate" value={details.nextReviewDate} onChange={handleChange} className={inputClass} />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
                <label className={labelClass}>Decision Confidence (0-100)</label>
                <input
                    type="range"
                    name="decisionConfidence"
                    min={0}
                    max={100}
                    value={details.decisionConfidence}
                    onChange={(e) => onChange('decisionConfidence', Number(e.target.value))}
                    className="w-full accent-brand-gold"
                />
                <div className="text-xs font-bold text-brand-black">{details.decisionConfidence}%</div>
                <textarea
                    name="decisionConfidenceNotes"
                    value={details.decisionConfidenceNotes}
                    onChange={handleChange}
                    rows={2}
                    className={inputClass}
                    placeholder="Brief rationale for confidence score"
                />
            </div>
          </div>
      )}

      {/* SECTION: Comments */}
      <SectionHeader title="Comments & Next Steps" id="comments" />
      {activeSection === 'comments' && (
          <div className="grid grid-cols-1 gap-4 mb-6 p-4 border border-brand-grey/20 rounded-sm animate-in fade-in slide-in-from-top-2">
             <div className="space-y-1">
                <label className={labelClass}>Person's Comments (Refusal of s117?)</label>
                <textarea name="personComments" value={details.personComments} onChange={handleChange} rows={2} className={inputClass} />
            </div>
            <div className="space-y-1">
                <label className={labelClass}>Family/Partner Comments</label>
                <textarea name="familyComments" value={details.familyComments} onChange={handleChange} rows={2} className={inputClass} />
            </div>
            <div className="space-y-1">
                <label className={labelClass}>Advocate Comments</label>
                <textarea name="advocateComments" value={details.advocateComments} onChange={handleChange} rows={2} className={inputClass} />
            </div>
            <div className="space-y-1">
                <label className={labelClass}>Next Steps for Delivery</label>
                <textarea name="nextSteps" value={details.nextSteps} onChange={handleChange} rows={3} className={inputClass} />
            </div>
          </div>
      )}
    </div>
  );
};

export default PlanCompletion;
