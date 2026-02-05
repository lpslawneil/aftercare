
import React, { useState } from 'react';
import { PatientDetails } from '../types';
import { AlertOctagon, Scale, ShieldCheck, Lock, Building2, Home, Brain } from 'lucide-react';
import CapacityWizard from './CapacityWizard';

interface DoLCheckerProps {
    details: PatientDetails;
    onChange: (field: keyof PatientDetails, value: any) => void;
}

const DoLChecker: React.FC<DoLCheckerProps> = ({ details, onChange }) => {
    const [settingType, setSettingType] = useState<'institutional' | 'community'>('institutional');
    const [showCapacityWizard, setShowCapacityWizard] = useState(false);
    
    // Acid Test components
    const isUnderSupervision = details.dolSupervision; // "Continuous/complete supervision and control"
    const isFreeToLeave = details.dolFreeToLeave;     // "Is the person free to leave to live elsewhere"
    const lacksCapacity = details.dolCapacity;       // "Unable to give valid consent"
    
    // Objective element of DoL (Acid Test)
    const isDeprivedOfLiberty = isUnderSupervision && !isFreeToLeave;
    
    const getAge = (dob: string) => {
        if (!dob) return 18;
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const age = getAge(details.dob);
    const isChild = age < 18;

    let status = 'ok';
    let message = '';
    let recommendation = '';

    if (isDeprivedOfLiberty) {
        if (!lacksCapacity) {
            // Objective deprivation exists but person is "able to give valid consent" (No to point 3)
            status = 'critical';
            message = "Unlawful Deprivation of Liberty (Capacious Patient).";
            recommendation = "A person with capacity cannot 'consent' to a deprivation of liberty in a way that avoids the need for a legal framework if the MHA is relevant (MM judgment). If they are not detained under the MHA, and you are exercising complete supervision and they are not free to leave, this is legally high-risk.";
        } else {
            // Objective deprivation + Unable to consent (Yes to point 3)
            if (details.mhaSection === 'CTO' || details.isRestricted) {
                status = 'critical';
                message = "CRITICAL LEGAL RISK: 'MM' / 'PJ' Conflict.";
                recommendation = "The Supreme Court (in MM & PJ) ruled that neither a CTO nor a Conditional Discharge can authorise a deprivation of liberty. You must seek Court of Protection authorisation immediately.";
            } else if (isChild) {
                status = 'warning';
                message = `Deprivation of Liberty (Child aged ${age}).`;
                recommendation = "DoLS applies to adults (18+) only. Consider s.25 Children Act or Inherent Jurisdiction of the High Court.";
            } else {
                status = 'warning';
                if (settingType === 'institutional') {
                     message = "DoLS Authorisation Required.";
                     recommendation = "Apply for a DoLS authorisation to the 'Supervisory Body' (the Local Authority). Ensure the 'Acid Test' findings are clearly documented in the application.";
                } else {
                     message = "Court of Protection Order Required.";
                     recommendation = "DoLS cannot be used in community settings (e.g. supported living). You must apply to the Court of Protection (likely via the 'Re X' streamlined procedure) to authorise this deprivation.";
                }
            }
        }
    } else {
        status = 'ok';
        message = "No Deprivation of Liberty identified.";
        recommendation = "Based on the current assessment, the objective 'Acid Test' is not met. Ensure the care plan remains the least restrictive option and monitor for changes in supervision or freedom.";
    }

    const toggleClass = "w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer flex items-center shrink-0";
    const toggleOn = "bg-brand-gold justify-end";
    const toggleOff = "bg-brand-grey/50 justify-start";
    const thumbClass = "w-4 h-4 bg-white rounded-full shadow-md";

    return (
        <div className="bg-brand-white border border-brand-grey/30 rounded-sm p-5 shadow-sm mt-4">
            {showCapacityWizard && (
                <CapacityWizard 
                    onComplete={(lacks, rationale) => {
                        onChange('dolCapacity', lacks);
                        onChange('mcaAssessmentRationale', rationale);
                        setShowCapacityWizard(false);
                    }}
                    onCancel={() => setShowCapacityWizard(false)}
                />
            )}

            <h3 className="font-serif font-bold text-lg text-brand-black flex items-center gap-2 mb-4 border-b border-brand-grey/20 pb-2">
                <Scale size={20} className="text-brand-gold"/> 
                Deprivation of Liberty (DoL) Checker
            </h3>
            
            <div className="space-y-4">
                {/* 1. Continuous/complete supervision and control */}
                <div className="flex justify-between items-center bg-brand-grey/5 p-3 rounded-sm">
                    <div className="pr-4">
                        <label className="font-bold text-sm text-brand-black block">1. Continuous/complete supervision and control?</label>
                        <p className="text-[10px] text-brand-grey mt-0.5">Is the person's life managed and monitored by staff at all times?</p>
                    </div>
                    <div 
                        className={`${toggleClass} ${details.dolSupervision ? toggleOn : toggleOff}`} 
                        onClick={() => onChange('dolSupervision', !details.dolSupervision)}
                        role="switch"
                        aria-checked={details.dolSupervision}
                    >
                        <div className={thumbClass}></div>
                    </div>
                </div>

                {/* 2. Is the person free to leave to live elsewhere */}
                <div className="flex justify-between items-center bg-brand-grey/5 p-3 rounded-sm">
                    <div className="pr-4">
                        <label className="font-bold text-sm text-brand-black block">2. Is the person free to leave to live elsewhere?</label>
                        <p className="text-[10px] text-brand-grey mt-0.5">Would they be prevented from leaving permanently if they tried?</p>
                    </div>
                    <div 
                        className={`${toggleClass} ${details.dolFreeToLeave ? toggleOn : toggleOff}`} 
                        onClick={() => onChange('dolFreeToLeave', !details.dolFreeToLeave)}
                        role="switch"
                        aria-checked={details.dolFreeToLeave}
                    >
                        <div className={thumbClass}></div>
                    </div>
                </div>

                {/* 3. Unable to give valid consent */}
                <div className="flex justify-between items-start bg-brand-grey/5 p-3 rounded-sm">
                    <div className="pr-4 flex-grow">
                        <label className="font-bold text-sm text-brand-black block">3. Unable to give valid consent?</label>
                        <p className="text-[10px] text-brand-grey mt-0.5 mb-2">Does the person lack the mental capacity to consent to these arrangements?</p>
                        <button 
                            onClick={() => setShowCapacityWizard(true)}
                            className="text-[10px] text-brand-gold font-bold uppercase flex items-center gap-1 hover:text-brand-black transition-colors"
                        >
                            <Brain size={12} /> Use Structured MCA Assessment Wizard
                        </button>
                    </div>
                    <div 
                        className={`${toggleClass} ${details.dolCapacity ? toggleOn : toggleOff}`} 
                        onClick={() => onChange('dolCapacity', !details.dolCapacity)}
                        role="switch"
                        aria-checked={details.dolCapacity}
                    >
                        <div className={thumbClass}></div>
                    </div>
                </div>

                {details.mcaAssessmentRationale && (
                    <div className="p-3 bg-brand-grey/5 border border-brand-grey/20 text-[10px] font-mono text-brand-black whitespace-pre-wrap rounded-sm">
                        <span className="font-bold uppercase text-brand-grey block mb-1">MCA Rationale:</span>
                        {details.mcaAssessmentRationale}
                    </div>
                )}

                {lacksCapacity && (
                    <div className="mt-2 animate-in fade-in">
                        <label className="block text-xs font-bold text-brand-black uppercase mb-1">s.4 Best Interests Summary (if unable to consent)</label>
                        <textarea 
                            className="w-full p-2 text-xs border border-brand-grey/30 rounded-sm focus:ring-1 focus:ring-brand-gold"
                            placeholder="Briefly describe why this is the least restrictive option and who has been consulted (NR/Advocate/Family)..."
                            value={details.bestInterestsRationale}
                            onChange={(e) => onChange('bestInterestsRationale', e.target.value)}
                            rows={2}
                        />
                    </div>
                )}

                {isDeprivedOfLiberty && lacksCapacity && !details.isRestricted && !isChild && (
                    <div className="mt-4 p-3 border border-brand-grey/20 rounded-sm bg-white">
                        <label className="block text-xs font-bold text-brand-black mb-2 uppercase">Proposed Setting Type</label>
                        <div className="flex gap-2">
                            <button onClick={() => setSettingType('institutional')} className={`flex-1 py-2 px-3 rounded-sm text-xs font-bold flex items-center justify-center gap-2 border transition-all ${settingType === 'institutional' ? 'bg-brand-black text-brand-white border-brand-black' : 'text-brand-grey border-brand-grey/30 hover:border-brand-grey'}`}>
                                <Building2 size={14} /> Hospital / Care Home
                            </button>
                            <button onClick={() => setSettingType('community')} className={`flex-1 py-2 px-3 rounded-sm text-xs font-bold flex items-center justify-center gap-2 border transition-all ${settingType === 'community' ? 'bg-brand-black text-brand-white border-brand-black' : 'text-brand-grey border-brand-grey/30 hover:border-brand-grey'}`}>
                                <Home size={14} /> Community
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`mt-6 p-4 rounded-sm border-l-4 transition-all duration-500 shadow-inner ${status === 'critical' ? 'bg-red-50 border-red-600' : status === 'warning' ? 'bg-orange-50 border-orange-500' : 'bg-green-50 border-green-600'}`}>
                <div className="flex items-start gap-3">
                    {status === 'critical' && <AlertOctagon className="text-red-600 shrink-0" size={24} />}
                    {status === 'warning' && <Lock className="text-orange-600 shrink-0" size={24} />}
                    {status === 'ok' && <ShieldCheck className="text-green-600 shrink-0" size={24} />}
                    <div>
                        <h4 className={`font-bold text-sm ${status === 'critical' ? 'text-red-800' : status === 'warning' ? 'text-orange-800' : 'text-green-800'}`}>
                            {message}
                        </h4>
                        <p className="text-xs mt-1 text-brand-black/80 font-medium whitespace-pre-line leading-relaxed">
                            {recommendation}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoLChecker;
