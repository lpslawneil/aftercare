
import React, { useMemo, useState } from 'react';
import { NeedItem, NeedCategory, FundingSplit, Severity, PatientDetails } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, Settings, GripHorizontal, Hash, AlertTriangle, ShieldCheck, Gavel } from 'lucide-react';
import { NEILS_NOTES } from '../constants';

interface FundingCalculatorProps {
  needs: NeedItem[];
  details: PatientDetails;
  onChange: (field: keyof PatientDetails, value: any) => void;
}

type CalculationMethod = 'weighted' | 'count';

const FundingCalculator: React.FC<FundingCalculatorProps> = ({ needs, details, onChange }) => {
  const [s117Split, setS117Split] = useState(50);
  const [calcMethod, setCalcMethod] = useState<CalculationMethod>('weighted');
  const [showExplanation, setShowExplanation] = useState(false);

  const getScore = (severity: Severity, method: CalculationMethod): number => {
      if (method === 'count') return 1;
      switch (severity) {
          case 'High': return 3;
          case 'Medium': return 2;
          case 'Low': return 1;
          default: return 1;
      }
  };

  const data: FundingSplit = useMemo(() => {
    let s117 = 0;
    let careAct = 0;
    let physical = 0;

    needs.forEach(n => {
        const score = getScore(n.severity, calcMethod);
        if (n.category === NeedCategory.S117) s117 += score;
        if (n.category === NeedCategory.CARE_ACT) careAct += score;
        if (n.category === NeedCategory.PHYSICAL_HEALTH) physical += score;
    });

    const s117_ICB_Portion = s117 * (s117Split / 100);
    const s117_LA_Portion = s117 * ((100 - s117Split) / 100);

    const icbTotal = physical + s117_ICB_Portion;
    const laTotal = careAct + s117_LA_Portion;
    const total = icbTotal + laTotal;

    return {
        totalScore: total,
        icbScore: icbTotal,
        laScore: laTotal,
        icbPercentage: total > 0 ? (icbTotal / total) * 100 : 0,
        laPercentage: total > 0 ? (laTotal / total) * 100 : 0,
        s117Score: s117,
        careActScore: careAct,
        physicalHealthScore: physical
    };
  }, [needs, s117Split, calcMethod]);

  const chartData = [
    { name: 'ICB (NHS) Responsibility', value: data.icbPercentage, color: '#373535' },
    { name: 'Local Authority Responsibility', value: data.laPercentage, color: '#A89673' },
  ];

  return (
    <div id="funding" className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 mt-6">
      <div className="flex justify-between items-center mb-4 border-b border-brand-grey/30 pb-2">
        <h2 className="text-xl font-serif font-bold text-brand-black">3. Indicative Responsibility Split</h2>
        <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-xs flex items-center gap-1 text-brand-gold font-bold uppercase hover:text-brand-black transition-colors"
        >
            <Info size={14} /> Methodology
        </button>
      </div>

      {showExplanation && (
          <div className="bg-brand-grey/10 p-4 rounded-sm border-l-4 border-brand-black mb-6 animate-in fade-in slide-in-from-top-2 text-xs text-brand-black">
              <h4 className="font-bold mb-2 font-serif uppercase tracking-widest text-[10px]">Calculation Methodology</h4>
              <p className="mb-2">This tool maps legal categorization to agency duty:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li><strong>Physical Health:</strong> NHS duty (Coughlan principle).</li>
                  <li><strong>Care Act:</strong> Local Authority duty.</li>
                  <li><strong>s.117:</strong> Shared duty, split via local Section 75 agreement slider.</li>
              </ul>
              <p className="italic text-brand-grey">{NEILS_NOTES.DISPUTE}</p>
          </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-6">
            
            <div className="bg-white p-3 rounded-sm border border-brand-grey/30 shadow-inner">
                <label className="block text-[10px] font-bold text-brand-grey uppercase mb-2 flex items-center gap-2">
                    <Settings size={14} /> Scoring Logic
                </label>
                <div className="flex bg-brand-grey/10 p-1 rounded-sm">
                    <button 
                        onClick={() => setCalcMethod('weighted')}
                        className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-bold rounded-sm transition-all ${
                            calcMethod === 'weighted' ? 'bg-white shadow-sm text-brand-black' : 'text-brand-grey hover:text-brand-black'
                        }`}
                    >
                        <GripHorizontal size={14} /> Severity Weighted
                    </button>
                    <button 
                         onClick={() => setCalcMethod('count')}
                         className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-bold rounded-sm transition-all ${
                            calcMethod === 'count' ? 'bg-white shadow-sm text-brand-black' : 'text-brand-grey hover:text-brand-black'
                        }`}
                    >
                        <Hash size={14} /> Simple Count
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-sm border border-brand-grey/30 shadow-sm">
                <label className="block text-xs font-bold text-brand-black mb-2 uppercase tracking-wide">
                    s.117 Joint Duty Split (%)
                </label>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-brand-black whitespace-nowrap">NHS: {s117Split}%</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={s117Split} 
                        onChange={(e) => setS117Split(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-brand-grey/30 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                    />
                    <span className="text-[10px] font-bold text-brand-gold whitespace-nowrap">LA: {100 - s117Split}%</span>
                </div>
            </div>

            {/* Dispute Resolution Module */}
            <div className={`p-4 rounded-sm border-2 transition-all duration-500 ${details.disputeStatus === 'Active' ? 'bg-red-50 border-red-600 shadow-lg animate-pulse' : 'bg-brand-grey/5 border-dashed border-brand-grey/30'}`}>
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-xs uppercase flex items-center gap-2">
                        <Gavel size={16} className={details.disputeStatus === 'Active' ? 'text-red-600' : 'text-brand-grey'}/> 
                        Statutory Dispute Matrix
                    </h4>
                    <button 
                        onClick={() => onChange('disputeStatus', details.disputeStatus === 'Active' ? 'None' : 'Active')}
                        className={`text-[9px] font-bold px-2 py-1 rounded transition-colors ${details.disputeStatus === 'Active' ? 'bg-red-600 text-white' : 'bg-brand-grey/20 text-brand-grey'}`}
                    >
                        {details.disputeStatus === 'Active' ? 'CLOSE DISPUTE' : 'LOG DISPUTE'}
                    </button>
                </div>
                {details.disputeStatus === 'Active' ? (
                    <div className="text-[10px] text-red-800 space-y-2">
                        <p className="font-bold">AGENCY DISPUTE TRIGGERED:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Care must be delivered by the 'hosting' authority immediately.</li>
                            <li>Ordinary Residence dispute to be sent to SSHSC within 28 days.</li>
                            <li>ICB 'Who Pays' escalation to regional leads.</li>
                        </ul>
                    </div>
                ) : (
                    <p className="text-[10px] text-brand-grey italic">No active funding or residence dispute logged between agencies.</p>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between p-3 bg-brand-black text-brand-white rounded-sm border border-brand-black shadow-md">
                    <div>
                        <span className="block font-bold text-xs uppercase tracking-widest">ICB (NHS) Estimate</span>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-xl">{data.icbPercentage.toFixed(1)}%</span>
                    </div>
                </div>

                <div className="flex justify-between p-3 bg-brand-gold text-brand-black rounded-sm border border-brand-gold shadow-md">
                    <div>
                        <span className="block font-bold text-xs uppercase tracking-widest">LA Responsibility</span>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-xl">{data.laPercentage.toFixed(1)}%</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Chart */}
        <div className="h-64 w-full flex flex-col items-center justify-center relative bg-brand-grey/5 rounded border border-brand-grey/10">
            {data.totalScore > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#fff" />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#373535', color: '#FEFEFE', fontSize: '10px', borderRadius: '4px', border: 'none' }}
                                itemStyle={{ color: '#FEFEFE' }}
                                formatter={(value: number) => `${value.toFixed(1)}%`} 
                            />
                            <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                        <ShieldCheck size={14} className="text-brand-gold"/>
                        <span className="text-[8px] font-bold text-brand-grey uppercase tracking-widest">Indicative Calculation</span>
                    </div>
                </>
            ) : (
                <div className="text-brand-grey italic text-xs text-center p-4 border border-dashed border-brand-grey/30 rounded-sm">
                    Add assessed needs to generate funding split.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FundingCalculator;
