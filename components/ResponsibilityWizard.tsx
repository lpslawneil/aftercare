
import React, { useState } from 'react';
import { JURISDICTION_RULES } from '../constants';
import { MapPin, Building2, Stethoscope, ArrowRight, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface ResponsibilityWizardProps {
    type: 'ICB' | 'LA';
    onComplete: (result: string, rationale: string) => void;
    onCancel: () => void;
}

const ResponsibilityWizard: React.FC<ResponsibilityWizardProps> = ({ type, onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    
    // Core state
    const [isReDetention, setIsReDetention] = useState<boolean | null>(null);
    
    // LA Form State
    const [residenceBeforeDetention, setResidenceBeforeDetention] = useState('');
    const [placementType, setPlacementType] = useState<'specified' | 'independent' | 'unknown'>('unknown');
    const [isOutOfArea, setIsOutOfArea] = useState(false);
    const [targetArea, setTargetArea] = useState('');
    const [isSelfFunder, setIsSelfFunder] = useState(false);
    const [hasDPA, setHasDPA] = useState(false);
    const [isLookedAfterChild, setIsLookedAfterChild] = useState(false);

    // ICB Form State
    const [gpBeforeDetention, setGpBeforeDetention] = useState('');

    const generateResult = () => {
        let result = '';
        let rationale = '';

        if (type === 'ICB') {
            result = gpBeforeDetention;
            rationale += `[ICB RESPONSIBILITY]: ${gpBeforeDetention} ICB (Originating ICB).\n`;
            rationale += `REASONING: Under 'Who Pays? (August 2025)', the 'Originating ICB' (registered GP at initial detention) retains payment responsibility for detention and after-care until discharge from s117.`;
            if (isReDetention) {
                rationale += `\nNOTE: Re-detention under s.3/37/etc triggers a fresh 'Originating ICB' assessment based on the GP at the time of the NEW detention.`;
            }
        } else {
            // LA Logic
            if (isReDetention) {
                rationale += `[RE-DETENTION IMPACT (Worcestershire Rule)]: \n`;
                rationale += `Under R (Worcestershire) [2023] UKSC 31, the previous s.117 duty has ENDED. A new duty is triggered upon the next discharge.\n`;
                rationale += `Responsibility is fixed to the area of ordinary residence immediately prior to this NEW detention: ${residenceBeforeDetention}.\n\n`;
            }

            rationale += `[s.117 LA RESPONSIBILITY]: ${residenceBeforeDetention} Council.\n`;
            rationale += `REASONING: Responsibility is fixed to the area of ordinary residence immediately prior to the relevant detention (MHA 1983 s.117(3)).\n\n`;
            
            rationale += `[CARE ACT RESPONSIBILITY]: `;
            if (isLookedAfterChild) {
                result = residenceBeforeDetention;
                rationale += `${residenceBeforeDetention} Council (Cornwall Judgment).`;
            } else if (isOutOfArea) {
                if (placementType === 'specified') {
                    if (isSelfFunder && !hasDPA) {
                        result = targetArea || 'Host Authority';
                        rationale += `${targetArea || 'Host'} Council (New OR acquired).`;
                    } else {
                        result = residenceBeforeDetention;
                        rationale += `${residenceBeforeDetention} Council (s.39 Deeming applies).`;
                    }
                } else {
                    result = targetArea || 'Host Authority';
                    rationale += `${targetArea || 'Host'} Council (No Deeming).`;
                }
            } else {
                result = residenceBeforeDetention;
                rationale += `${residenceBeforeDetention} Council (Local).`;
            }
        }

        onComplete(result, rationale);
    };

    const inputClass = "w-full p-2 border border-brand-grey/50 rounded-sm focus:ring-2 focus:ring-brand-gold mt-1 bg-white text-brand-black";
    const btnClass = "w-full text-left p-3 border border-brand-grey/30 rounded-sm hover:bg-brand-grey/5 flex justify-between items-center transition-all bg-white text-brand-black font-medium";

    return (
        <div className="fixed inset-0 bg-brand-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-brand-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="bg-brand-black text-brand-white p-4 border-b-4 border-brand-gold flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-serif font-bold">
                        {type === 'ICB' ? 'ICB Responsibility' : 'Local Authority Responsibility'}
                    </h2>
                    <div className="text-xs font-mono bg-brand-gold text-brand-black px-2 py-1 rounded">
                        Step {step} of {type === 'LA' ? 3 : 2}
                    </div>
                </div>

                <div className="p-6">
                    {/* --- STEP 1: Re-detention Check (Common to both) --- */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300">
                            <div className="bg-brand-grey/5 p-4 border-l-4 border-brand-black">
                                <h3 className="font-bold flex items-center gap-2 text-lg"><Info size={20}/> The Worcestershire Rule</h3>
                                <p className="text-sm text-brand-black/80 mt-2 leading-relaxed">
                                    The Supreme Court (2023) confirmed that re-detention under a qualifying section (s.3, 37, 47, etc.) 
                                    <strong> ends </strong> the previous s.117 duty. 
                                    A new duty arises upon the next discharge.
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-brand-black mb-4">
                                    Is this patient being re-detained while already having an active s.117 plan from a previous detention?
                                </label>
                                <div className="space-y-2">
                                    <button onClick={() => { setIsReDetention(true); setStep(2); }} className={btnClass}>Yes, this is a Re-detention (Previous duty ends) <ArrowRight size={16}/></button>
                                    <button onClick={() => { setIsReDetention(false); setStep(2); }} className={btnClass}>No, this is their first qualifying detention <ArrowRight size={16}/></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- STEP 2: Pre-detention Stats --- */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300">
                            {type === 'ICB' ? (
                                <>
                                    <div className="bg-green-50 p-4 border-l-4 border-green-600 text-brand-black">
                                        <h3 className="font-bold flex items-center gap-2 text-lg"><Stethoscope size={20}/> s117 ICB Rule</h3>
                                        <p className="text-sm mt-1 italic">Determine GP registration at point of detention.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-black">
                                            Which ICB covers the GP practice at the time of THIS detention?
                                        </label>
                                        <input autoFocus type="text" className={inputClass} placeholder="e.g. GM ICB" value={gpBeforeDetention} onChange={(e) => setGpBeforeDetention(e.target.value)} />
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <button onClick={() => setStep(1)} className="text-brand-grey underline">Back</button>
                                        <button disabled={!gpBeforeDetention} onClick={generateResult} className="bg-brand-black text-brand-white px-6 py-2 rounded-sm hover:bg-brand-black/80 flex items-center gap-2">Finish <CheckCircle2 size={16}/></button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="bg-brand-gold/10 p-4 border-l-4 border-brand-gold">
                                        <h3 className="font-bold flex items-center gap-2 text-brand-black text-lg"><MapPin size={20}/> s117 Ordinary Residence</h3>
                                        <p className="text-sm mt-1 italic">Identify physical residence immediately prior to detention.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-black">
                                            Where was the person living IMMEDIATELY before {isReDetention ? 'THIS new' : 'their initial'} detention?
                                        </label>
                                        <input autoFocus type="text" className={inputClass} placeholder="e.g. Manchester City Council" value={residenceBeforeDetention} onChange={(e) => setResidenceBeforeDetention(e.target.value)} />
                                        <div className="mt-3 p-3 bg-red-50 rounded border border-red-100 flex gap-2">
                                            <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5"/>
                                            <p className="text-[11px] text-red-800">
                                                <strong>Caution:</strong> If the patient was in a s.117 placement when re-detained, the <em>Worcestershire</em> rule means that placement area usually becomes their new Ordinary Residence for s.117 purposes.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <button onClick={() => setStep(1)} className="text-brand-grey underline">Back</button>
                                        <button disabled={!residenceBeforeDetention} onClick={() => setStep(3)} className="bg-brand-black text-brand-white px-6 py-2 rounded-sm hover:bg-brand-black/80 flex items-center gap-2">Next <ArrowRight size={16}/></button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* --- STEP 3: LA Care Act (Only for LA type) --- */}
                    {type === 'LA' && step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300">
                            <div className="bg-orange-50 p-4 border-l-4 border-orange-500 text-brand-black text-sm">
                                <h3 className="font-bold flex items-center gap-2 text-lg"><Building2 size={20}/> Care Act Deeming</h3>
                                <p className="mt-1">Care Act OR follows s.39 deeming (Placing Authority remains responsible if placement is in specified accommodation).</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-brand-grey/5 p-3 rounded-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={isLookedAfterChild} onChange={(e) => setIsLookedAfterChild(e.target.checked)} className="w-4 h-4 accent-brand-gold" />
                                        <span className="font-bold text-sm text-brand-black">Was the patient a "Looked After Child" placed out of area before turning 18?</span>
                                    </label>
                                </div>

                                {!isLookedAfterChild && (
                                    <>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={isOutOfArea} onChange={(e) => setIsOutOfArea(e.target.checked)} className="w-4 h-4 accent-brand-gold" />
                                            <span className="font-bold text-sm text-brand-black">Is the patient moving to a different Local Authority area?</span>
                                        </label>

                                        {isOutOfArea && (
                                            <div className="pl-6 space-y-4 border-l-2 border-brand-grey/20">
                                                <input type="text" className={inputClass} placeholder="Target Authority Name" value={targetArea} onChange={(e) => setTargetArea(e.target.value)} />
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 p-2 border rounded-sm hover:bg-brand-grey/5 cursor-pointer">
                                                        <input type="radio" name="placeType" checked={placementType === 'specified'} onChange={() => setPlacementType('specified')} className="accent-brand-gold" />
                                                        <span className="text-sm"><strong>Specified Accommodation</strong> (s.39 Deeming applies)</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 p-2 border rounded-sm hover:bg-brand-grey/5 cursor-pointer">
                                                        <input type="radio" name="placeType" checked={placementType === 'independent'} onChange={() => setPlacementType('independent')} className="accent-brand-gold" />
                                                        <span className="text-sm"><strong>Independent Living</strong> (No Deeming)</span>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="flex justify-between pt-4">
                                <button onClick={() => setStep(2)} className="text-brand-grey underline">Back</button>
                                <button onClick={generateResult} className="bg-brand-gold text-brand-black border border-brand-black px-6 py-2 rounded-sm hover:bg-[#8f7e5e] font-bold flex items-center gap-2 shadow-md">Finish <CheckCircle2 size={18}/></button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="bg-brand-grey/10 p-3 text-center border-t border-brand-grey/20">
                    <button onClick={onCancel} className="text-xs text-brand-grey hover:text-red-500">Cancel Wizard</button>
                </div>
            </div>
        </div>
    );
};

export default ResponsibilityWizard;
