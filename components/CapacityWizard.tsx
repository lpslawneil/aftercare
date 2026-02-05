
import React, { useState } from 'react';
import { Brain, ArrowRight, CheckCircle2, AlertCircle, Info, Scale } from 'lucide-react';

interface CapacityWizardProps {
    onComplete: (lacksCapacity: boolean, rationale: string) => void;
    onCancel: () => void;
}

const CapacityWizard: React.FC<CapacityWizardProps> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    const [decision, setDecision] = useState('Where to live upon discharge and the care arrangements there.');
    
    // Functional Test State - Now 5 Stages
    const [understand, setUnderstand] = useState<boolean | null>(null);
    const [retain, setRetain] = useState<boolean | null>(null);
    const [use, setUse] = useState<boolean | null>(null);
    const [weigh, setWeigh] = useState<boolean | null>(null);
    const [communicate, setCommunicate] = useState<boolean | null>(null);
    
    // Mental Impairment Test State (Causative Nexus)
    const [impairment, setImpairment] = useState<boolean | null>(null);

    const btnClass = "w-full text-left p-3 border border-brand-grey/30 rounded-sm hover:bg-brand-grey/5 flex justify-between items-center transition-all bg-white";

    const isFunctionalFailure = 
        understand === false || 
        retain === false || 
        use === false || 
        weigh === false || 
        communicate === false;

    const determineCapacity = () => {
        const lacksCapacity = isFunctionalFailure && (impairment === true);
        
        let rationale = `MCA 2005 s.3 CAPACITY ASSESSMENT\n`;
        rationale += `DECISION: ${decision}\n\n`;
        
        rationale += `1. FUNCTIONAL TEST (5 Stages):\n`;
        rationale += `- Able to understand relevant info: ${understand ? 'YES' : 'NO'}\n`;
        rationale += `- Able to retain info: ${retain ? 'YES' : 'NO'}\n`;
        rationale += `- Able to use info: ${use ? 'YES' : 'NO'}\n`;
        rationale += `- Able to weigh info: ${weigh ? 'YES' : 'NO'}\n`;
        rationale += `- Able to communicate decision: ${communicate ? 'YES' : 'NO'}\n\n`;
        
        if (isFunctionalFailure) {
            rationale += `2. MENTAL IMPAIRMENT TEST (Causative Nexus):\n`;
            rationale += `Is this inability because of an impairment of, or a disturbance in the functioning of, the mind or brain? ${impairment ? 'YES' : 'NO'}\n\n`;
            
            if (lacksCapacity) {
                rationale += `CONCLUSION: The person lacks capacity to make this decision. The functional inability is caused by an impairment/disturbance of the mind or brain.`;
            } else {
                rationale += `CONCLUSION: The person has capacity. Although a functional inability was noted, it was not established that this was caused by a mental impairment (causative nexus not met).`;
            }
        } else {
            rationale += `CONCLUSION: The person has capacity. All functional stages were met. The presumption of capacity remains.`;
        }

        onComplete(lacksCapacity, rationale);
    };

    const handleNextFromFunctional = () => {
        if (isFunctionalFailure) {
            setStep(3); // Go to impairment test
        } else {
            determineCapacity(); // All pass, conclude
        }
    };

    return (
        <div className="fixed inset-0 bg-brand-black/50 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
            <div className="bg-brand-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden">
                <div className="bg-brand-black text-brand-white p-4 border-b-4 border-brand-gold flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                        <Brain size={20} className="text-brand-gold"/> MCA Capacity Assistant
                    </h2>
                </div>

                <div className="p-6 space-y-4">
                    {/* STEP 1: DEFINE DECISION */}
                    {step === 1 && (
                        <div className="animate-in slide-in-from-right">
                            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                                <Scale size={18} className="text-brand-gold" /> Step 1: Specific Decision
                            </h3>
                            <p className="text-xs text-brand-grey mb-4 italic">Capacity must always be assessed in relation to a specific decision at a specific time.</p>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-brand-black uppercase">Decision Details</label>
                                <textarea 
                                    className="w-full p-2 border border-brand-grey/50 rounded-sm mb-4 text-sm"
                                    rows={3}
                                    value={decision}
                                    onChange={(e) => setDecision(e.target.value)}
                                />
                            </div>
                            <button onClick={() => setStep(2)} className="bg-brand-black text-brand-white w-full py-3 font-bold rounded-sm hover:bg-brand-black/90 transition-colors">
                                Start Functional Test
                            </button>
                        </div>
                    )}

                    {/* STEP 2: FUNCTIONAL TEST */}
                    {step === 2 && (
                        <div className="animate-in slide-in-from-right">
                             <div className="bg-blue-50 p-3 text-xs text-blue-800 border-l-4 border-blue-600 mb-4 flex gap-2">
                                <Info size={16} className="shrink-0 text-blue-600"/>
                                <span><strong>Principles:</strong> Presume capacity and provide all practicable support.</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Step 2: Functional Test (5 Stages)</h3>
                            <p className="text-xs text-brand-grey mb-4">Can the person make the decision with support?</p>
                            
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-brand-black">1. Understand relevant information?</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setUnderstand(true)} className={`flex-1 py-2 text-xs border ${understand === true ? 'bg-brand-gold text-brand-white border-brand-gold' : 'bg-white text-brand-black'}`}>Yes</button>
                                        <button onClick={() => setUnderstand(false)} className={`flex-1 py-2 text-xs border ${understand === false ? 'bg-red-600 text-brand-white border-red-600' : 'bg-white text-brand-black'}`}>No</button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-brand-black">2. Retain that information?</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setRetain(true)} className={`flex-1 py-2 text-xs border ${retain === true ? 'bg-brand-gold text-brand-white border-brand-gold' : 'bg-white text-brand-black'}`}>Yes</button>
                                        <button onClick={() => setRetain(false)} className={`flex-1 py-2 text-xs border ${retain === false ? 'bg-red-600 text-brand-white border-red-600' : 'bg-white text-brand-black'}`}>No</button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-brand-black">3. Use that information?</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setUse(true)} className={`flex-1 py-2 text-xs border ${use === true ? 'bg-brand-gold text-brand-white border-brand-gold' : 'bg-white text-brand-black'}`}>Yes</button>
                                        <button onClick={() => setUse(false)} className={`flex-1 py-2 text-xs border ${use === false ? 'bg-red-600 text-brand-white border-red-600' : 'bg-white text-brand-black'}`}>No</button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-brand-black">4. Weigh that information?</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setWeigh(true)} className={`flex-1 py-2 text-xs border ${weigh === true ? 'bg-brand-gold text-brand-white border-brand-gold' : 'bg-white text-brand-black'}`}>Yes</button>
                                        <button onClick={() => setWeigh(false)} className={`flex-1 py-2 text-xs border ${weigh === false ? 'bg-red-600 text-brand-white border-red-600' : 'bg-white text-brand-black'}`}>No</button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-brand-black">5. Communicate their decision?</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setCommunicate(true)} className={`flex-1 py-2 text-xs border ${communicate === true ? 'bg-brand-gold text-brand-white border-brand-gold' : 'bg-white text-brand-black'}`}>Yes</button>
                                        <button onClick={() => setCommunicate(false)} className={`flex-1 py-2 text-xs border ${communicate === false ? 'bg-red-600 text-brand-white border-red-600' : 'bg-white text-brand-black'}`}>No</button>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleNextFromFunctional}
                                disabled={understand === null || retain === null || use === null || weigh === null || communicate === null}
                                className="mt-6 bg-brand-black text-brand-white w-full py-3 rounded-sm font-bold disabled:opacity-50 hover:bg-brand-black/90 transition-colors"
                            >
                                {isFunctionalFailure ? 'Proceed to Mental Impairment Test' : 'Complete Assessment (Capacity Presumed)'}
                            </button>
                        </div>
                    )}

                    {/* STEP 3: MENTAL IMPAIRMENT TEST (CAUSATIVE NEXUS) */}
                    {step === 3 && (
                        <div className="animate-in slide-in-from-right">
                             <div className="bg-red-50 p-3 text-xs text-red-800 border-l-4 border-red-600 mb-4 flex gap-2">
                                <AlertCircle size={16} className="shrink-0 text-red-600"/>
                                <span>A functional failure has been identified. Now determine the <strong>causative nexus</strong>.</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Step 3: Mental Impairment Test</h3>
                            <p className="text-xs text-brand-grey mb-4">Is the person's inability to make the decision <strong>because of</strong> an impairment of, or a disturbance in the functioning of, the mind or brain?</p>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => { setImpairment(true); }} 
                                    className={`${btnClass} ${impairment === true ? 'ring-2 ring-brand-gold border-brand-gold' : ''}`}
                                >
                                    Yes (Causative Nexus Established) <CheckCircle2 size={16} className={impairment === true ? 'text-brand-gold' : 'text-brand-grey'}/>
                                </button>
                                <button 
                                    onClick={() => { setImpairment(false); }} 
                                    className={`${btnClass} ${impairment === false ? 'ring-2 ring-brand-gold border-brand-gold' : ''}`}
                                >
                                    No (Functional failure due to other reasons) <ArrowRight size={16} className={impairment === false ? 'text-brand-gold' : 'text-brand-grey'}/>
                                </button>
                            </div>

                            <button 
                                onClick={determineCapacity}
                                disabled={impairment === null}
                                className="mt-8 bg-brand-black text-brand-white w-full py-3 rounded-sm font-bold disabled:opacity-50 hover:bg-brand-black/90 transition-colors"
                            >
                                Generate Final Finding
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-brand-grey/10 p-3 text-center border-t border-brand-grey/20">
                    <button onClick={onCancel} className="text-xs text-brand-grey hover:text-red-500">Cancel Assessment</button>
                </div>
            </div>
        </div>
    );
};

export default CapacityWizard;
