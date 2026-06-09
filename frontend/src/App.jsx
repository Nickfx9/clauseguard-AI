import React, { useState, useEffect } from 'react';

export default function App() {
  const [contractText, setContractText] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const reasoningSteps = [
    "Decomposing contract text into domain-specific sub-queries...",
    "Triggering parallel extraction passes across Indexed Statutes...",
    "Querying integrated Web IQ MCP Source for active platform litigation...",
    "Executing server-side semantic re-ranking and citation mapping..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      setCurrentStep(0);
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev < reasoningSteps.length - 1 ? prev + 1 : prev));
      }, 1200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!contractText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/v1/audit-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractText,
          sourcePlatform: sourcePlatform.trim() || 'Generic Platform'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server processing error occurred.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">ClauseGuard</h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                Reasoning Agents Track
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Multi-Step Contract Safety Engine powered by Microsoft Foundry IQ</p>
          </div>
          {result && (
            <div className="text-[11px] font-mono bg-slate-900 border border-slate-800 rounded px-3 py-1 text-slate-400">
              Architecture: <span className="text-indigo-400 font-medium">{result.architecture}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Layout Workspace */}
      <main className="max-w-7xl mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Terminal */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 pb-2">
              Ingestion Terminal
            </h2>
            
            <form onSubmit={handleAudit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Platform / Counterparty Identity</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g., Upwork, Freelancer, Tech Agency"
                  value={sourcePlatform}
                  onChange={(e) => setSourcePlatform(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Contract Agreement Text Block</label>
                <textarea 
                  rows={12}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs font-mono text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                  placeholder="Paste terms, click-through agreements, or liability clauses here..."
                  required
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !contractText.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? 'Processing Agentic Loop...' : 'Analyze Contract Safety'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-4 text-xs">
              <span className="font-bold">Execution Error:</span> {error}
            </div>
          )}
        </section>

        {/* Output Intelligence Matrix */}
        <section className="lg:col-span-7 bg-slate-950/40 border border-slate-800 rounded-xl p-6 min-h-[500px] flex flex-col">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 pb-2 mb-4">
            Analysis & Grounded Evidence
          </h2>

          {loading && (
            <div className="flex-1 flex flex-col justify-center items-center space-y-6 py-12">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
              </div>
              <div className="space-y-2 text-center max-w-sm">
                <p className="text-xs font-mono text-indigo-400 animate-pulse font-medium">
                  STAGE {currentStep + 1}: {reasoningSteps[currentStep]}
                </p>
                <div className="w-48 h-1 bg-slate-800 mx-auto rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / reasoningSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {result.groundedAnalysis}
              </div>

              {result.citations && result.citations.length > 0 && (
                <div className="pt-5 border-t border-slate-800/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
                    Immutable Citations (Grounded Answer Proof):
                  </h3>
                  <ul className="space-y-2">
                    {result.citations.map((citation, idx) => (
                      <li key={idx} className="text-xs text-slate-400 bg-slate-950 border border-slate-800/50 rounded-lg p-2.5 font-mono flex gap-2">
                        <span className="text-indigo-500 font-bold">[{idx + 1}]</span>
                        <span>{citation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.liveWebSignals && result.liveWebSignals.length > 0 && (
                <div className="pt-5 border-t border-slate-800/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5">
                    Real-Time Web IQ Context Signals:
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {result.liveWebSignals.map((signal, idx) => (
                      <a 
                        href={signal.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        key={idx} 
                        className="block bg-slate-950 border border-slate-800/60 hover:border-amber-500/40 rounded-lg p-3 transition-all hover:bg-slate-900/40 group"
                      >
                        <div className="text-xs font-medium text-slate-200 group-hover:text-amber-400 transition-colors">
                          {signal.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-1 truncate">
                          {signal.url}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !result && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 rounded-full border border-dashed border-slate-800 flex items-center justify-center mb-3 text-slate-500 text-lg">
                📋
              </div>
              <p className="text-slate-400 font-medium text-sm">Awaiting Context Ingestion</p>
              <p className="text-slate-600 text-xs mt-1 max-w-sm">
                Paste an agreement text block on the left and trigger evaluation to compute safety heuristics across the Microsoft IQ layer.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}