
import React from 'react';
import { NeedItem, PatientDetails, NeedCategory, NeedDomain } from '../types';
import { Printer, Scale, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { MHA_SECTIONS } from '../constants';

interface SupportPlanProps {
  details: PatientDetails;
  needs: NeedItem[];
}

const SupportPlan: React.FC<SupportPlanProps> = ({ details, needs }) => {
  const handlePrint = () => window.print();

  const getFundingSource = (need: NeedItem) => {
    if (need.category === NeedCategory.PHYSICAL_HEALTH) return "ICB (NHS)";
    if (need.category === NeedCategory.CARE_ACT) return "Local Authority";
    return "Joint (ICB & LA)";
  };

  const groupedNeeds = Object.values(NeedDomain).reduce((acc, domain) => {
    acc[domain] = needs.filter(n => n.domain === domain);
    return acc;
  }, {} as Record<NeedDomain, NeedItem[]>);

  const domainsWithNeeds = Object.values(NeedDomain).filter(domain => groupedNeeds[domain] && groupedNeeds[domain].length > 0);
  const selectedSection = MHA_SECTIONS.find(s => s.code === details.mhaSection);
  const isEntitled = selectedSection?.eligible;
  const s117Count = needs.filter(n => n.category === NeedCategory.S117).length;
  const careActCount = needs.filter(n => n.category === NeedCategory.CARE_ACT).length;
  const physicalCount = needs.filter(n => n.category === NeedCategory.PHYSICAL_HEALTH).length;

  const TableRow = ({ label, value, span = 1 }: { label: string, value: string | React.ReactNode, span?: number }) => (
      <div className={`col-span-${span} flex border-b border-brand-black last:border-b-0`}>
          <div className="w-1/3 bg-brand-grey/10 p-2 border-r border-brand-black font-bold text-[10px] uppercase flex items-center">{label}</div>
          <div className="w-2/3 p-2 text-sm whitespace-pre-wrap flex items-center">{value}</div>
      </div>
  );

  const TwoColRow = ({ left, right }: { left: {l: string, v: string}, right: {l: string, v: string} }) => (
      <div className="grid grid-cols-2 border-b border-brand-black">
          <div className="flex border-r border-brand-black">
               <div className="w-1/3 bg-brand-grey/10 p-2 border-r border-brand-black font-bold text-[10px] uppercase flex items-center">{left.l}</div>
               <div className="w-2/3 p-2 text-sm">{left.v}</div>
          </div>
          <div className="flex">
               <div className="w-1/3 bg-brand-grey/10 p-2 border-r border-brand-black font-bold text-[10px] uppercase flex items-center">{right.l}</div>
               <div className="w-2/3 p-2 text-sm">{right.v}</div>
          </div>
      </div>
  );

  return (
    <div id="draft-plan" className="bg-white p-8 mt-8 print:p-0 print:m-0 print:w-full max-w-[210mm] mx-auto shadow-2xl border border-brand-grey/20">
      <div className="flex justify-between items-start mb-6 print:hidden">
        <div>
            <h2 className="text-2xl font-bold text-brand-black font-serif">Holistic After-care Needs Plan</h2>
            <p className="text-brand-grey text-sm">Official Record: Generated via Professional Assessment Tool</p>
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 bg-brand-black text-brand-white px-6 py-2.5 rounded-sm hover:bg-brand-black/80 shadow-lg transition-all font-bold text-sm uppercase tracking-widest">
            <Printer size={18} /> Generate PDF / Print
        </button>
      </div>

      <div className="print:block space-y-6 text-sm font-sans text-black border border-brand-black p-1 bg-brand-white">
        {/* Formal Header */}
        <div className="bg-brand-black text-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <FileText size={40} className="text-brand-gold" />
                <div>
                    <h1 className="text-2xl font-serif font-bold uppercase tracking-widest">Statutory Support Plan</h1>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest">Compliance Level: High | Audit Ready</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs font-bold text-brand-gold">VERSION: {details.version}</p>
                <p className="text-[10px] opacity-70 italic">Ref: {details.nhsNumber || 'NO-NHS-REF'}</p>
            </div>
        </div>

        {/* SECTION 1: Patient Details */}
        <div className="bg-brand-white border border-brand-black">
            <h3 className="bg-brand-grey/10 font-bold italic text-md p-2 border-b border-brand-black uppercase tracking-widest text-brand-black">Demographic Information</h3>
            <div className="grid grid-cols-1">
                <TwoColRow left={{l: "Full Name", v: details.name}} right={{l: "MHA Status", v: details.mhaSection}} />
                <TwoColRow left={{l: "NHS Number", v: details.nhsNumber}} right={{l: "DOB", v: details.dob}} />
                <TableRow label="Diagnoses" value={details.diagnoses} />
                <TwoColRow left={{l: "Responsible LA", v: details.responsibleLA}} right={{l: "Responsible ICB", v: details.responsibleICB}} />
                <TableRow label="Nearest Relative (s.26)" value={details.nearestRelative} />
            </div>
        </div>

        {/* SECTION 1A: Legal Basis Summary */}
        <div className="bg-brand-white border border-brand-black">
            <h3 className="bg-brand-grey/10 font-bold italic text-md p-2 border-b border-brand-black uppercase tracking-widest text-brand-black">Legal Basis Summary</h3>
            <div className="grid grid-cols-1">
                <TableRow label="s.117 Entitlement" value={isEntitled ? `Entitled (Detention: ${selectedSection?.label || 'Unknown'})` : `Not entitled (Detention: ${selectedSection?.label || 'Unknown'})`} />
                <TwoColRow left={{l: "Responsible LA", v: details.responsibleLA}} right={{l: "Responsible ICB", v: details.responsibleICB}} />
                {details.responsibilityRationale && (
                    <TableRow label="Responsibility Rationale" value={details.responsibilityRationale} />
                )}
            </div>
        </div>

        {/* SECTION 2: Legal Safeguards */}
        <div className="bg-brand-white border border-brand-black">
            <h3 className="bg-brand-grey/10 font-bold italic text-md p-2 border-b border-brand-black flex items-center gap-2 uppercase tracking-widest text-brand-black">
                <ShieldCheck size={18} className="text-brand-gold" /> Statutory Safeguards & Advocacy
            </h3>
            <div className="grid grid-cols-1">
                <TwoColRow 
                    left={{l: "IMHA Referral", v: details.imhaReferralDone ? "COMPLETED (s.130A compliant)" : "NOT COMPLETED / NA"}} 
                    right={{l: "IMCA Referral", v: details.imcaReferralDone ? "COMPLETED (MCA compliant)" : "NOT COMPLETED / NA"}} 
                />
                <TableRow 
                    label="Mental Capacity Findings" 
                    value={
                        details.mcaAssessmentRationale ? (
                            <div className="font-mono text-[11px] whitespace-pre-wrap leading-relaxed">{details.mcaAssessmentRationale}</div>
                        ) : (
                            details.dolCapacity ? "Assessed as lacking capacity for residence/care decisions." : "Presumed to have capacity for relevant decisions."
                        )
                    } 
                />
                {details.dolSupervision && !details.dolFreeToLeave && (
                    <TableRow 
                        label="Deprivation of Liberty" 
                        value={
                            <div className="flex items-center gap-2 text-red-700 font-bold">
                                <AlertCircle size={14} /> Acid Test Met: DoLS Authorisation / Court Order Required.
                            </div>
                        } 
                    />
                )}
            </div>
        </div>

        {/* SECTION 3: s.117 Evidence (Critical for funding) */}
        {needs.some(n => n.category === NeedCategory.S117) && (
            <div className="bg-brand-white border border-brand-black">
                <h3 className="bg-brand-black text-white font-bold italic text-md p-2 flex items-center gap-2 uppercase tracking-widest">
                    <CheckCircle2 size={18} className="text-brand-gold" /> s.117(6) Statutory Purpose Evidence
                </h3>
                <div className="p-4 bg-brand-grey/5">
                    <p className="text-[11px] font-bold text-brand-black mb-2 underline">PROFESSIONAL DEFENSE OF LIMB 2:</p>
                    <p className="text-xs text-brand-black leading-relaxed italic whitespace-pre-wrap border-l-4 border-brand-gold pl-4 py-2">
                        {details.s117Limb2Evidence || "WARNING: No professional evidence provided for readmission prevention."}
                    </p>
                </div>
            </div>
        )}

        {/* SECTION 4: Needs Matrix */}
        <div className="bg-brand-white border border-brand-black">
             <h3 className="bg-brand-grey/10 font-bold italic text-md p-2 border-b border-brand-black uppercase tracking-widest text-brand-black">Assessed Needs & Interventions</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 border-b border-brand-black text-[10px] uppercase tracking-widest">
                <div className="p-2 border-r border-brand-black bg-brand-gold/10">
                    s.117 After-care: <span className="font-bold">{s117Count}</span>
                </div>
                <div className="p-2 border-r border-brand-black bg-orange-100/60">
                    Care Act: <span className="font-bold">{careActCount}</span>
                </div>
                <div className="p-2 bg-green-100/60">
                    Physical Health (NHS): <span className="font-bold">{physicalCount}</span>
                </div>
             </div>
             {domainsWithNeeds.length > 0 ? (
                domainsWithNeeds.map((domain) => (
                    <div key={domain} className="border-b border-brand-black last:border-b-0 break-inside-avoid">
                        <div className="bg-brand-grey/10 p-2 font-bold font-serif text-[11px] border-b border-brand-grey/30 uppercase tracking-widest">{domain}</div>
                        <table className="w-full text-[11px]">
                             <tbody>
                                {groupedNeeds[domain].map((need, idx) => (
                                    <tr key={need.id} className={idx !== groupedNeeds[domain].length -1 ? "border-b border-brand-grey/20" : ""}>
                                        <td className="p-3 w-1/3 border-r border-brand-grey/20 align-top">
                                            <span className="font-bold block mb-1">{need.description}</span>
                                            <div className={`text-[8px] font-bold uppercase tracking-tighter px-1 border inline-block rounded-sm
                                                ${need.category === NeedCategory.S117 ? 'border-brand-gold text-brand-black bg-brand-gold/10' : 'border-brand-grey text-brand-grey'}`}>
                                                {need.category}
                                            </div>
                                        </td>
                                        <td className="p-3 w-1/3 border-r border-brand-grey/20 align-top">
                                            {need.intervention}
                                            <div className="text-[9px] italic mt-1 text-brand-grey">By: {need.provider}</div>
                                        </td>
                                        <td className="p-3 w-1/3 align-top font-bold text-right uppercase tracking-widest text-brand-black">
                                            {getFundingSource(need)}
                                        </td>
                                    </tr>
                                ))}
                             </tbody>
                        </table>
                    </div>
                ))
             ) : (
                 <div className="p-8 text-center text-brand-grey italic">No assessed needs found in identification module.</div>
             )}
        </div>

        {/* Completion Detail */}
        <div className="bg-brand-white border border-brand-black">
            <h3 className="bg-brand-grey/10 font-bold italic text-md p-2 border-b border-brand-black uppercase tracking-widest text-brand-black">Authorization & Review</h3>
            <TwoColRow left={{l: "Completed By", v: details.completedBy}} right={{l: "Professional Designation", v: details.designation}} />
            <TwoColRow left={{l: "Completion Date", v: details.completionDate}} right={{l: "Next Review Due", v: details.nextReviewDate}} />
            <TwoColRow left={{l: "Case Status", v: details.caseStatus}} right={{l: "Decision Confidence", v: `${details.decisionConfidence}%`}} />
            {details.decisionConfidenceNotes && (
                <TableRow label="Decision Confidence Notes" value={details.decisionConfidenceNotes} />
            )}
        </div>

        {/* Professional Footer */}
        <div className="p-4 text-[9px] text-brand-grey text-center italic border-t border-brand-black">
            Generated via Neil AI-len Decision Support. This document is a formal assessment under the MHA 1983 and Care Act 2014. 
            All funding allocations are indicative based on the identified legal character of needs.
        </div>
      </div>
    </div>
  );
};

export default SupportPlan;
