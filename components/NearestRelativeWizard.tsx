
import React, { useState } from 'react';
import { Users, ArrowRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface NRWizardProps {
    onComplete: (result: string, rationale: string) => void;
    onCancel: () => void;
}

const NearestRelativeWizard: React.FC<NRWizardProps> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    
    // State for determinations
    const [hasPartner, setHasPartner] = useState<boolean | null>(null);
    const [partnerEligible, setPartnerEligible] = useState<boolean | null>(null); 
    const [caringRelativeType, setCaringRelativeType] = useState<string>(''); // 'child', 'parent', 'sibling', 'none'
    const [hasChildren, setHasChildren] = useState<boolean | null>(null);
    const [hasParents, setHasParents] = useState<boolean | null>(null);
    const [hasSiblings, setHasSiblings] = useState<boolean | null>(null);

    const btnClass = "w-full text-left p-3 border border-brand-grey/30 rounded-sm hover:bg-brand-grey/5 flex justify-between items-center transition-all bg-white";
    const activeBtnClass = "w-full text-left p-3 border-2 border-brand-gold bg-brand-gold/5 rounded-sm flex justify-between items-center font-bold";

    const determineNR = () => {
        let result = "";
        let rationale = "";

        // 1. Spouse / Civil Partner / Co-habitee (>6 months) - s.26(1)(a) & s.26(6)
        // Note: s.26(4) does not displace an eligible spouse/partner
        if (hasPartner && partnerEligible) {
            result = "Husband / Wife / Civil Partner";
            rationale = "s.26(1)(a): Spouse/CP takes precedence. Includes co-habitees of >6 months (s.26(6)). Section 26(4) displacement does not apply to spouses/partners.";
            finalize(result, rationale);
            return;
        }

        // 2. The Residing/Caring Test (s.26(4))
        // "Where the patient ordinarily resides with or is cared for by one or more of his relatives... 
        // his nearest relative shall be determined by giving preference to that relative..."
        if (caringRelativeType && caringRelativeType !== 'none') {
            const typeMap: Record<string, string> = {
                'child': 'Son or Daughter (Residing/Caring)',
                'parent': 'Parent (Residing/Caring)',
                'sibling': 'Sibling (Residing/Caring)',
                'other': 'Other Relative (Residing/Caring)'
            };
            result = typeMap[caringRelativeType];
            rationale = `s.26(4) Displacement: The patient resides with or is cared for by this relative. This relative is preferred over anyone else in the hierarchy (except a spouse).`;
            finalize(result, rationale);
            return;
        }

        // 3. Standard Hierarchy (s.26(1))
        if (hasChildren) {
            result = "Eldest Son or Daughter (18+)";
            rationale = "s.26(1)(b): Eldest child (18+) takes precedence in the standard hierarchy.";
            finalize(result, rationale);
            return;
        }

        if (hasParents) {
            result = "Mother or Father (Eldest)";
            rationale = "s.26(1)(c): Elder parent takes precedence. Note: Unmarried fathers must have PR (s.26(2)).";
            finalize(result, rationale);
            return;
        }

        if (hasSiblings) {
            result = "Eldest Brother or Sister (Whole Blood)";
            rationale = "s.26(1)(d): Whole blood preferred to half blood. Eldest preferred.";
            finalize(result, rationale);
            return;
        }

        result = "Grandparent / Grandchild / Uncle / Aunt / Nephew / Niece";
        rationale = "s.26(1)(e)-(h): Proceed down hierarchy. Apply 'Eldest' and 'Whole Blood' rules.";
        finalize(result, rationale);
    };

    const finalize = (result: string, rationale: string) => {
        onComplete(result, rationale);
    };

    return (
        <div className="fixed inset-0 bg-brand-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-brand-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="bg-brand-black text-brand-white p-4 border-b-4 border-brand-gold flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                        <Users size={20} className="text-brand-gold"/> s.26 Nearest Relative Wizard
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    {step === 1 && (
                        <div className="animate-in slide-in-from-right">
                            <h3 className="font-bold text-lg mb-2">Step 1: Spouse or Partner</h3>
                            <p className="text-sm text-brand-grey mb-4">Does the patient have a husband, wife, civil partner, or a partner they have lived with for more than 6 months?</p>
                            <div className="space-y-2">
                                <button onClick={() => { setHasPartner(true); setStep(2); }} className={btnClass}>Yes <ArrowRight size={16}/></button>
                                <button onClick={() => { setHasPartner(false); setStep(3); }} className={btnClass}>No <ArrowRight size={16}/></button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in slide-in-from-right">
                            <h3 className="font-bold text-lg mb-2">Step 2: Partner Eligibility</h3>
                            <p className="text-sm text-brand-grey mb-4">Is the relationship active and non-separated? (Partner must not be under 18).</p>
                            <div className="space-y-2">
                                <button onClick={() => { setPartnerEligible(true); determineNR(); }} className={btnClass}>Yes, eligible (Precedes all) <CheckCircle2 size={16}/></button>
                                <button onClick={() => { setPartnerEligible(false); setStep(3); }} className={btnClass}>No, separated/ineligible <ArrowRight size={16}/></button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in slide-in-from-right">
                            <div className="bg-brand-gold/10 p-3 text-xs text-brand-black border-l-4 border-brand-gold mb-4 flex gap-2">
                                <Info size={16} className="shrink-0 text-brand-gold"/>
                                <span><strong>s.26(4) Rule:</strong> If the patient resides with or is cared for by a relative, they displace others in the hierarchy (except spouses).</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Step 3: Residing With or Caring For</h3>
                            <p className="text-sm text-brand-grey mb-4">Does the patient ordinarily reside with, or is explicitly cared for by, any relative?</p>
                            <div className="space-y-2">
                                <button onClick={() => { setCaringRelativeType('child'); determineNR(); }} className={btnClass}>Yes, a Child (18+)</button>
                                <button onClick={() => { setCaringRelativeType('parent'); determineNR(); }} className={btnClass}>Yes, a Parent</button>
                                <button onClick={() => { setCaringRelativeType('sibling'); determineNR(); }} className={btnClass}>Yes, a Sibling</button>
                                <button onClick={() => { setCaringRelativeType('other'); determineNR(); }} className={btnClass}>Yes, another relative</button>
                                <button onClick={() => { setCaringRelativeType('none'); setStep(4); }} className={btnClass}>No / Resides Alone <ArrowRight size={16}/></button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-in slide-in-from-right">
                            <h3 className="font-bold text-lg mb-2">Step 4: Standard Hierarchy</h3>
                            <p className="text-sm text-brand-grey mb-4">Since no residence preference exists, identify the highest relative in the list who is over 18.</p>
                            
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-brand-grey/5 rounded">
                                    <input type="checkbox" onChange={(e) => setHasChildren(e.target.checked)} className="accent-brand-gold w-5 h-5"/>
                                    <span className="text-sm font-medium">Any Children (18+)?</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-brand-grey/5 rounded">
                                    <input type="checkbox" onChange={(e) => setHasParents(e.target.checked)} className="accent-brand-gold w-5 h-5"/>
                                    <span className="text-sm font-medium">Any Parents (w/ PR)?</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-brand-grey/5 rounded">
                                    <input type="checkbox" onChange={(e) => setHasSiblings(e.target.checked)} className="accent-brand-gold w-5 h-5"/>
                                    <span className="text-sm font-medium">Any Siblings (18+)?</span>
                                </label>
                            </div>

                            <button onClick={determineNR} className="mt-6 bg-brand-black text-brand-white w-full py-3 rounded-sm font-bold shadow-lg hover:bg-brand-black/90 transition-all flex items-center justify-center gap-2">
                                Determine NR <CheckCircle2 size={18}/>
                            </button>
                        </div>
                    )}
                </div>

                 <div className="bg-brand-grey/10 p-3 text-center border-t border-brand-grey/20">
                    <button onClick={onCancel} className="text-xs text-brand-grey hover:text-red-500">Cancel Identification</button>
                </div>
            </div>
        </div>
    );
};

export default NearestRelativeWizard;
