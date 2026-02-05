import React from 'react';
import { Scale, Info, Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  isOnline: boolean;
}

const Header: React.FC<HeaderProps> = ({ isOnline }) => {
  return (
    <header className="bg-white/90 text-brand-black shadow-sm border-b border-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-brand-gold/20 rounded-xl border border-brand-gold/40">
              <Scale className="h-7 w-7 text-brand-black" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-wide text-brand-black">Discharge planning needs assessment</h1>
              <p className="text-brand-grey text-sm font-medium tracking-widest uppercase">Statutory Funding & Care Planning Tool</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-sm border ${
            isOnline ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'
          }`}>
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>
      <div className="bg-white/70 px-4 py-2 border-t border-black/10">
        <div className="container mx-auto flex items-start space-x-2 text-xs text-brand-grey">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-gold" />
          <p>
            <strong>Disclaimer:</strong> This tool provides general information based on the MHA 1983 and Care Act 2014. 
            It is for training and calculation purposes only and does not constitute individual legal advice. 
            Always consult your local legal team or policies.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
