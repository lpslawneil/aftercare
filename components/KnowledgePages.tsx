import React, { useMemo, useState } from 'react';
import { KNOWLEDGE_PAGES, SCENARIO_BANK } from '../constants';

const KnowledgePages: React.FC = () => {
  const [query, setQuery] = useState('');
  const [pageQuizAnswers, setPageQuizAnswers] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<string>('hub');

  const slugify = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const filteredPages = useMemo(() => {
    if (!query.trim()) return KNOWLEDGE_PAGES;
    const q = query.toLowerCase();
    return KNOWLEDGE_PAGES.map(page => ({
      ...page,
      sections: page.sections.filter(s =>
        (s.title || '').toLowerCase().includes(q) ||
        (s.text || '').toLowerCase().includes(q) ||
        (s.bullets || []).some(b => b.toLowerCase().includes(q)) ||
        (s.checklist || []).some(b => b.toLowerCase().includes(q)) ||
        (s.pitfalls || []).some(b => b.toLowerCase().includes(q))
      )
    })).filter(page => page.sections.length > 0);
  }, [query]);

  const activePage = KNOWLEDGE_PAGES.find(p => p.id === activeTab);
  const scenariosForActivePage = activePage
    ? SCENARIO_BANK.filter(s => (s.tags || []).includes(activePage.id))
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/90 border border-black/5 shadow-sm rounded-2xl p-5 mb-6">
        <h2 className="text-xl font-serif font-bold text-brand-black">Legal Knowledge Pages</h2>
        <p className="text-sm text-brand-black/80 mt-1">
          Plain‑English summaries with checklists and pitfalls. Built for fast, defensible decisions.
        </p>
      </div>

      <div className="sticky top-0 z-30 bg-[#F6F5F2]/90 backdrop-blur-sm border-b border-black/10 mb-4">
        <div className="py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-2 md:sticky">
            <button
              onClick={() => setActiveTab('hub')}
              className={`whitespace-nowrap px-3 py-2 text-sm border border-black/10 rounded-full hover:bg-black/[0.04] ${
                activeTab === 'hub' ? 'bg-brand-gold/15 border-brand-gold text-brand-black font-bold' : ''
              }`}
            >
              Knowledge Hub
            </button>
            {KNOWLEDGE_PAGES.map(page => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                className={`whitespace-nowrap px-3 py-2 text-sm border border-black/10 rounded-full hover:bg-black/[0.04] ${
                  activeTab === page.id ? 'bg-brand-gold/15 border-brand-gold text-brand-black font-bold' : ''
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all knowledge pages..."
            className="w-full p-3 border border-black/10 rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-white"
          />
        </div>
      </div>

      {activeTab === 'hub' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-5">
            <h3 className="text-lg font-serif font-bold text-brand-black mb-2">Knowledge Hub</h3>
            <p className="text-sm text-brand-black/80">
              Open a topic to view detailed guidance, checklists, pitfalls and quizzes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPages.map(page => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                className="text-left bg-white border border-black/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm font-bold text-brand-black">{page.title}</div>
                {page.summary && <div className="text-xs text-brand-black/70 mt-1">{page.summary}</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab !== 'hub' && activePage && (
        <section className="bg-white rounded-2xl shadow-sm border border-black/5">
          <div className="px-5 py-4 border-b border-brand-grey/30">
            <h3 className="text-lg font-serif font-bold text-brand-black">{activePage.title}</h3>
            {activePage.summary && <p className="text-sm text-brand-black/80 mt-1">{activePage.summary}</p>}
            <div className="mt-3">
              <button
                onClick={() => setActiveTab('hub')}
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 border border-brand-grey/30 rounded-sm hover:bg-brand-grey/10"
              >
                Back to Hub
              </button>
            </div>
          </div>
          {activePage.highlights && (
            <div className="px-5 py-4 border-b border-black/5 bg-[#FAF9F7]">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Key Rules</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activePage.highlights.map(item => (
                  <div key={item} className="border border-black/5 rounded-xl p-3 bg-white text-sm text-brand-black/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="px-5 py-4 border-b border-black/5">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Quick Jumps</div>
            <div className="flex flex-wrap gap-2">
              {activePage.sections.map(section => (
                <a
                  key={section.title}
                  href={`#topic-${activePage.id}-${slugify(section.title)}`}
                  className="px-3 py-1 text-xs border border-black/10 rounded-full hover:bg-black/[0.04]"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
          <div className="px-5 py-4 border-b border-black/5 bg-[#111214] text-white">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Mini Summary</div>
            <div className="text-sm text-white/90">
              {activePage.summary || "Key legal rules, checklists, pitfalls and examples in one place."}
            </div>
          </div>
          <div className="px-5 py-4 space-y-4">
            {activePage.sections.map(section => (
              <details key={section.title} id={`topic-${activePage.id}-${slugify(section.title)}`} className="border border-black/5 rounded-2xl bg-white scroll-mt-24" open>
                <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold text-brand-black">
                  {section.title}
                </summary>
                <div className="px-4 pb-4 pt-1 text-sm text-brand-black/80 space-y-3">
                  {section.text && <p>{section.text}</p>}
                  {section.bullets && (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Key Points</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {section.bullets.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {section.checklist && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-black/5 rounded-xl p-3 bg-white">
                        <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Checklist</div>
                        <ul className="list-disc pl-5 space-y-1">
                          {section.checklist.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                      {section.pitfalls && (
                        <div className="border border-black/5 rounded-xl p-3 bg-white">
                          <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Common Pitfalls</div>
                          <ul className="list-disc pl-5 space-y-1">
                            {section.pitfalls.map(item => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {section.pitfalls && !section.checklist && (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Common Pitfalls</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {section.pitfalls.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {section.sources && (
                    <div className="pt-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2">Sources</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {section.sources.map(src => (
                          <li key={src.url}>
                            <a className="underline decoration-brand-gold hover:text-brand-gold" href={src.url} target="_blank" rel="noreferrer">
                              {src.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>

          {scenariosForActivePage.length > 0 && (
            <div className="px-5 pb-5">
              <div className="border border-black/5 rounded-2xl bg-white">
                <div className="px-4 py-3 border-b border-brand-grey/30">
                  <h4 className="text-sm font-bold text-brand-black">Relevant Scenarios (Quiz)</h4>
                  <p className="text-xs text-brand-black/70 mt-1">Apply the rules above.</p>
                </div>
                <div className="px-4 py-4 space-y-3">
                  {scenariosForActivePage.map(s => (
                    <details key={s.id} className="border border-black/5 rounded-xl bg-white">
                      <summary className="cursor-pointer select-none px-3 py-2 text-sm font-bold text-brand-black">
                        {s.title}
                      </summary>
                      <div className="px-3 pb-3 pt-1 text-xs text-brand-black/80 space-y-3">
                        <div><span className="font-bold text-brand-black">Scenario:</span> {s.scenario}</div>
                        <div>
                          <span className="font-bold text-brand-black">Questions:</span>
                          <ul className="list-disc pl-5">
                            {s.questions.map(q => <li key={q}>{q}</li>)}
                          </ul>
                        </div>
                        {s.choices && (
                          <div className="space-y-2">
                            <span className="font-bold text-brand-black">Choose the best answer:</span>
                            <div className="grid grid-cols-1 gap-2">
                              {s.choices.map((choice, idx) => (
                                <label key={choice} className={`flex items-center gap-2 p-2 border rounded-sm cursor-pointer ${
                                  pageQuizAnswers[s.id] === idx ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-grey/30'
                                }`}>
                                  <input
                                    type="radio"
                                    name={`quiz-${s.id}`}
                                    checked={pageQuizAnswers[s.id] === idx}
                                    onChange={() => setPageQuizAnswers(prev => ({ ...prev, [s.id]: idx }))}
                                  />
                                  <span>{choice}</span>
                                </label>
                              ))}
                            </div>
                            {typeof s.correctIndex === 'number' && typeof pageQuizAnswers[s.id] === 'number' && (
                              <div className={`text-xs font-bold ${pageQuizAnswers[s.id] === s.correctIndex ? 'text-green-700' : 'text-red-700'}`}>
                                {pageQuizAnswers[s.id] === s.correctIndex ? 'Correct' : 'Not quite'} — {s.answer}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default KnowledgePages;
