import React, { useMemo, useState } from 'react';
import { BookOpen, Scale, Landmark, Library, Lightbulb, ChevronDown } from 'lucide-react';
import { JURISDICTION_RULES, LEGAL_DEFINITIONS, NEILS_NOTES, KNOWLEDGE_HUB_SECTIONS } from '../constants';
import { NeedCategory } from '../types';

interface KnowledgeHubProps {
  compact?: boolean;
}

const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ compact = false }) => {
  const [query, setQuery] = useState('');

  const normalize = (value: string) => value.toLowerCase();

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return KNOWLEDGE_HUB_SECTIONS;
    }
    const q = normalize(query);
    const match = (item: { title: string; summary: string }) =>
      normalize(item.title).includes(q) || normalize(item.summary).includes(q);

    return KNOWLEDGE_HUB_SECTIONS.map(section => ({
      ...section,
      items: section.items.filter(match)
    })).filter(section => section.items.length > 0);
  }, [query]);


  const getDomain = (url?: string) => {
    try {
      if (!url) return "";
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url || "";
    }
  };
  return (
    <section className={`bg-white rounded-2xl shadow-sm border border-black/5 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center gap-2 mb-4 border-b border-brand-grey/30 pb-2">
        <Library size={18} className="text-brand-gold" />
        <h2 className={`font-serif font-bold text-brand-black ${compact ? 'text-lg' : 'text-xl'}`}>
          Knowledge Hub
        </h2>
        <span className="text-[10px] uppercase tracking-widest text-brand-grey ml-2">Law put simply</span>
      </div>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cases, guidance, Ombudsman decisions..."
          className="w-full p-2 border border-brand-grey/40 rounded-sm text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
        />
      </div>

      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
        <div className="border border-black/5 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-brand-gold" />
            <h3 className="text-sm font-bold text-brand-black">s.117 Entitlement</h3>
          </div>
          <p className="text-xs text-brand-black/80">{NEILS_NOTES.S117_ELIGIBILITY}</p>
        </div>

        <div className="border border-black/5 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Landmark size={16} className="text-brand-gold" />
            <h3 className="text-sm font-bold text-brand-black">{JURISDICTION_RULES.s117_LA.title}</h3>
          </div>
          <p className="text-xs text-brand-black/80 mb-2">{JURISDICTION_RULES.s117_LA.explanation}</p>
          <p className="text-[10px] uppercase tracking-widest text-brand-grey">{JURISDICTION_RULES.s117_LA.rule}</p>
        </div>

        <div className="border border-black/5 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Scale size={16} className="text-brand-gold" />
            <h3 className="text-sm font-bold text-brand-black">{JURISDICTION_RULES.s117_ICB.title}</h3>
          </div>
          <p className="text-xs text-brand-black/80 mb-2">{JURISDICTION_RULES.s117_ICB.explanation}</p>
          <p className="text-[10px] uppercase tracking-widest text-brand-grey">{JURISDICTION_RULES.s117_ICB.rule}</p>
        </div>

        <div className="border border-black/5 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-brand-gold" />
            <h3 className="text-sm font-bold text-brand-black">{LEGAL_DEFINITIONS[NeedCategory.S117].title}</h3>
          </div>
          <p className="text-xs text-brand-black/80 mb-2">{LEGAL_DEFINITIONS[NeedCategory.S117].description}</p>
          <ul className="text-xs text-brand-black/80 space-y-1">
            {LEGAL_DEFINITIONS[NeedCategory.S117].criteria.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="border border-black/5 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-brand-gold" />
            <h3 className="text-sm font-bold text-brand-black">{LEGAL_DEFINITIONS[NeedCategory.CARE_ACT].title}</h3>
          </div>
          <p className="text-xs text-brand-black/80 mb-2">{LEGAL_DEFINITIONS[NeedCategory.CARE_ACT].description}</p>
          <ul className="text-xs text-brand-black/80 space-y-1">
            {LEGAL_DEFINITIONS[NeedCategory.CARE_ACT].criteria.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map(section => (
          <details key={section.id} className="border border-black/5 rounded-2xl bg-white shadow-sm group" open>
            <summary className="cursor-pointer select-none px-4 py-3 flex items-center justify-between text-sm font-bold text-brand-black">
              <div className="flex items-center gap-2">
                <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                <span>{section.title}</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-brand-grey">{section.items.length} items</span>
            </summary>
            <div className="px-4 pb-4 pt-1">
              <ul className="text-xs text-brand-black/80 space-y-3">
                {section.items.map(item => (
                  <li key={item.title} className="border-l-2 border-brand-gold pl-3">
                    <div className="flex items-center gap-2">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-brand-black underline decoration-brand-gold hover:text-brand-gold"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <span className="font-bold text-brand-black">{item.title}</span>
                      )}
                      <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border border-brand-grey text-brand-grey">
                        Free
                      </span>
                      {item.url && (
                        <span className="text-[9px] uppercase tracking-widest text-brand-grey">{getDomain(item.url)}</span>
                      )}
                    </div>
                    <div className="mt-1">{item.summary}</div>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>

    </section>
  );
};

export default KnowledgeHub;
